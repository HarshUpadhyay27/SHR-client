import { GLOBALTYPES } from "./globalType";
import { imageUpload } from "../../utils/imageUpload";
import { postDataApi } from "../../utils/fetchData";

export const POST_TYPE = {
  CREATE_POST: "CREATE_POST",
};

export const createPost =
  ({ content, images, auth }) =>
  async (dispatch) => {
    let media = [];
    try {
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { loading: true },
      });
      if (images.length > 0) media = await imageUpload(images);

      const res = await postDataApi(
        "posts",
        { content, images: media },
        auth.token
      );

      dispatch({
        type: POST_TYPE.CREATE_POST,
        payload: res.data.newPost,
      });

      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { success: res.data.msg },
      });
    } catch (error) {
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { error: error.response.data.msg },
      });
    }
  };
