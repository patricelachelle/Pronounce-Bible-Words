function AIInsightPanel({ selectedVerse, insight, isLoading }) {
  return (
    <aside className="ai-panel" aria-label="AI verse assistant">
      <div className="panel-title-row">
        <h3>AI Verse Assistant</h3>
        <span>Plain-English guidance</span>
      </div>

      {!selectedVerse ? (
        <p className="empty-state">Choose any verse to generate explanation, themes, and a modern paraphrase.</p>
      ) : (
        <>
          <p className="selected-verse-label">Verse {selectedVerse.verse}</p>
          <p className="selected-verse-text">“{selectedVerse.text}”</p>

          {isLoading ? (
            <p className="loading-text">Analyzing verse meaning...</p>
          ) : (
            insight && (
              <div className="ai-results">
                <section>
                  <h4>Explanation</h4>
                  <p>{insight.explanation}</p>
                </section>
                <section>
                  <h4>Key themes</h4>
                  <ul>
                    {insight.themes.map((theme) => (
                      <li key={theme}>{theme}</li>
                    ))}
                  </ul>
                </section>
                <section>
                  <h4>Modern paraphrase</h4>
                  <p>{insight.paraphrase}</p>
                </section>
              </div>
            )
          )}
        </>
      )}
    </aside>
  );
}

export default AIInsightPanel;
