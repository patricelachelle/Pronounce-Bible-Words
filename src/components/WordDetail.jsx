function WordDetail({ word }) {
  if (!word) {
    return (
      <section className="detail-panel muted">
        <h2>Word details</h2>
        <p>Select a word from the list to see pronunciation details.</p>
      </section>
    );
  }

  return (
    <section className="detail-panel">
      <h2>{word.word}</h2>
      <p>
        <strong>Phonetic:</strong> {word.phonetic}
      </p>

      {/* Basic HTML5 audio player as requested */}
      <audio controls preload="none" src={word.audioUrl}>
        Your browser does not support the audio element.
      </audio>
    </section>
  );
}

export default WordDetail;
