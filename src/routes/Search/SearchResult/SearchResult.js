import React from "react";
import Avatar from "../../../components/Avatar/Avatar";
import { Link } from "react-router-dom";
import "./SearchResult.scss";

function SearchResult({ user }) {
  return (
    <Link to={`/profile/${user.username}`} className="SearchResult">
      <Avatar username={user.username} size="lg" />
      <span>{user.username}</span>
    </Link>
  );
}

export default SearchResult;
