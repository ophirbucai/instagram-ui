import React from "react";
import { Link } from "react-router-dom";
import "./ProfileGallery.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import config from "../../config";

export default function ProfileGallery({ items }) {
  return (
    <div className="ProfileGallery">
      {items &&
        items.map((item) => (
          <Link to={"/post/" + item._id} className="item" key={item._id}>
            <img
              className="image"
              src={config.apiUrl + "/" + item.images[0]}
              alt={item.description}
            />
            <div className="item-info">
              <ul>
                <li className="likes">
                  <span className="visually-hidden">Likes: </span>
                  <FontAwesomeIcon icon={faHeart} />
                  {item.likes.length}
                </li>
                {/*<li className="comments"><span>Likes:</span><FontAwesomeIcon icon={faCommentDots} /></li>*/}
              </ul>
            </div>
          </Link>
        ))}
    </div>
  );
}
// <div className="profile__posts">
//     {posts.map(post => (
//         <Post key={post._id} data={post} />
//     ))}
// </div>

// <article className="Post">
//     <header>
//         <div className="user-group">
//             <Avatar username={post.author.username} />
//
//             <Link to={'/profile/' + post.author.username}>
//                 <span>{post.author.username}</span>
//             </Link>
//         </div>
//         <div className="date">
//             <FontAwesomeIcon icon={faClock} size="sm" color="#0f0b20" />
//             <PostDate date={post.createdAt} />
//         </div>
//     </header>
//     <div className="image">
//         <Link to={'/post/' + post._id}>
//             <img src={config.apiUrl + '/' + post.image} className="Post__image" alt="" />
//         </Link>
//     </div>
//     <div>
//         <PostLike likesCounter={likesCounter} likes={post.likes} postId={post._id} />
//         <span>{likesCount} Likes</span>
//     </div>
//     <div className="content">
//         <h1 className="Post__description">{post.body}</h1>
//     </div>
// </article>
