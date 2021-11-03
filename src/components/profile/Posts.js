import React, { useEffect, useState } from "react";
import PostThum from "../PostThum";

const Posts = ({ auth, id, dispatch, profile }) => {
  const [posts, setPosts] = useState([]);
  const [result, setResult] = useState(0);

  useEffect(() => {
    profile.posts.forEach((data) => {
      if (data._id === id) {
        setPosts(data.posts);
        setResult(data.result)
      }
    });
  }, [profile.posts, id]);

  return (
    <div>
      <PostThum posts={posts} result={result} />
    </div>
  );
};

export default Posts;
