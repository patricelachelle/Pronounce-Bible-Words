function WordList({ words, selectedWord, onSelect }) {
  if (!words.length) {
    return <p className="empty-state">No words found. Try another search term.</p>;
  }

  return (
    <ul className="word-list" aria-label="Bible words">
      {words.map((item) => (
        <li key={item.word}>
          <button
            className={`word-item ${selectedWord?.word === item.word ? 'active' : ''}`}
            onClick={() => onSelect(item)}
            type="button"
          >
            <span className="word-name">{item.word}</span>
            <span className="word-phonetic">{item.phonetic}</span>
          </button>
        </li>
      ))}
    </ul>
  );
}

export default WordList;
