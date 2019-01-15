import {
    LOCATE_USER,
    ON_VIEWPORT_CHANGE,
} from '../actions/types';
import {FlyToInterpolator} from 'react-map-gl';

const INITIAL_STATE = {
    viewport: {
        width: 400,
        height: 500,
        latitude: 35.691638,
        longitude: 139.704616,
        zoom: 8
    },
    marker: {
        latitude:35.691638,
        longitude:139.704616,
    }
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case LOCATE_USER:
            return { ...state, viewport: {
                ...state.viewport,
                latitude:action.latitude, 
                longitude: action.longitude, 
                zoom:13, 
                transitionInterpolator: new FlyToInterpolator(),
                transitionDuration: 1500
            }, 
            marker:{...state.marker, latitude:action.latitude, longitude: action.longitude}};
        case ON_VIEWPORT_CHANGE:
            return {...state, viewport:action.payload };
        default:
            return state;
    }
};