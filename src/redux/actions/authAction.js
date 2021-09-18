import { postDataApi } from "../../utils/fetchData";

export const TYPES = {
  AUTH: "AUTH",
};

export const login = (data) => async (dispatch) => {
  try {
    dispatch({
      type: "NOTIFY",
      payload: { loading: true },
    });
    const res = await postDataApi("login", data);
    localStorage.setItem("fristLogin", true);
    dispatch({
      type: "NOTIFY",
      payload: {
        token: res.data.access_token,
        user: res.data.user
      },
    });
  } catch (error) {
    dispatch({
      type: "NOTIFY",
      payload: {
        error: error.response.data.msg,
      },
    });
  }
};
