import { postDataApi } from "../../utils/fetchData";
import { GLOBALTYPES } from "./globalType";
import { POST_TYPE } from "./postAction";

export const createComment = (post, newComment, auth) => async (dispatch) => {
  const newPost = { ...post, comments: [...post.comments, newComment] };

  dispatch({
    type: POST_TYPE.UPDATE_POST,
    payload: newPost,
  });

  try {
    const data = { ...newComment, postId: post._id };
    console.log(data);
    const res = await postDataApi("comment", data, auth.token);

    const newData = { ...res.data.newComment, user: auth.user };
    const newPost = { ...post, comments: [...post.comments, newData] };
    dispatch({ type: POST_TYPE.UPDATE_POST, payload: newPost });
  } catch (err) {
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: { error: err.response.data.msg },
    });
  }
};
