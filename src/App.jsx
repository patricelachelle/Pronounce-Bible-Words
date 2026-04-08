import { useMemo, useState } from 'react';
import SearchBar from './components/SearchBar';
import WordList from './components/WordList';
import WordDetail from './components/WordDetail';
import { bibleWords } from './data/bibleWords';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedWord, setSelectedWord] = useState(null);

  // Filter word list in real time from search input.
  const filteredWords = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();
    if (!normalizedSearch) return bibleWords;

    return bibleWords.filter(
      ({ word, phonetic }) =>
        word.toLowerCase().includes(normalizedSearch) ||
        phonetic.toLowerCase().includes(normalizedSearch),
    );
  }, [searchTerm]);

  return (
    <main className="app-shell">
      <header className="hero">
        <h1>Bible Word Pronunciation</h1>
        <p>Search difficult Bible names, view phonetics, and play audio.</p>
        <SearchBar value={searchTerm} onChange={setSearchTerm} />
      </header>

      <section className="content-grid">
        <div>
          <h2 className="section-title">Words ({filteredWords.length})</h2>
          <WordList words={filteredWords} selectedWord={selectedWord} onSelect={setSelectedWord} />
        </div>
        <WordDetail word={selectedWord} />
      </section>
    </main>
  );
}

export default App;
