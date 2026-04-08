import SearchBar from '../components/SearchBar';
import CategoryFilter from '../components/CategoryFilter';
import WordList from '../components/WordList';
import WordDetail from '../components/WordDetail';

function BrowsePage({
  searchTerm,
  onSearch,
  category,
  onCategoryChange,
  words,
  selectedWord,
  onSelectWord,
  favorites,
  onToggleFavorite,
}) {
  return (
    <>
      <SearchBar value={searchTerm} onChange={onSearch} />
      <CategoryFilter value={category} onChange={onCategoryChange} />
      <section className="content-grid">
        <div>
          <h2 className="section-title">Words ({words.length})</h2>
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
    </>
  );
}

export default BrowsePage;
