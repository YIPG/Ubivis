import firebase from 'firebase';
import {
    SEX_CHANGED,
    AGE_CHANGED,
    REGION_CHANGED,
    PROFILE_FINISH,
    PROFILE_FINISH_SUCCESS,
    PROFILE_FINISH_FAIL,
    NAME_CHANGED,
    PROFILE_CHANGED,
    SNACK_CHANGED,
    PROFILEIMAGE_CHANGED,
    PROFILE_GET,
    PROFILE_GET_FAIL,
    PROFILE_GET_SUCCESS,
    IMAGE_UPLOAD_START,
    IMAGE_UPLOAD_FINISH,
} from './types';

export const sexChanged = (sex) => {
    return {
        type: SEX_CHANGED,
        payload: sex
    };
};

export const ageChanged = (age) => {
    return {
        type: AGE_CHANGED,
        payload: age
    };
};

export const regionChanged = (text) => {
    console.log(text)
    return {
        type: REGION_CHANGED,
        payload: text
    };
};

export const nameChanged = (text) => {
    return {
        type: NAME_CHANGED,
        payload: text
    };
};

export const profileChanged = (text) => {
    return {
        type: PROFILE_CHANGED,
        payload: text
    };
};

export const profileImageChanged = (image) => {
    return {
        type: PROFILEIMAGE_CHANGED,
        payload: image
    };
};

export const snackChanged = (text) => {
    return {
        type: SNACK_CHANGED,
        payload: text
    };
};

// Cloud Storage保存

const imageUploaded = (dispatch, file) => {
    if(file===null){
        console.log("挙げられなかった")
        dispatch({ type: IMAGE_UPLOAD_FINISH });
    } else {
        dispatch({ type: IMAGE_UPLOAD_START});
        const { currentUser } = firebase.auth();
        const storageRef = firebase.storage().ref();
        const userRef = storageRef.child(`${currentUser.uid}`);
        const imageRef = userRef.child('images');
        const profImageRef = imageRef.child(`${file.name}`);
        const uploadTask = profImageRef.put(file)

        console.log("あげようとしてうる")

        uploadTask
        .on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
        function(snapshot) {
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
            switch (snapshot.state) {
                case firebase.storage.TaskState.PAUSED: // or 'paused'
                    console.log('Upload is paused');
                    break;
                case firebase.storage.TaskState.RUNNING: // or 'running'
                    console.log('Upload is running');
                    break;

                // no default
            }
        }, function(error) {

        // A full list of error codes is available at
        // https://firebase.google.com/docs/storage/web/handle-errors
        switch (error.code) {
            case 'storage/unauthorized':
            // User doesn't have permission to access the object
            break;

            case 'storage/canceled':
            // User canceled the upload
            break;


            case 'storage/unknown':
            // Unknown error occurred, inspect error.serverResponse
            break;

            // no default
        }
        }, function() {
        // Upload completed successfully, now we can get the download URL
        uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
            firebase.firestore().collection('users').doc(currentUser.uid).set({
                    profileImageURL: downloadURL
                }, { merge: true})
            .then(() => console.log("プロフィールイメージのURLを格納しました"))
            console.log('File available at', downloadURL);
            dispatch({ type: IMAGE_UPLOAD_FINISH });
        });
        });

                
                
    }            
}

export const profileFinish = ({ male, age, region, name, profile, profileImage }) => {
    const { currentUser } = firebase.auth();

    return(dispatch) => {
        const db = firebase.firestore();
        dispatch({ type: PROFILE_FINISH });

        console.log(male, age, region, name, profile, profileImage);

        imageUploaded(dispatch, profileImage);

        console.log("画像を上げた")

        db.settings({
            timestampsInSnapshots: true
        })
        
        db.collection('users').doc(currentUser.uid).set({
            male: male,
            age: age,
            region: region,
            name: name,
            profile: profile
        }, {merge: true})
        .then(() => {
            console.log("データ格納成功");
            profileFinishSuccess(dispatch)
        })
        .catch(error => {
            console.log(`エラーが発生しました${error}`);
            profileFinishFail(dispatch);
        })
        ;
    }
}

const profileFinishSuccess = dispatch => {
    dispatch({
        type:PROFILE_FINISH_SUCCESS
    })
}

const profileFinishFail = dispatch => {
    dispatch({
        type: PROFILE_FINISH_FAIL
    })
}

export const profileGet = (uid) => {
    return(dispatch) => {
        dispatch({
            type:PROFILE_GET
        });

        firebase.firestore().collection('users').doc(uid).get()
            .then(doc => {
                if(doc.exists){
                    profileGetSuccess(dispatch, doc.data())
                } else {
                    console.log('ドキュメントが空です')
                    profileGetFail(dispatch);
                }
            })
            .catch(error => {
                console.log(`取得中にエラーが発生しました。内容は
                ${error}
                です。`);
                profileGetFail(dispatch);
            })
    }
}

export const profileGetSuccess = (dispatch, data) => {
    dispatch({
        type: PROFILE_GET_SUCCESS,
        payload: data
    })
}

export const profileGetFail = dispatch => {
    dispatch({
        type:PROFILE_GET_FAIL
    })
}