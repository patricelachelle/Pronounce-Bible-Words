import { useEffect, useMemo, useState } from 'react';
import BibleReader from './components/BibleReader';
import VersePanel from './components/VersePanel';
import AIInsightPanel from './components/AIInsightPanel';
import bibleSample from './data/bibleSample.json';
import { getVerseExplanation } from './utils/ai';

function App() {
  const [bookIndex, setBookIndex] = useState(0);
  const [chapterIndex, setChapterIndex] = useState(0);
  const [selectedVerse, setSelectedVerse] = useState(null);
  const [selectedWord, setSelectedWord] = useState(null);
  const [amplifiedView, setAmplifiedView] = useState(true);
  const [aiInsight, setAiInsight] = useState(null);
  const [isAiLoading, setIsAiLoading] = useState(false);

  const selectedBook = bibleSample.books[bookIndex];
  const chapters = selectedBook.chapters;
  const verses = chapters[chapterIndex];

  const referenceLabel = useMemo(
    () => `${selectedBook.name} ${chapterIndex + 1} · ${bibleSample.translation}`,
    [chapterIndex, selectedBook.name],
  );

  useEffect(() => {
    setSelectedVerse(null);
    setAiInsight(null);
    setSelectedWord(null);
  }, [bookIndex, chapterIndex]);

  const handleSelectVerse = async (verse) => {
    setSelectedVerse(verse);
    setIsAiLoading(true);
    const explanation = await getVerseExplanation(verse.text);
    setAiInsight(explanation);
    setIsAiLoading(false);
  };

  const speakWord = (word) => {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(word.replace(/[^a-zA-Z']/g, ''));
    utterance.rate = 0.88;
    utterance.pitch = 1.01;
    window.speechSynthesis.speak(utterance);
  };

  return (
    <main className="app-shell">
      <aside className="nav-panel">
        <div>
          <p className="brand-kicker">AI Amplified Bible</p>
          <h1>Pronounce the Word</h1>
        </div>

        <label>
          Book
          <select value={bookIndex} onChange={(event) => setBookIndex(Number(event.target.value))}>
            {bibleSample.books.map((book, index) => (
              <option key={book.name} value={index}>
                {book.name}
              </option>
            ))}
          </select>
        </label>

        <label>
          Chapter
          <select value={chapterIndex} onChange={(event) => setChapterIndex(Number(event.target.value))}>
            {chapters.map((_, index) => (
              <option key={`${selectedBook.name}-${index + 1}`} value={index}>
                Chapter {index + 1}
              </option>
            ))}
          </select>
        </label>

        <button
          type="button"
          className={`toggle-btn ${amplifiedView ? 'active' : ''}`}
          onClick={() => setAmplifiedView((value) => !value)}
        >
          ✨ Amplified View {amplifiedView ? 'On' : 'Off'}
        </button>

        <VersePanel selectedWord={selectedWord} onSpeakWord={speakWord} />
      </aside>

      <BibleReader
        verses={verses}
        referenceLabel={referenceLabel}
        onSelectVerse={handleSelectVerse}
        selectedVerseNumber={selectedVerse?.verse}
        onSelectWord={(word, insight) => {
          setSelectedWord({ word, insight });
          speakWord(word);
        }}
        amplifiedView={amplifiedView}
      />

      <AIInsightPanel selectedVerse={selectedVerse} insight={aiInsight} isLoading={isAiLoading} />
    </main>
  );
}

export default App;
