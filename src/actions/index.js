import axios from "axios";
import jwtDecode from "jwt-decode";
import swal from "sweetalert";
import setAuthToken from "../utils/SetAuthToken";
import {
  USER_AUTHENTICATED,
  SIGN_UP_USER_ERROR,
  GET_ALL_USER_NOTES_SUCCESS,
  GET_ALL_USER_NOTES_ERROR,
  UPDATE_USER_NOTE_SUCCESS,
  UPDATE_USER_NOTE_ERROR,
  CREATE_USER_NOTE_SUCCESS,
  CREATE_USER_NOTE_ERROR,
} from "./constants";

const API = "http://localhost:3001";

/**
 *
 *
 * @export
 * @param {any} user
 * @returns {void}
 */
export function setCurrentUser(user) {
  return {
    type: USER_AUTHENTICATED,
    user
  };
}

/**
 *
 *
 * @desc this function register the returned jwt token to
 * localstorage and pass it to axios header
 * @param {object} data
 * @returns {string}
 */
function registerToken(key, { token }, fn) {
  setLocalStore(key, token)
  fn(token);
  return token;
}

const setLocalStore = (key, token) => window.localStorage.setItem(key, token);
/**
 *
 * @desc this function returns a jwt token
 * @param {any} token
 * @returns {void}
 */
function decode(token) {
  return jwtDecode(token);
}
export function signupErros(errors) {
  return {
    type: SIGN_UP_USER_ERROR,
    errors,
  };
}
/**
 *
 *
 * @desc this function signs in a user
 * @param {object} responseData
 * @returns {function}
 */
export function SigninRequest(userData) {
  return dispatch => axios.post(`${API}/v1/login`, userData)
    .then(({data}) => {
      const token = registerToken('token', data, setAuthToken);
      dispatch(setCurrentUser(decode(token)));
      return decode(token)
    });
}

/**
 *
 *
 * @desc this method signs up a user
 * @param {object} userData
 * @param callback
 * @returns {function}
 */
export function SignupRequest(userData, callback) {
  return dispatch => axios.post(`${API}/v1/register`, userData)
    .then(res => {
      const token = registerToken("token", res.data, setAuthToken);
      dispatch(setCurrentUser(decode(token)));
      return callback(res);
    }).catch((error) => {
      dispatch(signupErros( error));
      return callback(error);
    })
}
const getAllUserNoteSuccess = (notes) => ({ type: GET_ALL_USER_NOTES_SUCCESS, payload: notes });

const getAllUserNoteFailed = (notes) => ({
  type: GET_ALL_USER_NOTES_ERROR,
  payload: notes,
});
/**
   * @function getAllUserNotes
   *
   * @returns {object} dispatches an action
   *
   * @description get all user notes
   */
export const getAllUserNotes = () => {
    return dispatch =>
      axios
        .get(`${API}/v1/note`)
        .then((response) => {
          dispatch(getAllUserNoteSuccess(response.data));
        })
        .catch((err) => {
          dispatch(getAllUserNoteFailed(err));
        });
}

 const updateUserNoteSuccess = (note) => ({
   type: UPDATE_USER_NOTE_SUCCESS,
   note,
 });

 const updateUserNoteFailed = (note) => ({
   type: UPDATE_USER_NOTE_ERROR,
   note,
 });

 /**
  * @function updateUserNote
  * 
  * @returns {object} dispatches an action
  *
  * @description update a user note
  */
 export function updateUserNote(id, obj) {
   return (dispatch) =>
     axios
       .put(`${API}/v1/note/${id}`, obj)
       .then((response) => {
         dispatch(updateUserNoteSuccess(response.data));
       })
       .catch((error) => {
       
         dispatch(updateUserNoteFailed(error.response.data.message));
       });
 }


 const createUserNoteSuccess = (note) => ({
   type: CREATE_USER_NOTE_SUCCESS,
   note,
 });

 const createUserNoteFailed = (note) => ({
   type: CREATE_USER_NOTE_ERROR,
   note,
 });

 /**
  * @function updateUserNote
  *
  * @returns {object} dispatches an action
  *
  * @description update a user note
  */
 export function createUserNote(obj) {
   return (dispatch) =>
     axios
       .post(`${API}/v1/note/create`, obj)
       .then((response) => {
         dispatch(createUserNoteSuccess(response.data));
       })
       .catch((error) => {
         dispatch(createUserNoteFailed(error.response.data.message));
       });
 }
 /**
 * 
 * 
 * @desc this method logs out a user
 * @returns {void}
 */
export function logout() {
  return dispatch => {
    localStorage.removeItem('token');
    setAuthToken(false);
    dispatch(setCurrentUser({}));
  };
}