import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPost } from "../services/postService";
import Post from "../common/Post/Post";
import "./PostPage.scss";

export default function PostPage() {
  const { id } = useParams();
  console.log("id", id);
  const [data, setData] = useState(null);
  useEffect(() => {
    async function initPost() {
      const res = await getPost(id);
      setData(res);
    }
    initPost();
  }, [id]);
  console.log("data", data);

  return <>{data && <Post data={data} className="PostPage" />}</>;
}
