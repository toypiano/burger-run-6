import produce from 'immer';
import axios from 'axios';

/**
 * @global setTimeout id for auto-logout
 */
let timeoutId;

// =============================================
// Actions
// =============================================
const AUTH_REQUEST = 'auth/request';
const AUTH_SUCCESS = 'auth/success';
const AUTH_FAIL = 'auth/fail';
const REDIRECT_PATH_SET = 'auth/redirectPathSet';
const LOG_OUT = 'auth/logOut';
const LOGOUT_TIMEOUT_SET = 'auth/logoutTimeoutSet';
const LOGOUT_TIMEOUT_CLEAR = 'auth/logoutTimeoutClear';
const AUTH_CHECK_STATUS = 'auth/checkStatus';

// =============================================
// Reducer
// =============================================
const initialState = {
  idToken: null,
  localId: null,
  email: null,
  error: null,
  authRedirectPath: '/',
};

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case AUTH_REQUEST:
      return produce(state, (d) => {
        d.error = null;
      });
    case AUTH_SUCCESS:
      return produce(state, (d) => {
        d.error = null;
        d.idToken = action.data.idToken;
        d.localId = action.data.localId;
        d.email = action.data.email;
      });
    case AUTH_FAIL:
      return produce(state, (d) => {
        d.error = action.error;
      });
    case REDIRECT_PATH_SET:
      return produce(state, (d) => {
        d.authRedirectPath = action.path;
      });
    case LOG_OUT:
      return produce(state, (d) => {
        d.idToken = null;
        d.localId = null;
        d.email = null;
      });
    default:
      return state;
  }
}

// =============================================
// Action Creators
// =============================================
export const authRequest = () => ({ type: AUTH_REQUEST });
export const authFail = (error) => ({ type: AUTH_FAIL, error });
export const authSuccess = (data) => ({
  type: AUTH_SUCCESS,
  data,
});

export const authCheckStatus = () => ({
  type: AUTH_CHECK_STATUS,
});

export const setAuthRedirect = (path) => {
  return { type: REDIRECT_PATH_SET, path };
};

/**
 * Clears the most recently set timeout
 */
export const clearLogoutTimeout = () => {
  clearTimeout(timeoutId);
  return { type: LOGOUT_TIMEOUT_CLEAR };
};
// =============================================
// Thunk - Action Dispatchers - Creators
// =============================================

/**
 *
 * @param {number} expiresIn milliseconds to token expiration
 */
export const setLogoutTimeout = (remainingTime) => {
  return function setLogoutTimeoutThunk(dispatch) {
    timeoutId = setTimeout(() => dispatch(logOut()), remainingTime);
    dispatch({ type: LOGOUT_TIMEOUT_SET });
  };
};

const API_KEY = 'AIzaSyA1pWZdfPD4UUUAre_lIUZK-WwyZvIyuW4'; // cspell: disable-line
const SIGN_IN = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`;
const SIGN_UP = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`;

/**
 * Sign-in or sign-up user to the backend
 * and save token, id and email to localStorage.
 * Also set timeout for auto-logout.
 * @param {string} email user-entered email
 * @param {string} password user-entered password
 * @param {boolean} isSignIn true: sign in | false: sign up
 */
export const auth = (email, password, isSignIn) => {
  return async function authThunk(dispatch) {
    dispatch(authRequest());
    const uri = isSignIn ? SIGN_IN : SIGN_UP;
    const payload = {
      email,
      password,
      returnSecureToken: true,
    };
    try {
      const response = await axios.post(uri, payload);
      console.log(response);

      // store user info into localStorage
      localStorage.setItem('idToken', response.data.idToken);
      localStorage.setItem('localId', response.data.localId);
      localStorage.setItem('email', email);

      // idToken will expire after expiresIn (seconds)
      const remainingTime = response.data.expiresIn * 1000;
      const expirationDate = new Date(new Date().getTime() + remainingTime);
      localStorage.setItem('expirationDate', expirationDate);

      dispatch(setLogoutTimeout(remainingTime));
      dispatch(authSuccess(response.data));
    } catch (err) {
      dispatch(authFail(err));
      return Promise.reject(err);
    }
  };
};

export const logOut = () => {
  return function logOutThunk(dispatch) {
    dispatch(clearLogoutTimeout());
    localStorage.removeItem('idToken');
    localStorage.removeItem('localId');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('email');
    dispatch({
      type: LOG_OUT,
    });
  };
};

/**
 * Check authentication status since page reload cleans up app state
 * If token hasn't expired, logs the user in automatically
 * and save token, id, email into the app state
 */
export const checkAuthStatus = () => {
  return function checkAuthStatusThunk(dispatch) {
    dispatch(authCheckStatus());

    // get token, id, email from localStorage
    const idToken = localStorage.getItem('idToken');
    const localId = localStorage.getItem('localId');
    const email = localStorage.getItem('email');
    const expirationDate = new Date(localStorage.getItem('expirationDate'));

    // if no token, log out to reset status
    if (!idToken) {
      dispatch(logOut());
    } else {
      // if token & before expiration, login with storage data
      // and also re-set the timeout for auto-logout with
      // remaining expiration time from now

      if (new Date() < expirationDate) {
        const remainingTime = expirationDate.getTime() - new Date().getTime();
        dispatch(clearLogoutTimeout());
        dispatch(setLogoutTimeout(remainingTime));

        const data = {
          idToken,
          localId,
          email,
        };
        dispatch(authSuccess(data));
      }
    }
  };
};
