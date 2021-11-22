import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "../../../App";
import { postLike, postUnlike } from "../../../services/postService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as regHeart } from "@fortawesome/free-regular-svg-icons";

function PostLike({ postId, likes, likesCounter }) {
  const { user } = useContext(UserContext);
  const [hasLiked, setHasLiked] = useState(likes.includes(user._id));
  // const [likesCount, setLikesCount] = useState(likes.length);

  useEffect(() => {
    setHasLiked(likes.includes(user._id));
  }, [user, likes]);

  function like() {
    setHasLiked(true);
    likesCounter("+");
    postLike(postId).catch(() => {
      setHasLiked(false);
      likesCounter("-");
    });
  }
  function unlike() {
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
        <div onClick={unlike}>
          <FontAwesomeIcon icon={faHeart} />
        </div>
      ) : (
        <div onClick={like}>
          <FontAwesomeIcon icon={regHeart} />
        </div>
      )}
    </>
  );
}

export default PostLike;
