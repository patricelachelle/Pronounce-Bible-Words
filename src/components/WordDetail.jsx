import FavoriteButton from './FavoriteButton';
import usePronunciationAudio from '../hooks/usePronunciationAudio';

function WordDetail({ word, isFavorite, onToggleFavorite }) {
  const { audioUrl, isLoading, errorMessage } = usePronunciationAudio(word);

  if (!word) {
    return (
      <section className="detail-panel muted">
        <h2>Word details</h2>
        <p>Select a word from the list to see pronunciation details.</p>
      </section>
    );
  }

  return (
    <section className="detail-panel fade-in">
      <div className="detail-header">
        <h2>{word.word}</h2>
        <FavoriteButton isFavorite={isFavorite} onToggle={() => onToggleFavorite(word.word)} />
      </div>
      <p>
        <strong>Phonetic:</strong> {word.phonetic}
      </p>
      <p>
        <strong>Category:</strong> {word.category}
      </p>

      {isLoading && <p className="status-message">Generating pronunciation audio...</p>}

      {errorMessage && (
        <p className="status-message error" role="alert">
          {errorMessage}
        </p>
      )}

      {!isLoading && !errorMessage && audioUrl && (
        <audio controls preload="none" src={audioUrl} className="audio-player">
          Your browser does not support the audio element.
        </audio>
      )}
    </section>
  );
}

export default WordDetail;
