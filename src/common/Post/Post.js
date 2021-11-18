import React, { useState, useCallback } from 'react';
import './Post.scss'
import Avatar from '../Avatar/Avatar';
import { Link } from 'react-router-dom';
// import config from '../../config';
import PostDate from './PostDate/PostDate';
import PostLike from './PostLike/PostLike';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from '@fortawesome/free-solid-svg-icons/faClock'
import Carousel from "../Carousel/Carousel";

export default function Post({ data:post }) {
    const [likesCount, setLikesCount] = useState(post.likes.length);
    const [commentValue, setCommentValue] = useState('');
    const submitComment = useCallback((e) => {
        e.preventDefault();
        console.log(commentValue);
    }, [commentValue]);

    function likesCounter(operator) {
        if (operator === '+') setLikesCount(likesCount => likesCount + 1);
        if (operator === '-') setLikesCount(likesCount => likesCount - 1);
    }

    return (
        <article className="Post">
            <header>
                <div className="user-group">
                    <Avatar username={post.author.username} size="md" />

                    <Link to={'/profile/' + post.author.username}>
                        <span>{post.author.username}</span>
                    </Link>
                </div>
                <div className="date">
                    <FontAwesomeIcon icon={faClock} size="sm" color="#0f0b20" />
                    <PostDate date={post.createdAt} />
                </div>
            </header>
            <div className="images">
                <Carousel images={post.images} />
            </div>
            <div className="likes">
                <PostLike likesCounter={likesCounter} likes={post.likes} postId={post._id} />
                <span>{likesCount} Likes</span>
            </div>
            <div className="content">
                <h1 className="Post__description">{post.body}</h1>
            </div>
            <div className="comments">
                {post.comments && post.comments.map((comment) => (
                    <div>{comment}</div>
                ))}
                <form onSubmit={submitComment}>
                    <input type="text" onChange={(e) => setCommentValue(e.target.value)} value={commentValue} />
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