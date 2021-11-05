import { SUGGES_TYPE } from "../actions/suggestionAction";

const initialState = {
  loading: false,
  users: [],
};

const suggestionType = (state = initialState, action) => {
  switch (action.type) {
    case SUGGES_TYPE.LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    case SUGGES_TYPE.GET_USERS:
      return {
        ...state,
        users: action.payload.users,
      };
    default:
      return state;
  }
};

export default suggestionType;
