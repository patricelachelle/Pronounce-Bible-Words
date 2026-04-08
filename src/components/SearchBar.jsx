function SearchBar({ value, onChange }) {
  return (
    <div className="search-wrapper">
      <label htmlFor="search" className="search-label">Search Bible words</label>
      <input
        id="search"
        className="search-input"
        type="text"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Type a word like Nebuchadnezzar..."
      />
    </div>
  );
}

export default SearchBar;
