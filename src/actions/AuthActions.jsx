import firebase from 'firebase';
import {
    EMAIL_CHANGED,
    PASSWORD_CHANGED,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAIL,
    LOGIN_USER,
    LOGOUT_USER,
    LOGOUT_USER_SUCCESS,
    LOGOUT_USER_FAIL,
    FETCH_LOGIN_STATE
} from './types';
import history from '../Route/history';

export const fetchLoginState = () => {
    return (dispatch) => {
        const user = firebase.auth().currentUser;

        dispatch({
            type: FETCH_LOGIN_STATE,
            payload: user
        })   
    }
}

export const emailChanged = (text) => {
    return {
        type: EMAIL_CHANGED,
        payload: text
    };
};

export const passwordChanged = (text) => {
    return {
        type: PASSWORD_CHANGED,
        payload: text
    };
};

export const loginUser = ({ email, password }) => {
    return (dispatch) => {
        dispatch({ type: LOGIN_USER });

        console.log(email);

        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(user => loginUserSuccess(dispatch, user))
            .catch((error) => {
                console.log(error);

                firebase.auth().createUserWithEmailAndPassword(email, password)
                    .then(user => loginUserSuccess(dispatch, user))
                    .catch(() => loginUserFail(dispatch));
            });
    };
};

export const logoutUser = () => {
    return (dispatch) => {
        dispatch({ type: LOGOUT_USER });

        firebase.auth().signOut()
            .then(() => logoutUserSuccess(dispatch))
            .catch(() => logoutUserFail(dispatch));
    };
};

const loginUserFail = (dispatch) => {
    dispatch({ type: LOGIN_USER_FAIL });
};

const logoutUserFail = (dispatch) => {
    dispatch({ type: LOGOUT_USER_FAIL });
};

const logoutUserSuccess = (dispatch) => {
    dispatch({ type: LOGOUT_USER_SUCCESS });
    console.log('Logout Success');
}

const loginUserSuccess = (dispatch, user) => {
    dispatch({
        type: LOGIN_USER_SUCCESS,
        payload: user
    });
    console.log('Login Success');
    console.log(`現在のログイン状態は${user !== null}です。`);
    history.push('/welcome')
};
