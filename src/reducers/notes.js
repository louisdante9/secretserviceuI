import * as types from "../actions/constants";
const initialState = {
  notes: [],
};

const notes = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_ALL_USER_NOTES_SUCCESS:
      return {
        ...state,
        notes: [...action.payload],
      };

    case types.GET_ALL_USER_NOTES_ERROR:
      return {};

    case types.CREATE_USER_NOTE_SUCCESS:
      return {
        ...state,
        ...action.payload,
      };

    case types.CREATE_USER_NOTE_ERROR:
      return {};

    case types.UPDATE_USER_NOTE_SUCCESS:
      return {
        ...state,
        ...action.payload,
      };
    case types.UPDATE_USER_NOTE_ERROR:
      return {};
      
    default:
      return state;
  }
};

export default notes;
