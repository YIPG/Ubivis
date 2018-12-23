/* eslint-disable */
require('dotenv').config()

import React, { Component } from 'react';
import firebase from 'firebase';
import CssBaseline from '@material-ui/core/CssBaseline';
import firebaseConfig from '../../firebase/config';
import Routes from '../../Route/Routes';
import withRoot from '../../materialUI/withRoot';


class App extends Component {
    constructor() {
        super();
        // firebaseの初期設定
        firebase.initializeApp(firebaseConfig);
        const firestore = firebase.firestore();
        const settings = {/* your settings... */ timestampsInSnapshots: true};
        firestore.settings(settings);
    }

    render() {
        return(
            <Routes />
        );
    }
}

export default withRoot(App);