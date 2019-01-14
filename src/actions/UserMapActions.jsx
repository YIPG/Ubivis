import firebase from 'firebase';
// types
import {
    LOCATE_USER,
    ON_VIEWPORT_CHANGE,
} from './types';
import geohash from 'ngeohash';

export const locate_user = () => {
    const getPosition = function (options) {
        return new Promise(function (resolve, reject) {
          navigator.geolocation.getCurrentPosition(resolve, reject, options);
        });
    }

    const db = firebase.firestore();
    
    return(dispatch) => {
        getPosition()
            .then((position) => {
                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;
                // Firebase
                firebase.auth().onAuthStateChanged(user =>{
                    if(user){
                        db.collection("locations").add({
                            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                            uid: user.uid,
                            geohash: geohash.encode(latitude, longitude),
                            geopoint: new firebase.firestore.GeoPoint(latitude, longitude)
                        });
                    }
                })

                // Redux
                dispatch({ 
                    type: LOCATE_USER,
                    longitude: longitude,
                    latitude: latitude
                })
            })
            .catch((err) => {
                console.error(err.message)
            });
    }
};

export const on_viewport_change = ({viewport}) => {
    return {
        type: ON_VIEWPORT_CHANGE,
        payload: viewport
    }
}