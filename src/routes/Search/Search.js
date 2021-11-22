import React, { useEffect, useState } from "react";
import { search } from "../../services/userService";
import SearchResult from "./SearchResult/SearchResult";
import "./Search.scss";

function Search() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  // debounce search
  useEffect(() => {
    if (!query.trim().length) {
      setResults([]);
      return;
    }
    let timeout = setTimeout(async () => {
      await search(query).then((results) => setResults(results));
    }, 300);
    return () => clearTimeout(timeout);
  }, [query]);

  return (
    <div className="Search">
      <header>
        <h1>Search</h1>
      </header>

      <form onSubmit={(e) => e.preventDefault()}>
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
          }}
        />
      </form>
      <div className="results">
        {results.map((result) => (
          <SearchResult key={result._id} user={result} />
        ))}
      </div>
    </div>
  );
}

export default Search;
