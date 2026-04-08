import { getWordInsight } from '../data/wordInsights';

function tokenizeVerse(text) {
  return text.split(/(\s+)/).filter(Boolean);
}

function renderAmplifiedWord(token, amplifiedView) {
  const insight = getWordInsight(token);
  if (!insight || !amplifiedView) return token;

  const cleanedWord = token.replace(/[^a-zA-Z']/g, '');
  if (!cleanedWord) return token;

  const trailingPunctuation = token.slice(cleanedWord.length);
  return insight.amplified ? `${insight.amplified}${trailingPunctuation}` : token;
}

function BibleReader({ verses, referenceLabel, onSelectVerse, selectedVerseNumber, onSelectWord, amplifiedView }) {
  return (
    <section className="reader-shell" aria-label="Bible reader">
      <header className="reader-header">
        <h2>{referenceLabel}</h2>
        <p>Tap a verse for AI insight. Tap highlighted words for pronunciation and context.</p>
      </header>

      <div className="verses-list">
        {verses.map((verse) => (
          <article
            key={verse.verse}
            className={`verse-row ${selectedVerseNumber === verse.verse ? 'selected' : ''}`}
            onClick={() => onSelectVerse(verse)}
            onKeyDown={(event) => {
              if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                onSelectVerse(verse);
              }
            }}
            tabIndex={0}
            role="button"
          >
            <span className="verse-number">{verse.verse}</span>
            <p>
              {tokenizeVerse(verse.text).map((token, idx) => {
                if (/^\s+$/.test(token)) return <span key={`${verse.verse}-space-${idx}`}>{token}</span>;

                const insight = getWordInsight(token);
                const displayToken = renderAmplifiedWord(token, amplifiedView);

                if (!insight) {
                  return <span key={`${verse.verse}-${token}-${idx}`}>{displayToken}</span>;
                }

                return (
                  <button
                    key={`${verse.verse}-${token}-${idx}`}
                    type="button"
                    className="verse-word tagged"
                    onClick={(event) => {
                      event.stopPropagation();
                      onSelectWord(token, insight);
                    }}
                    title={`${insight.type}: ${insight.definition}`}
                  >
                    {displayToken}
                  </button>
                );
              })}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}

export default BibleReader;
