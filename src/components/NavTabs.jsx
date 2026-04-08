const tabs = [
  { id: 'browse', label: 'Browse' },
  { id: 'favorites', label: 'Favorites' },
  { id: 'practice', label: 'Practice' },
  { id: 'verse-assistant', label: 'Verse Assistant' },
];

function NavTabs({ activeTab, onChange }) {
  return (
    <nav className="tabs" aria-label="App sections">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          type="button"
          onClick={() => onChange(tab.id)}
          className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
        >
          {tab.label}
        </button>
      ))}
    </nav>
  );
}

export default NavTabs;
