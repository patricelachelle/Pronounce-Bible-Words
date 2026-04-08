import { useMemo, useState } from 'react';
import NavTabs from './components/NavTabs';
import BrowsePage from './pages/BrowsePage';
import FavoritesPage from './pages/FavoritesPage';
import PracticePage from './pages/PracticePage';
import { bibleWords } from './data/bibleWords';
import useLocalStorage from './hooks/useLocalStorage';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('All');
  const [activeTab, setActiveTab] = useState('browse');
  const [selectedWord, setSelectedWord] = useState(null);
  const [favorites, setFavorites] = useLocalStorage('bible_word_favorites_v1', []);

  const filteredWords = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();

    return bibleWords.filter(({ word, phonetic, category: itemCategory }) => {
      const matchesSearch =
        !normalizedSearch ||
        word.toLowerCase().includes(normalizedSearch) ||
        phonetic.toLowerCase().includes(normalizedSearch);

      const matchesCategory = category === 'All' || category === itemCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, category]);

  const favoriteWords = useMemo(
    () => bibleWords.filter((word) => favorites.includes(word.word)),
    [favorites],
  );

  const toggleFavorite = (wordName) => {
    setFavorites((current) =>
      current.includes(wordName)
        ? current.filter((name) => name !== wordName)
        : [...current, wordName],
    );
  };

  const onSelectWord = (word) => {
    setSelectedWord(word);
  };

  return (
    <main className="app-shell">
      <header className="hero">
        <h1>Bible Word Pronunciation</h1>
        <p>Search, save favorites, and practice words with generated audio.</p>
        <NavTabs activeTab={activeTab} onChange={setActiveTab} />
      </header>

      {activeTab === 'browse' && (
        <BrowsePage
          searchTerm={searchTerm}
          onSearch={setSearchTerm}
          category={category}
          onCategoryChange={setCategory}
          words={filteredWords}
          selectedWord={selectedWord}
          onSelectWord={onSelectWord}
          favorites={favorites}
          onToggleFavorite={toggleFavorite}
        />
      )}

      {activeTab === 'favorites' && (
        <FavoritesPage
          words={favoriteWords}
          selectedWord={selectedWord}
          onSelectWord={onSelectWord}
          favorites={favorites}
          onToggleFavorite={toggleFavorite}
        />
      )}

      {activeTab === 'practice' && <PracticePage words={filteredWords} />}
    </main>
  );
}

export default App;
