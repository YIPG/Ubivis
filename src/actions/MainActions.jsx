import firebase from 'firebase';
import {
    FETCH_USER_LIST,
    FETCH_USER_LIST_SUCCESS,
    // FETCH_USER_LIST_FAIL,
    FETCH_USER_LIST_FINISH,
    DELETE_USER_FROM_LIST,
    INITIALIZE_USER_LIST,
    HANDLE_CALL,
    UPDATE_LOCATION,
    FINISH_TARGET_TRACKING
} from './types';
import history from '../Route/history';

let fetchUnsusbscribe = null;
let fetchLocationUnsubscribe = null;

export const fetchUserList = (male) => {
    return(dispatch) => {
        dispatch({
            type: FETCH_USER_LIST
        });

        fetchUnsusbscribe = firebase.firestore().collection('users').where("male", "==", !male).limit(5)
            .onSnapshot(querySnapshot =>{
                querySnapshot.forEach(doc => fetchUserListSuccess(dispatch, doc));
                fetchUserListLoadFinish(dispatch);
            })
    }
}

const fetchUserListSuccess = (dispatch, doc) => {
    dispatch({
        type: FETCH_USER_LIST_SUCCESS,
        payload: doc
    })
}

const fetchUserListLoadFinish = (dispatch) => {
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
        console.log(id);

        // ユーザーリストの更新を停止
        fetchUnsusbscribe()

        // 地図画面へ飛ばす
        history.push("/map")

        // 指定ユーザーの位置情報を取得
        fetchLocationUnsubscribe = firebase.firestore().collection('locations').where('uid', '==', id).orderBy('createdAt', 'desc').limit(1)
            .onSnapshot(querySnapshot=>{
                querySnapshot.forEach(doc=> {
                    updateLocation(dispatch, doc.data().geopoint)
                })
            }, err=> console.log(err, 'エラー発生'))
    }
}

export const finishTargetTracking = () => {
    if(fetchLocationUnsubscribe!==null){
        fetchLocationUnsubscribe();
        console.log("追跡を中止した");
    }
    return ({
        type: FINISH_TARGET_TRACKING
    })
}

const updateLocation = (dispatch, geopoint) => {
    console.log(geopoint._lat)
    dispatch({
        type: UPDATE_LOCATION,
        latitude: geopoint._lat,
        longitude: geopoint._long
    })
}

export const InitializeUserList = () => {
    return {
        type: INITIALIZE_USER_LIST
    }
}