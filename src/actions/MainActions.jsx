import firebase from 'firebase';
import {
    FETCH_USER_LIST,
    FETCH_USER_LIST_SUCCESS,
    FETCH_USER_LIST_FAIL
} from './types';

export const fetchUserList = (male) => {
    return(dispatch) => {
        dispatch({
            type: FETCH_USER_LIST
        });

        firebase.firestore().collection('users').where('male', '==', !male)
            .get()
            .then(querySnapshot =>{
                querySnapshot.forEach(doc => fetchUserListSuccess(dispatch, doc))
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

const fetchUserListFail = (dispatch, error) => {
    dispatch({ type: FETCH_USER_LIST_FAIL, payload:error })
}