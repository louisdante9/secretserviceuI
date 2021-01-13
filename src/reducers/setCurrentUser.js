import isEmpty from "lodash/isEmpty";
import * as types from "../actions/constants";

export const initialState = {
  isAuthenticated: false,
  user: {},
};

const setCurrentUser = (state = initialState, action = {}) => {
  switch (action.type) {
    case types.USER_AUTHENTICATED:
      return {
        isAuthenticated: !isEmpty(action.user),
        user: action.user,
      };
    default:
      return state;
  }
};
export default setCurrentUser;
