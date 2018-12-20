export const firebaseConfig = ((nodeEnv, projectId) => {
    if(nodeEnv === "production" && projectId === "deploytest-5e1c6"){
        return {
        apiKey: "AIzaSyDWpR2QDHRpX7qprsjTeBafWJa4R3WEM-I",
        authDomain: "deploytest-5e1c6.firebaseapp.com",
        databaseURL: "https://deploytest-5e1c6.firebaseio.com",
        projectId: "deploytest-5e1c6",
        storageBucket: "deploytest-5e1c6.appspot.com",
        messagingSenderId: "624587715238"
        }
    } else {
        return {
        apiKey: "AIzaSyDgKUu-GBGczKxlC1KdcpGnze9DMrG7yhY",
        authDomain: "ubivis-development.firebaseapp.com",
        databaseURL: "https://ubivis-development.firebaseio.com",
        projectId: "ubivis-development",
        storageBucket: "ubivis-development.appspot.com",
        messagingSenderId: "163624672759"
        }
    }
}) (process.env.NODE_ENV, process.env.REACT_APP_PROJECT_ID)