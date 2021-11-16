import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getPost } from '../services/postService';
import config from '../config/index';
import Avatar from "../common/Avatar/Avatar";
// import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
// import {faClock} from "@fortawesome/free-solid-svg-icons/faClock";
// import PostDate from "../common/Post/PostDate/PostDate";
// import PostLike from "../common/Post/PostLike/PostLike";

export default function PostPage() {
    const { id } = useParams();
    const [data, setData] = useState(null);

    useEffect(() => {
        async function initPost() {
            const res = await getPost(id);
            setData(res);
        }
        initPost();
    }, [id])

    console.log(data);
    return (
        <>{data &&
            <article className="PostPage">
                <div>
                    <Avatar username={data.author.username} size="md" />

                </div>
                <img src={config.apiUrl + '/' + data.image} alt=""/>
            </article>
        }</>
    );
}

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