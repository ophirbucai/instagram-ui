import React, { useEffect, useState } from 'react';
import { search } from "../services/userService";
import SearchResult from "./SearchResult/SearchResult";

function Search() {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);

    // debounce search
    useEffect(
        () => {
            if (!query.trim().length) {
                setResults([]);
                return;
            }
            let timeout = setTimeout(async () => {
                await search(query)
                    .then(results => setResults(results))
            }, 2000);
            return () => clearTimeout(timeout);
        }, [query]
    )

    return (
        <div className="Search">
            <h1>Search</h1>
            <form>
                <input type="text" value={query} onChange={e => {setQuery(e.target.value)}} />
            </form>
            <div>
                {results.map(result => (
                    <SearchResult key={result._id} user={result} />
                ))}
            </div>
        </div>
    );
}

export default Search;