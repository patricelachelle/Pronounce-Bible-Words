import { useEffect, useMemo, useState } from 'react';

const AUDIO_CACHE_STORAGE_KEY = 'bible_pronunciation_audio_cache_v1';

function readCachedAudio(cacheKey) {
  try {
    const raw = localStorage.getItem(AUDIO_CACHE_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    return parsed[cacheKey] || null;
  } catch {
    return null;
  }
}

function writeCachedAudio(cacheKey, value) {
  try {
    const raw = localStorage.getItem(AUDIO_CACHE_STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : {};
    parsed[cacheKey] = value;
    localStorage.setItem(AUDIO_CACHE_STORAGE_KEY, JSON.stringify(parsed));
  } catch {
    // Best effort cache write only.
  }
}

function createCacheKey(word) {
  return `${word.word.toLowerCase()}::${word.phonetic.toLowerCase()}`;
}

function base64ToBlobUrl(base64Audio, mimeType) {
  const byteChars = atob(base64Audio);
  const byteNumbers = new Array(byteChars.length);
  for (let i = 0; i < byteChars.length; i += 1) {
    byteNumbers[i] = byteChars.charCodeAt(i);
  }
  const byteArray = new Uint8Array(byteNumbers);
  const blob = new Blob([byteArray], { type: mimeType || 'audio/mpeg' });
  return URL.createObjectURL(blob);
}

function usePronunciationAudio(word) {
  const [audioUrl, setAudioUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const cacheKey = useMemo(() => (word ? createCacheKey(word) : ''), [word]);

  useEffect(() => {
    if (!word) {
      setAudioUrl('');
      setErrorMessage('');
      setIsLoading(false);
      return undefined;
    }

    let revokedUrl = '';
    const controller = new AbortController();

    async function loadAudio() {
      setIsLoading(true);
      setErrorMessage('');

      const cachedAudio = readCachedAudio(cacheKey);
      if (cachedAudio?.audioContent) {
        revokedUrl = base64ToBlobUrl(cachedAudio.audioContent, cachedAudio.mimeType);
        setAudioUrl(revokedUrl);
        setIsLoading(false);
        return;
      }

      try {
        const response = await fetch('/api/pronounce', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          signal: controller.signal,
          body: JSON.stringify({ word: word.word, phonetic: word.phonetic }),
        });

        const payload = await response.json().catch(() => ({}));
        if (!response.ok) {
          throw new Error(payload.error || 'Could not generate pronunciation right now.');
        }

        if (!payload.audioContent) {
          throw new Error('No audio was returned. Please try another word.');
        }

        writeCachedAudio(cacheKey, {
          audioContent: payload.audioContent,
          mimeType: payload.mimeType || 'audio/mpeg',
        });

        revokedUrl = base64ToBlobUrl(payload.audioContent, payload.mimeType);
        setAudioUrl(revokedUrl);
      } catch (error) {
        if (error.name !== 'AbortError') {
          setErrorMessage(error.message || 'Something went wrong while generating pronunciation audio.');
          setAudioUrl('');
        }
      } finally {
        setIsLoading(false);
      }
    }

    loadAudio();

    return () => {
      controller.abort();
      if (revokedUrl) URL.revokeObjectURL(revokedUrl);
    };
  }, [cacheKey, word]);

  return { audioUrl, isLoading, errorMessage };
}

export default usePronunciationAudio;
