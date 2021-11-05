import React, { useEffect, useState } from "react";
import LoadMoreButton from "../LoadMoreButton";
import PostThum from "../PostThum";
import LoadIcon from "../../images/loading.gif";
import { getDataApi } from "../../utils/fetchData";
import { GLOBALTYPES } from "../../redux/actions/globalType";

const Saved = ({ auth, dispatch }) => {
  const [savePosts, setSavePosts] = useState([]);
  const [result, setResult] = useState(0);
  const [page, setPage] = useState(2);
  const [load, setLoad] = useState(false);

  useEffect(() => {
    setLoad(true);
    getDataApi("getSavePosts", auth.token)
      .then((res) => {
        setSavePosts(res.data.savePosts);
        setResult(res.data.result);
        setLoad(false);
      })
      .catch((error) => {
        dispatch({
          type: GLOBALTYPES.ALERT,
          payload: { error: error.response.data.msg },
        });
      });

    return () => setSavePosts([]);
  }, [auth.token, dispatch]);

  const handleLoadMore = async () => {
    setLoad(true);
    const res = await getDataApi(`getSavePosts?limit=${page * 9}`, auth.token);
    setSavePosts(res.data.savePosts);
    setResult(res.data.result);
    setPage(page + 1);
    setLoad(false);
  };

  return (
    <div>
      <PostThum posts={savePosts} result={result} />
      {load && <img src={LoadIcon} alt="loading" className="d-block mx-auto" />}
      <LoadMoreButton
        result={result}
        page={page}
        load={load}
        handleLoadMore={handleLoadMore}
      />
    </div>
  );
};

export default Saved;
