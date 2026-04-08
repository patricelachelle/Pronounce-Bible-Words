function VersePanel({ selectedWord, onSpeakWord }) {
  return (
    <section className="word-panel">
      <div className="panel-title-row">
        <h3>Word Lens</h3>
        <span>Pronunciation + context</span>
      </div>

      {!selectedWord ? (
        <p className="empty-state">Select a highlighted word in the passage to hear and understand it.</p>
      ) : (
        <>
          <p className="word-focus">{selectedWord.word}</p>
          <p className="word-phonetic">/{selectedWord.insight.phonetic}/</p>
          <p className="word-definition">{selectedWord.insight.definition}</p>
          <button type="button" className="speak-button" onClick={() => onSpeakWord(selectedWord.word)}>
            🔊 Hear pronunciation
          </button>
        </>
      )}
    </section>
  );
}

export default VersePanel;
