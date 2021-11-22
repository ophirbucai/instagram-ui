import React, { useEffect, useState } from "react";
import Post from "../../components/Post/Post";
import { getFeed } from "../../services/postService";
import "./Feed.scss";

function Feed() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const getPosts = async () => {
      try {
        const posts = await getFeed();
        setPosts(posts.slice(0).reverse());
      } catch (err) {
        console.log(err);
      }
    };
    getPosts();
  }, []);
  console.log(posts);
  return (
    <div className="Feed">
      {posts.map((post) => (
        <Post data={post} key={post._id} />
      ))}
    </div>
  );
}

export default Feed;
