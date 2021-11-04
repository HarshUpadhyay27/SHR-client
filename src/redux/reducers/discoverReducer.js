const { DISCOVER_TYPE } = require("../actions/discoverAction");

const initialState = {
  loading: false,
  posts: [],
  result: 9,
  page: 2,
  fristLoad: false,
};

const discoverRducer = (state = initialState, action) => {
  switch (action.type) {
    case DISCOVER_TYPE.LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    case DISCOVER_TYPE.GET_POSTS:
      return {
        ...state,
        posts: action.payload.posts,
        result: action.payload.result,
        fristLoad: action.payload.fristLoad,
      };
    case DISCOVER_TYPE.UPDATE_POST:
      return {
        ...state,
        posts: action.payload.posts,
        result: action.payload.result,
        page: state.page + 1,
      };
    default:
      return state;
  }
};

export default discoverRducer;
