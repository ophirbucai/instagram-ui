import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPost } from "../../services/postService";
import Post from "../../components/Post/Post";
import "./PostPage.scss";

export default function PostPage() {
  const { id } = useParams();

  const [data, setData] = useState(null);
  useEffect(() => {
    async function initPost() {
      const res = await getPost(id);
      setData(res);
    }
    initPost();
  }, [id]);

  return <>{data && <Post data={data} className="PostPage" />}</>;
}
