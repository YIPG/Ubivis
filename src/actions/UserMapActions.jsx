import firebase from 'firebase';
// types
import {
    LOCATE_USER,
    ON_VIEWPORT_CHANGE,
    TRACK_USER_START
} from './types';

export const locate_user = () => {
    const getPosition = function (options) {
        return new Promise(function (resolve, reject) {
          navigator.geolocation.getCurrentPosition(resolve, reject, options);
        });
    }
    
    return(dispatch) => {
        getPosition()
            .then((position) => {
                dispatch({ 
                    type: LOCATE_USER,
                    longitude: position.coords.longitude,
                    latitude: position.coords.latitude
                })
            })
            .catch((err) => {
                console.error(err.message)
            });
    }
};

export const track_user_start = (position) => {
    const { currentUser } = firebase.auth();
    const db = firebase.firestore();
    const userRef = db.collection("users").doc(currentUser.uid)

    userRef.set({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
    }, { merge: true })
        .then(() => {
            console.log("位置情報の格納に成功した");
            userRef.get()
                .then(doc => {
                    console.log("data is", doc.data());
                    return({
                        type: TRACK_USER_START
                    })
                })
            
        })
        .catch(function(error) {
            console.error("Error writing document: ", error);
        });
    };

export const on_viewport_change = ({viewport}) => {
    return {
        type: ON_VIEWPORT_CHANGE,
        payload: viewport
    }
}