export const wordInsights = {
  Nebuchadnezzar: {
    type: 'name',
    phonetic: 'neh-byoo-kad-NEZ-uhr',
    definition: 'King of Babylon who conquered Jerusalem.',
    amplified: 'Nebuchadnezzar [King of Babylon]',
  },
  Jehoiakim: {
    type: 'name',
    phonetic: 'jee-HOY-uh-kim',
    definition: 'A king of Judah during the Babylonian rise.',
  },
  Babylon: {
    type: 'place',
    phonetic: 'BAB-uh-lon',
    definition: 'Ancient empire and city east of Judah.',
    amplified: 'Babylon [major empire in Mesopotamia]',
  },
  Jerusalem: {
    type: 'place',
    phonetic: 'juh-ROO-suh-lum',
    definition: 'Holy city central to biblical history.',
  },
  Ashpenaz: {
    type: 'name',
    phonetic: 'ASH-puh-naz',
    definition: "Chief official serving Nebuchadnezzar's court.",
  },
  Emmanuel: {
    type: 'title',
    phonetic: 'ih-MAN-yoo-el',
    definition: 'Means “God with us.”',
    amplified: 'Emmanuel [God with us]',
  },
  Bethlehem: {
    type: 'place',
    phonetic: 'BETH-lih-hem',
    definition: 'Town of Jesus’ birth in Judea.',
  },
  Judaea: {
    type: 'place',
    phonetic: 'joo-DEE-uh',
    definition: 'Region known as Judea in the Roman era.',
  },
  Herod: {
    type: 'name',
    phonetic: 'HAIR-uhd',
    definition: 'Regional ruler during Jesus’ birth narrative.',
  },
  sanctified: {
    type: 'hard-word',
    phonetic: 'SANGK-tuh-fyd',
    definition: 'Set apart as holy.',
  },
  defile: {
    type: 'hard-word',
    phonetic: 'dih-FYLE',
    definition: 'To make unclean or impure.',
  },
};

export function getWordInsight(rawWord) {
  const cleanedWord = rawWord.replace(/[^a-zA-Z']/g, '');
  if (!cleanedWord) return null;

  return (
    wordInsights[cleanedWord] ||
    wordInsights[cleanedWord.toLowerCase()] ||
    wordInsights[`${cleanedWord.charAt(0).toUpperCase()}${cleanedWord.slice(1).toLowerCase()}`] ||
    null
  );
}
