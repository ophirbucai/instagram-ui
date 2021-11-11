import React, { useState, useContext } from 'react';
import { UserContext } from "../../../App";
import { postLike, postUnlike } from '../../../services/postService';

function PostLike({ postId, likes }) {
    const { user } = useContext(UserContext);
    const [likesCount, setLikesCount] = useState(likes.length);
    const [hasLiked, setHasLiked] = useState(likes.includes(user._id));

    function like() {
        setHasLiked(true);
        setLikesCount(prev => prev + 1);
        postLike(postId)
            .catch(() => {
                setHasLiked(false);
                setLikesCount(prev => prev - 1);
            });
    }
    function unlike() {
        setHasLiked(false);
        setLikesCount(prev => prev - 1);
        postUnlike(postId)
            .catch(() => {
                setHasLiked(true);
                setLikesCount(prev => prev + 1);
            });
    }

    return (
        <>
            {hasLiked ?
            <button onClick={unlike}>Unlike</button> :
            <button onClick={like}>Like</button>}
            {likesCount} Likes
        </>
    );
}

export default PostLike;