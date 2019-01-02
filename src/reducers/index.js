import { combineReducers } from 'redux';
import AuthReducer from './AuthReducers';
import ProfileReducer from './ProfileReducer';
import UserMapReducer from './UserMapReducer';
import MainReducer from './MainReducer';

export default combineReducers({
    auth: AuthReducer,
    profile: ProfileReducer,
    map: UserMapReducer,
    main: MainReducer
});
