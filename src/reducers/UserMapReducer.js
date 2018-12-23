import {
    LOCATE_USER,
    ON_VIEWPORT_CHANGE,
    TRACK_USER_START
} from '../actions/types';

const INITIAL_STATE = {
    viewport: {
        width: 400,
        height: 400,
        latitude: 37.7577,
        longitude: -122.4376,
        zoom: 8
    },
    marker: {
        latitude:37.7577,
        longitude:-122.4376,
    }
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case LOCATE_USER:
            return { ...state, viewport: {...state.viewport, latitude:action.latitude, longitude: action.longitude }, marker:{...state.marker, latitude:action.latitude, longitude: action.longitude}};
        case ON_VIEWPORT_CHANGE:
            return {...state, viewport:action.payload };
        case TRACK_USER_START:
            return state;
        default:
            return state;
    }
};