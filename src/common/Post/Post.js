import React, { useState } from 'react';
import './Post.scss'
import Avatar from '../Avatar/Avatar';
import { Link } from 'react-router-dom';
import config from '../../config/index';
import PostDate from './PostDate/PostDate';
import PostLike from './PostLike/PostLike';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from '@fortawesome/free-solid-svg-icons/faClock'

function Post({ data:post }) {
    const [likesCount, setLikesCount] = useState(post.likes.length);
    function likesCounter(operator) {
        if (operator === '+') setLikesCount(likesCount => likesCount + 1);
        if (operator === '-') setLikesCount(likesCount => likesCount - 1);
    }

    return (
        <article className="Post">
            <header>
                <div className="user-group">
                    <Avatar username={post.author.username} />

                    <Link to={'/profile/' + post.author.username}>
                        <span>{post.author.username}</span>
                    </Link>
                </div>
                <div className="date">
                    <FontAwesomeIcon icon={faClock} size="sm" color="#0f0b20" />
                    <PostDate date={post.createdAt} />
                </div>
            </header>
            <div className="image">
                <Link to={'/post/' + post._id}>
                    <img src={config.apiUrl + '/' + post.image} className="Post__image" alt="" />
                </Link>
            </div>
            <div>
                <PostLike likesCounter={likesCounter} likes={post.likes} postId={post._id} />
                <span>{likesCount} Likes</span>
            </div>
            <div className="content">
                <h1 className="Post__description">{post.body}</h1>
            </div>
        </article>
    );
}

export default Post;