import React from 'react';
import Avatar from '../../common/Avatar/Avatar';

function SearchResult({ user }) {
    return (
        <div className="SearchResult">
            <Avatar username={user.username} />
            <div>{user.username}</div>
        </div>

    );
}

export default SearchResult;