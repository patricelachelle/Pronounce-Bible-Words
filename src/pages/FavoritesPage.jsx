import WordList from '../components/WordList';
import WordDetail from '../components/WordDetail';

function FavoritesPage({ words, selectedWord, onSelectWord, favorites, onToggleFavorite }) {
  return (
    <section className="content-grid">
      <div>
        <h2 className="section-title">Favorite Words ({words.length})</h2>
        <WordList
          words={words}
          selectedWord={selectedWord}
          onSelect={onSelectWord}
          favorites={favorites}
          onToggleFavorite={onToggleFavorite}
        />
      </div>
      <WordDetail
        word={selectedWord}
        isFavorite={selectedWord ? favorites.includes(selectedWord.word) : false}
        onToggleFavorite={onToggleFavorite}
      />
    </section>
  );
}

export default FavoritesPage;
