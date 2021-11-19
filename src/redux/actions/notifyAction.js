import { GLOBALTYPES } from "./globalType";
import { deleteDataApi, postDataApi } from "../../utils/fetchData";

export const createNotify =
  ({ msg, auth, socket }) =>
  async (dispatch) => {
    try {
      const res = await postDataApi("notify", msg, auth.token);
      console.log(res);
    } catch (error) {
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { error: error.response.data.msg },
      });
    }
  };

export const removeNotify =
  ({ msg, auth, socket }) =>
  async (dispatch) => {
    try {
      const res = await deleteDataApi(
        `notify/${msg.id}?url=${msg.url}`,
        auth.token
      );
      console.log(res);
    } catch (error) {
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { error: error.response.data.msg },
      });
    }
  };
