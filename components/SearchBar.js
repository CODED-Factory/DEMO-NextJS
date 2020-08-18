const SearchBar = ({ setQuery }) => (
  <div className="input-group input-group-lg">
    <input
      onChange={(e) => setQuery(e.target.value)}
      type="text"
      placeholder="search"
      className="form-control"
    />
  </div>
);

export default SearchBar;
