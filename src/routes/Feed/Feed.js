import React, { useEffect, useState, useCallback } from "react";
import Post from "../../components/Post/Post";
import { Link } from "react-router-dom";
import { getFeed } from "../../services/postService";
import { Virtuoso } from "react-virtuoso";
import "./Feed.scss";

function Feed() {
  const [posts, setPosts] = useState([]);

  const post = useCallback((index, post) => {
    return <Post data={post} />;
  }, []);

  useEffect(() => {
    const getPosts = async () => {
      try {
        const res = await getFeed();
        setPosts(res.slice(0).reverse());
      } catch (err) {
        console.log(err);
      }
    };
    getPosts();
  }, []);

  return (
    <div className="Feed">
      <Virtuoso data={posts} itemContent={post} />
    </div>
  );
}

export default Feed;
