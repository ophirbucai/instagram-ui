import React, {useContext, useEffect, useState} from 'react';
import { getFeed } from '../services/postService';
import './Feed.scss';
import Post from "../common/Post/Post";

function Feed() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const getPosts = async() => {
            try {
                const posts = await getFeed();
                setPosts(posts);
            } catch (err) {
                console.log(err);
            }
        }
        getPosts();
    }, [])

    return (
        <div className="Feed">
            {posts.map((post) => <Post data={post} />)}
        </div>
    );
}

export default Feed;