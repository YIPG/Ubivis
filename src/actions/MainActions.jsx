import firebase from 'firebase';
import {
    FETCH_USER_LIST,
    FETCH_USER_LIST_SUCCESS,
    FETCH_USER_LIST_FAIL,
    FETCH_USER_LIST_FINISH,
    DELETE_USER_FROM_LIST
} from './types';

export const fetchUserList = (male) => {
    return(dispatch) => {
        dispatch({
            type: FETCH_USER_LIST
        });

        firebase.firestore().collection('users').where('male', '==', !male)
            .get()
            .then(querySnapshot =>{
                querySnapshot.forEach(doc => fetchUserListSuccess(dispatch, doc));
                fetchUserListFinish(dispatch);
            })
            .catch(error => fetchUserListFail(dispatch, error))
    }
    
}

const fetchUserListSuccess = (dispatch, doc) => {
    dispatch({
        type: FETCH_USER_LIST_SUCCESS,
        payload: doc
    })
}

const fetchUserListFinish = dispatch => {
    dispatch({ type: FETCH_USER_LIST_FINISH })
}

const fetchUserListFail = (dispatch, error) => {
    dispatch({ type: FETCH_USER_LIST_FAIL, payload:error })
}

export const deleteUserFromList = (id) => {
    return {
        type: DELETE_USER_FROM_LIST,
        payload: id
    }
}