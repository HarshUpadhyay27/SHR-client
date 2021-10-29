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
    const data = { ...newPost, postId: post._id };
    const res = await postDataApi("comment", data, auth.token);

    console.log(res);
  } catch (err) {
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: { error: err.response.data.msg },
    });
  }
};
