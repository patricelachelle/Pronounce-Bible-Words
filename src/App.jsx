import { useMemo, useState } from 'react';

const sampleNames = [
  { name: 'Nebuchadnezzar', phonetic: 'neh-byoo-kad-NEZ-uhr' },
  { name: 'Mahershalalhashbaz', phonetic: 'mah-her-shal-al-hash-baz' },
  { name: 'Hephzibah', phonetic: 'HEF-zih-buh' },
  { name: 'Melchizedek', phonetic: 'mel-KIZ-uh-dek' },
  { name: 'Habakkuk', phonetic: 'huh-BAK-uk' },
  { name: 'Zerubbabel', phonetic: 'zuh-RUB-uh-bel' },
  { name: 'Keturah', phonetic: 'keh-TOO-ruh' },
  { name: 'Bezalel', phonetic: 'BEZ-uh-lel' },
];

function NameChip({ item, active, onSelect }) {
  return (
    <button
      type="button"
      className={`name-chip ${active ? 'active' : ''}`}
      onClick={() => onSelect(item)}
    >
      <span className="chip-icon" aria-hidden="true">
        ✦
      </span>
      <span>{item.name}</span>
    </button>
  );
}

function App() {
  const [name, setName] = useState('');
  const [selectedSample, setSelectedSample] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [status, setStatus] = useState('Enter a Bible name and hear it spoken aloud.');

  const normalizedName = name.trim();

  const phonetic = useMemo(() => {
    const fromSample = sampleNames.find(
      ({ name: sampleName }) => sampleName.toLowerCase() === normalizedName.toLowerCase(),
    );
    return fromSample?.phonetic ?? 'Phonetic guide will appear for featured names.';
  }, [normalizedName]);

  const playPronunciation = () => {
    if (!normalizedName) {
      setStatus('Please type a name first.');
      return;
    }

    if (!('speechSynthesis' in window)) {
      setStatus('Speech synthesis is not supported in this browser.');
      return;
    }

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(normalizedName);
    utterance.rate = 0.9;
    utterance.pitch = 1.02;

    utterance.onstart = () => {
      setIsPlaying(true);
      setStatus(`Now pronouncing: ${normalizedName}`);
    };

    utterance.onend = () => {
      setIsPlaying(false);
      setStatus(`Finished. Tap again to replay ${normalizedName}.`);
    };

    utterance.onerror = () => {
      setIsPlaying(false);
      setStatus('Could not play pronunciation. Please try again.');
    };

    window.speechSynthesis.speak(utterance);
  };

  const handleSampleSelect = (item) => {
    setSelectedSample(item.name);
    setName(item.name);
    setStatus(`Loaded sample: ${item.name}. Press Play Pronunciation.`);
  };

  return (
    <main className="experience">
      <div className="glow glow-left" aria-hidden="true" />
      <div className="glow glow-right" aria-hidden="true" />

      <section className="hero-panel">
        <p className="eyebrow">Bible Names Audio Lab</p>
        <h1>
          Pronounce the Word
          <span>with confidence and rhythm.</span>
        </h1>
        <p className="hero-copy">
          Type any Bible name, explore curated examples, and instantly hear polished pronunciation.
        </p>

        <div className="input-cluster">
          <label htmlFor="name-input">Enter a Bible name</label>
          <div className="input-shell">
            <span className="input-icon" aria-hidden="true">
              🔎
            </span>
            <input
              id="name-input"
              value={name}
              onChange={(event) => {
                setName(event.target.value);
                setSelectedSample(null);
              }}
              placeholder="Try: Nebuchadnezzar"
            />
          </div>
          <button
            type="button"
            className={`play-button ${isPlaying ? 'playing' : ''}`}
            onClick={playPronunciation}
          >
            <span aria-hidden="true">{isPlaying ? '◉' : '▶'}</span>
            Play Pronunciation
          </button>
        </div>

        <div className="status-bar" role="status" aria-live="polite">
          {status}
        </div>
      </section>

      <section className="detail-panel">
        <article className="phonetic-card">
          <p className="card-label">Featured phonetic</p>
          <h2>{normalizedName || 'Awaiting name input'}</h2>
          <p className="phonetic-text">{phonetic}</p>
        </article>

        <article className="samples-card">
          <div className="samples-headline">
            <h3>Popular practice names</h3>
            <p>Tap to load instantly</p>
          </div>
          <div className="chip-grid">
            {sampleNames.map((item) => (
              <NameChip
                key={item.name}
                item={item}
                active={selectedSample === item.name}
                onSelect={handleSampleSelect}
              />
            ))}
          </div>
        </article>
      </section>
    </main>
  );
}

export default App;
