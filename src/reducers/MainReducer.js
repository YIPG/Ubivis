import {
    FETCH_USER_LIST,
    FETCH_USER_LIST_SUCCESS,
    FETCH_USER_LIST_FAIL,
    FETCH_USER_LIST_FINISH,
    DELETE_USER_FROM_LIST,
    INITIALIZE_USER_LIST
} from '../actions/types';

// fetchUserList: [
//     id: hoge,
//     data: hoge,
//     show: true
// ] のような構造です。

const INITIAL_STATE = {
    fetchUserList: [],
    loading: false
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case FETCH_USER_LIST:
            return {...state, loading:true}
        case FETCH_USER_LIST_SUCCESS:
            return { ...state, fetchUserList:[
                ...state.fetchUserList,
                {
                    id: action.payload.id,
                    data: action.payload.data(),
                    show: true
                }
            ]}
        case FETCH_USER_LIST_FINISH:
            return {...state, loading: false}
        case FETCH_USER_LIST_FAIL:
            return {...state, loading:false}
        case DELETE_USER_FROM_LIST:
            return {...state, fetchUserList: state.fetchUserList.map(
                user => 
                     user.id === action.payload ? {...user, show: !user.show } : user
            )}
        case INITIALIZE_USER_LIST:
            return INITIAL_STATE
        default:
            return state
    }
}