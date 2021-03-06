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
    PHONE_CHANGED
} from '../actions/types';

const INITIAL_STATE = {
    phoneNumber: '',
    email: '',
    password: '',
    user: null,
    isLoggedIn: false,
    error: '',
    loading: false
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case EMAIL_CHANGED:
            return { ...state, email: action.payload };
        case PASSWORD_CHANGED:
            return { ...state, password: action.payload };
        case LOGIN_USER:
            return { ...state, loading: true, error: '' };
        case LOGIN_USER_SUCCESS:
            return { ...state, ...INITIAL_STATE, user: action.payload, isLoggedIn: true };
        case LOGIN_USER_FAIL:
            return { ...state, error: 'Authentication Failed.', password: '', loading: false, isLoggedIn:false };
        case LOGOUT_USER:
            return {...state, loading: true, error: '' };
        case LOGOUT_USER_SUCCESS:
            return { ...state, ...INITIAL_STATE, isLoggedIn: false };
        case LOGOUT_USER_FAIL:
            return { ...state, error: 'Logout Failed.', loading: false };
        case IS_LOGGED:
            return {...state, user: action.payload, isLoggedIn:true};
        case IS_NOT_LOGGED:
            return {...state, user: null, isLoggedIn:false};
        case PHONE_CHANGED:
            return {...state, phoneNumber:action.payload}
        default:
            return state;
    }
};
