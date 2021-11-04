import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PostCard from "../PostCard";
import LoadMoreButton from "../LoadMoreButton";
import LoadIcon from "../../images/loading.gif";
import { getDataApi } from "../../utils/fetchData";
import { POST_TYPE } from "../../redux/actions/postAction";

const Posts = () => {
  const { homePosts, auth } = useSelector((state) => state);
  const dispatch = useDispatch();

  const [load, setLoad] = useState(false);

  const handleLoadMore = async () => {
    setLoad(true);
    const res = await getDataApi(
      `posts?limit=${homePosts.page * 9}`,
      auth.token
    );
    console.log(res);
    dispatch({
      type: POST_TYPE.GET_POSTS,
      payload: { ...res.data, page: homePosts.page + 1 },
    });
    setLoad(false);
  };

  return (
    <div className="posts">
      {homePosts.posts.map((post) => (
        <PostCard key={post._id} post={post} />
      ))}
      {load && <img src={LoadIcon} alt="loading" className="d-block mx-auto" />}
      <LoadMoreButton
        result={homePosts.result}
        page={homePosts.page}
        load={load}
        handleLoadMore={handleLoadMore}
      />
    </div>
  );
};

export default Posts;
