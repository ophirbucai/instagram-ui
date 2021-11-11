import React from 'react';
import './Post.scss'
import Avatar from '../Avatar/Avatar';
import { Link } from 'react-router-dom';
import config from '../../config/index';
import PostDate from './PostDate/PostDate';
import PostLike from './PostLike/PostLike';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from '@fortawesome/free-solid-svg-icons/faClock'

function Post({ data }) {
    return (
        <article className="Post">
            <header>
                <div className="user-group">
                    <Avatar username={data.author.username} />

                    <Link to={'/profile/' + data.author.username}>
                        <span>{data.author.username}</span>
                    </Link>
                </div>
                <div className="date">
                    <FontAwesomeIcon icon={faClock} size="sm" color="#0f0b20" />
                    <PostDate date={data.createdAt} />
                </div>
            </header>
            <div className="image">
                <Link to={'/post/' + data._id}>
                    <img src={config.apiUrl + '/' + data.image} className="Post__image" alt="" />
                </Link>
            </div>
            <div>
                <PostLike likes={data.likes} postId={data._id} />
            </div>
            <div className="content">
                <h1 className="Post__description">{data.body}</h1>
            </div>
        </article>
    );
}

export default Post;