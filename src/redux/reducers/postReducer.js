import { EditData } from "../actions/globalType";
import { POST_TYPE } from "../actions/postAction";

const initialState = {
  loading: false,
  posts: [],
  result: 0,
  page: 2,
};

const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case POST_TYPE.CREATE_POST:
      return {
        ...state,
        posts: [...state.posts, action.payload],
      };
    case POST_TYPE.LOADING_POST:
      return {
        ...state,
        loading: action.payload,
      };
    case POST_TYPE.GET_POSTS:
      return {
        ...state,
        posts: action.payload.posts,
        result: action.payload.result,
      };
    case POST_TYPE.UPDATE_POST:
      return {
        ...state,
        posts: EditData(state.posts, action.payload._id, action.payload),
      };
    default:
      return state;
  }
};

export default postReducer;