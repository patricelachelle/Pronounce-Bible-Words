const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function extractThemes(verseText) {
  const themes = [];
  const lower = verseText.toLowerCase();

  if (lower.includes('light')) themes.push('Light and hope');
  if (lower.includes('king')) themes.push('Leadership and power');
  if (lower.includes('god')) themes.push('God\'s sovereignty');
  if (lower.includes('heart')) themes.push('Inner conviction');
  if (lower.includes('save')) themes.push('Salvation');

  return themes.length ? themes : ['Faith and trust'];
}

export async function getVerseExplanation(verseText) {
  await delay(450);

  const themes = extractThemes(verseText);

  return {
    explanation:
      'This verse highlights how God works within real history and real people, inviting readers to trust His purpose even when circumstances feel uncertain.',
    themes,
    paraphrase: `In simple terms: ${verseText} This reminds us that God\'s meaning can be applied to everyday life.`,
  };
}
