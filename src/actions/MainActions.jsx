import firebase from 'firebase';
import {
    FETCH_USER_LIST,
    FETCH_USER_LIST_SUCCESS,
    // FETCH_USER_LIST_FAIL,
    FETCH_USER_LIST_FINISH,
    DELETE_USER_FROM_LIST,
    INITIALIZE_USER_LIST,
    HANDLE_CALL,
    UPDATE_LOCATION
} from './types';

export const fetchUserList = (male) => {
    return(dispatch) => {
        dispatch({
            type: FETCH_USER_LIST
        });

        firebase.firestore().collection('users').limit(5)
            .onSnapshot(querySnapshot =>{
                querySnapshot.forEach(doc => fetchUserListSuccess(dispatch, doc));
                fetchUserListFinish(dispatch);
            })
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

// const fetchUserListFail = (dispatch, error) => {
//     dispatch({ type: FETCH_USER_LIST_FAIL, payload:error })
// }

export const deleteUserFromList = (id) => {
    return {
        type: DELETE_USER_FROM_LIST,
        payload: id
    }
}

export const handleCall = id => {
    return(dispatch) =>{
        dispatch({ type: HANDLE_CALL});
        console.log(id)
        firebase.firestore().collection('locations').where('uid', '==', id).orderBy('createdAt', 'desc').limit(1)
        .onSnapshot(querySnapshot=>{
            querySnapshot.forEach(doc=> {
                // updateLocation(dispatch, doc.data().geopoint);
                console.log(doc.data().geopoint.getLatitude())
            })
        }, err=> console.log(err, 'エラー発生'))
    }
}

const updateLocation = (dispatch, geopoint) => {
    dispatch({
        type: UPDATE_LOCATION,
        latitude: geopoint.getLatitude(),
        longitude: geopoint.getLongitude()
    })
}

export const InitializeUserList = () => {
    return {
        type: INITIALIZE_USER_LIST
    }
}