/* eslint-disable */
require('dotenv').config()

import React, { Component } from 'react';
import {connect} from 'react-redux';
import firebase from 'firebase';
import firebaseConfig from '../../firebase/config';
import Routes from '../../Route/Routes';
import withRoot from '../../materialUI/withRoot';
import {
    is_logged,
    is_not_logged
} from '../../actions';


class App extends Component {
    constructor() {
        super();
        // firebaseの初期設定
        firebase.initializeApp(firebaseConfig);
        const firestore = firebase.firestore();
        const settings = {/* your settings... */ timestampsInSnapshots: true};
        firestore.settings(settings);

        // firebase認証のログイン確認
        firebase.auth().onAuthStateChanged(user => {
            if(user){
                this.props.is_logged(user)
            } else {
                this.props.is_not_logged()
            }
        })
    }

    render() {
        return(
            <Routes />
        );
    }
}

export default connect(null, {
    is_logged,
    is_not_logged
})(withRoot(App));