import { useEffect, useRef } from 'react';

function AudioPlayerWithRate({ src, rate = 1, label }) {
  const audioRef = useRef(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.playbackRate = rate;
    }
  }, [rate, src]);

  return (
    <div>
      <audio ref={audioRef} controls preload="none" src={src} className="audio-player">
        Your browser does not support the audio element.
      </audio>
      {label && <p className="word-meta">{label}</p>}
    </div>
  );
}

export default AudioPlayerWithRate;
