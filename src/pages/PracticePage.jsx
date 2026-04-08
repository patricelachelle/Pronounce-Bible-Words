import { useEffect, useState } from 'react';
import usePronunciationAudio from '../hooks/usePronunciationAudio';

function PracticePage({ words }) {
  const [index, setIndex] = useState(0);
  const currentWord = words[index] || null;
  const { audioUrl, isLoading, errorMessage } = usePronunciationAudio(currentWord);

  useEffect(() => {
    setIndex(0);
  }, [words]);

  if (!words.length) {
    return (
      <section className="detail-panel muted">
        <h2>Practice mode</h2>
        <p>No words available for this filter. Try changing your search or category.</p>
      </section>
    );
  }

  const handleNext = () => {
    setIndex((prev) => (prev + 1) % words.length);
  };

  return (
    <section className="practice-card fade-in">
      <p className="practice-counter">
        Word {index + 1} of {words.length}
      </p>
      <h2>{currentWord.word}</h2>
      <p className="word-meta">{currentWord.phonetic}</p>

      {isLoading && <p className="status-message">Loading pronunciation...</p>}
      {errorMessage && (
        <p className="status-message error" role="alert">
          {errorMessage}
        </p>
      )}

      {!isLoading && !errorMessage && audioUrl && (
        <audio controls autoPlay preload="none" src={audioUrl} className="audio-player">
          Your browser does not support the audio element.
        </audio>
      )}

      <button type="button" className="next-btn" onClick={handleNext}>
        Next
      </button>
    </section>
  );
}

export default PracticePage;
