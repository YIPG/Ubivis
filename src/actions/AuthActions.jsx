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
    IS_LOGGED,
    IS_NOT_LOGGED,
    PHONE_CHANGED,
    PHONE_AUTH
} from './types';
import history from '../Route/history';

export const is_logged = (user) => {
    return {
        type: IS_LOGGED,
        payload: user
    }
}

export const is_not_logged = () => {
    return {
        type: IS_NOT_LOGGED
    }
}

export const phoneChanged = (num) => {
    console.log(num);
    return {
        type: PHONE_CHANGED,
        payload: num
    }
}

export const phoneAuth = (num) => {
    return(dispatch) => {
        dispatch({ type: PHONE_AUTH });

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

        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(user => loginUserSuccess(dispatch, user))
            .catch((error) => {
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

    const actinoCodeSettings = {
        url: (process.env.NODE_ENV!=="production" ? "https://ubivis-development.firebaseapp.com/verified/?email=": 'https://ubivis.tokyo/verified/?email=') + firebase.auth().currentUser.email, 
    }

    console.log(firebase.auth().currentUser.emailVerified)

    if(firebase.auth().currentUser.emailVerified){
        history.push('/welcome')
    } else {
        console.log("メール認証されてません！")
        firebase.auth().currentUser.sendEmailVerification(actinoCodeSettings)
        .then(()=> {
            console.log("メール送りました！")
            history.push('/confirm')
        })
        .catch(error => console.log("なにかエラーが起きたようです",error))
    }
};
