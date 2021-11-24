import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "../../../App";
import { postLike, postUnlike } from "../../../services/postService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as regHeart } from "@fortawesome/free-regular-svg-icons";

function PostLike({ postId, likes, likesCounter }) {
  const { user } = useContext(UserContext);
  const [hasLiked, setHasLiked] = useState(likes.includes(user._id));

  useEffect(() => {
    setHasLiked(likes.includes(user._id));
  }, [user, likes]);

  function like(e) {
    e.preventDefault();
    setHasLiked(true);
    likesCounter("+");
    postLike(postId).catch(() => {
      setHasLiked(false);
      likesCounter("-");
    });
  }
  function unlike(e) {
    e.preventDefault();
    setHasLiked(false);
    likesCounter("-");
    postUnlike(postId).catch(() => {
      setHasLiked(true);
      likesCounter("+");
    });
  }

  return (
    <>
      {hasLiked ? (
        <button onClick={unlike} className="toggle-like-button">
          <FontAwesomeIcon icon={faHeart} />
        </button>
      ) : (
        <button onClick={like} className="toggle-like-button">
          <FontAwesomeIcon icon={regHeart} />
        </button>
      )}
    </>
  );
}

export default PostLike;
