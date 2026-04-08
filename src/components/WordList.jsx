import FavoriteButton from './FavoriteButton';

function WordList({ words, selectedWord, onSelect, favorites, onToggleFavorite }) {
  if (!words.length) {
    return <p className="empty-state">No words found. Try another search term.</p>;
  }

  return (
    <ul className="word-list" aria-label="Bible words">
      {words.map((item) => {
        const isFavorite = favorites.includes(item.word);

        return (
          <li key={item.word}>
            <div className={`word-item ${selectedWord?.word === item.word ? 'active' : ''}`}>
              <button className="word-main" onClick={() => onSelect(item)} type="button">
                <span className="word-name">{item.word}</span>
                <span className="word-meta">{item.phonetic} · {item.category}</span>
              </button>
              <FavoriteButton isFavorite={isFavorite} onToggle={() => onToggleFavorite(item.word)} />
            </div>
          </li>
        );
      })}
    </ul>
  );
}

export default WordList;
