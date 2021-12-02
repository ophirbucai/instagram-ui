import React, { useState, useCallback, useEffect } from "react";
import "./Post.scss";
import Avatar from "../../components/Avatar/Avatar";
import { Link } from "react-router-dom";
import moment from "moment";
import PostDate from "./PostDate/PostDate";
import PostLike from "./PostLike/PostLike";
import SwiperOphir from "../../components/Carousel/SwiperOphir";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-solid-svg-icons/faClock";
import {
  faClock as faClockWhite,
  faCommentAlt,
} from "@fortawesome/free-regular-svg-icons";
import Carousel from "../Carousel/Carousel";
import { createComment, getComments } from "../../services/postService";
import { Virtuoso } from "react-virtuoso";

export default function Post({ data: post, className }) {
  const [likesCount, setLikesCount] = useState(post.likes.length);
  const [commentValue, setCommentValue] = useState("");
  const [comments, setComments] = useState([]);
  const submitComment = useCallback(
    async (e) => {
      e.preventDefault();
      await createComment(post._id, commentValue);
      setCommentValue("");
    },
    [post._id, commentValue]
  );
  useEffect(() => {
    const getCommentsFn = async () => {
      const comments = await getComments(post._id);
      setComments(comments.slice(0).reverse());
    };
    getCommentsFn();
  }, [post._id, submitComment]);

  function likesCounter(operator) {
    if (operator === "+") setLikesCount((likesCount) => likesCount + 1);
    if (operator === "-") setLikesCount((likesCount) => likesCount - 1);
  }

  const commentElem = useCallback((index, comment) => {
    return (
      <div key={index}>
        <strong style={{ fontSize: "1em" }}>
          {comment.author.username + "  "}
        </strong>
        <span>{comment.content + " "}</span>
        <FontAwesomeIcon icon={faClockWhite} size="xs" color="#0f0b20" />
        <span
          style={{
            fontWeight: "700",
            fontSize: "0.9em",
            padding: "5px",
          }}>
          {moment(comment.createdAt)
            .fromNow(true)
            .replace(" minutes", "m")
            .replace(" minute", "m")
            .replace(" seconds", "s")
            .replace(" second", "s")
            .replace(" days", "d")
            .replace(" day", "d")
            .replace(" hours", "h")
            .replace(" hour", "h")
            .replace("an", "1")
            .replace("a few", "1")
            .replace("a", "1")}
        </span>
      </div>
    );
  }, []);

  return (
    <article className={className || "Post"}>
      <header>
        <div className="user-group">
          <Link to={"/profile/" + post.author.username}>
            <Avatar username={post.author.username} size="md" />
            <span>{post.author.username}</span>
          </Link>
        </div>
        <div className="date">
          <FontAwesomeIcon icon={faClock} size="sm" color="#0f0b20" />
          <PostDate date={post.createdAt} />
        </div>
      </header>

      <div className="images">
        {/* <Carousel images={post.images} /> */}
        <SwiperOphir images={post.images} />
      </div>
      <div className="description">
        <h1>{post.description}</h1>
      </div>
      <div className="likes">
        <PostLike
          likesCounter={likesCounter}
          likes={post.likes}
          postId={post._id}
        />

        <Link to={"/post/" + post._id}>
          <FontAwesomeIcon icon={faCommentAlt} size="1x" color="#0f0b20" />
        </Link>
      </div>
      <div
        className="comments-list"
        style={{ height: comments.length * 25, maxHeight: "115px" }}>
        <span>{likesCount} Likes</span>
        <Virtuoso
          data={comments}
          itemContent={commentElem}
          totalCount={comments.length}
        />
      </div>
      <div className="add-comment">
        <form onSubmit={submitComment}>
          <input
            type="text"
            placeholder="Write something... "
            onChange={(e) => setCommentValue(e.target.value)}
            value={commentValue}
          />
          <input type="submit" />
        </form>
      </div>
    </article>
  );
}

// <article className="PostPage">
//     <div>
//         <Avatar username={data.author.username} size="md" />
//     </div>
//     <div className="images">
//
//     </div>
// </article>
