import React, { Component } from 'react';
import { connect } from 'react-redux';
import firebase from 'firebase';
import { Router, Route, Switch } from 'react-router-dom';
import LoginForm from '../container/LoginForm';
// import Home from './containers/Home';
// import WelcomeScreen from './containers/WelcomeScreen';
// import UserMap from './containers/UserMap';
// import WorkerMap from './containers/WorkersMap';
// import MyPage from './containers/Mypage';
// import Choice from './containers/Choice';
import Header from '../container/Header';
import history from './history';
import PrivateRoute from './PrivateRoute';

const Routes = () => {
    return (
        <Router history={history}>
            <div>
                <Header />
                <Switch>
                    {/* <Route exact path='/' component={Home} /> */}
                    <Route path='/' component={LoginForm} />
                    {/* <Route path='/welcome' component={WelcomeScreen} />
                    <PrivateRoute path='/map' component={UserMap} />
                    <Route path='/workermap' component={WorkerMap} />
                    <Route path='/profile' component={MyPage} />
                    <Route path='/choice' component={Choice} /> */}
                </Switch>
            </div>
        </Router>
    )}

export default Routes;