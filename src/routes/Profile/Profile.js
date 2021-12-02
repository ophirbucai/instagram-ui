import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPosts } from "../../services/postService";
import ProfileHeader from "./ProfileHeader/ProfileHeader";
import "./Profile.scss";
import ProfileGallery from "./ProfileGallery/ProfileGallery";

export default function Profile() {
  const [posts, setPosts] = useState([]);
  const { username } = useParams();

  useEffect(() => {
    async function initUser() {
      const posts = await getPosts(username);
      setPosts(posts);
    }
    initUser();
  }, [username]);

  return (
    <div className="Profile">
      <ProfileHeader username={username} postsCount={posts.length} />
      {/* {Move Profile Customize here} */}
      <ProfileGallery items={posts} />
    </div>
  );
}
