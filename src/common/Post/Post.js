import React from 'react';
import './Post.scss'
import Avatar from '../Avatar/Avatar';
import { Link } from 'react-router-dom';
import config from '../../config/index';

function Post({ data }) {
    return (
        <article className="Post">
            <header>
                <div className="user-group">
                    <Avatar image="https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png" />

                    <Link to={'/profile/' + data.author.username}>
                        <span>{data.author.username}</span>
                    </Link>
                </div>
                <div className="date">
                    {/* <PostDate date={data.createdAt} /> */}
                </div>
            </header>
            <div className="image">
                <Link to={'/post/' + data._id}>
                    <img src={config.apiUrl + '/' + data.image} className="Post__image" alt="" />
                </Link>
            </div>
            <div className="content">
                <h1 className="Post__description">{data.body}</h1>
            </div>
        </article>
    );
}

export default Post;