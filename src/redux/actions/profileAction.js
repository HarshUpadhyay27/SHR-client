import { GLOBALTYPES } from "./globalType";
import { getDataApi, patchDataApi } from "../../utils/fetchData";
import { imageUpload } from "../../utils/imageUpload";

export const PROFILE_TYPES = {
  LOADING: "LOADING",
  GET_USER: "GET_USER",
};

export const getProfileUser =
  ({ users, id, auth }) =>
  async (dispatch) => {
    if (users.every((user) => user && user._id !== id)) {
      try {
        dispatch({ type: PROFILE_TYPES.LOADING, payload: true });
        const { data } = await getDataApi(`/user/${id}`, auth.token);
        dispatch({
          type: PROFILE_TYPES.GET_USER,
          payload: data,
        });
        dispatch({
          type: PROFILE_TYPES.LOADING,
          payload: false,
        });
      } catch (error) {
        dispatch({
          type: GLOBALTYPES.ALERT,
          payload: { error: error.response.data.msg },
        });
      }
    }
  };

export const updateProfileUser =
  ({ userData, avatar, auth }) =>
  async (dispatch) => {
    if (!userData.fullname)
      return dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { error: "Please add your full name." },
      });

    if (!userData.fullname.length > 25)
      return dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { error: "Your name is too long." },
      });

    if (!userData.story.length > 200)
      return dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { error: "Your story is too long." },
      });

    try {
      let media;
      dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } });
      if (avatar) media = await imageUpload([avatar]);
      dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: false } });

      const res = await patchDataApi(
        "user",
        {
          ...userData,
          avatar: avatar ? media[0].url : auth.user.avatar,
        },
        auth.token
      );
      dispatch({
        type: GLOBALTYPES.AUTH,
        payload: {
          ...auth,
          user: {
            ...auth.user,
            ...userData,
            avatar: avatar ? media[0].url : auth.user.avatar,
          },
        },
      });
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: {success: res.data.msg}
      })
    } catch (error) {}
  };
