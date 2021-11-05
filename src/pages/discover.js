import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  DISCOVER_TYPE,
  getDiscoverPosts,
} from "../redux/actions/discoverAction";
import LoadIcon from "../images/loading.gif";
import PostThum from "../components/PostThum";
import LoadMoreButton from "../components/LoadMoreButton";
import { getDataApi } from "../utils/fetchData";

const Discover = () => {
  const { auth, discover } = useSelector((state) => state);
  const dispatch = useDispatch();

  const [load, setLoad] = useState(false);

  useEffect(() => {
    if (!discover.fristLoad) {
      dispatch(getDiscoverPosts(auth.token));
    }
  }, [dispatch, auth, discover.fristLoad]);

  const handleLoadMore = async () => {
    setLoad(true);
    const res = await getDataApi(
      `post_discover?num=${discover.page * 9}`,
      auth.token
    );
    dispatch({ type: DISCOVER_TYPE.UPDATE_POST, payload: res.data });
    setLoad(false);
  };

  return (
    <div>
      {discover.loading ? (
        <img src={LoadIcon} alt="loading" className="d-block mx-auto my-4" />
      ) : (
        <PostThum posts={discover.posts} result={discover.result} />
      )}
      {load && <img src={LoadIcon} alt="loading" className="d-block mx-auto" />}
      {!discover.loading && (
        <LoadMoreButton
          result={discover.result}
          page={discover.page}
          load={load}
          handleLoadMore={handleLoadMore}
        />
      )}
    </div>
  );
};

export default Discover;
