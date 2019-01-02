import {
    FETCH_USER_LIST,
    FETCH_USER_LIST_SUCCESS,
    FETCH_USER_LIST_FAIL
} from '../actions/types';

const INITIAL_STATE = {
    fetchUserList: [],
    loading: false
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case FETCH_USER_LIST:
            return {...state, loading:true}
        case FETCH_USER_LIST_SUCCESS:
            return { ...state, loading: false, fetchUserList:[
                ...state.fetchUserList,
                {
                    id: action.payload.id,
                    data: action.payload.data()
                }
            ]}
        case FETCH_USER_LIST_FAIL:
            return {...state, loading:false}
        default:
            return state
    }
}