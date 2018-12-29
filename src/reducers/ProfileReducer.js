import {
    SEX_CHANGED,
    AGE_CHANGED,
    REGION_CHANGED,
    PROFILE_FINISH,
    IMAGE_UPLOADED,
    NAME_CHANGED,
    PROFILE_CHANGED,
    SNACK_CHANGED,
    PROFILEIMAGE_CHANGED,
    PROFILE_GET,
    PROFILE_GET_FAIL,
    PROFILE_GET_SUCCESS
} from '../actions/types';
  
const INITIAL_STATE = {
    male: true,
    age: 0,
    region: '東京都',
    name: '',
    profile: '',
    profImage: false,
    profileImage: null,
    snack: '',
    mypageProfile: null,
    loading: true
};
  
export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SEX_CHANGED:
        return { ...state, male: action.payload };
        case AGE_CHANGED:
        return { ...state, age: action.payload };
        case REGION_CHANGED:
        return { ...state, region: action.payload };
        case NAME_CHANGED:
        return { ...state, name: action.payload };
        case PROFILE_CHANGED:
        return { ...state, profile: action.payload };
        case PROFILEIMAGE_CHANGED:
        return { ...state, profileImage: action.payload };
        case SNACK_CHANGED:
        return { ...state, snack: action.payload };
        case IMAGE_UPLOADED:
        return { ...state, profImage: true };
        case PROFILE_FINISH:
        return state;
        case PROFILE_GET:
        return {...state, loading:true};
        case PROFILE_GET_SUCCESS:
        return {...state, loading: false, mypageProfile: action.payload};
        case PROFILE_GET_FAIL:
        return {...state, loading:true}
        default:
        return state;
    }
};
  