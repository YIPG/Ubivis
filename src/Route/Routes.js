import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import LoginForm from '../container/LoginForm';
import Home from '../container/Home';
import WelcomeScreen from '../container/WelcomeScreen';
import UserMap from '../container/UserMap';
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
                    <Route exact path='/' component={Home} />
                    <Route path='/login' component={LoginForm} />
                    <PrivateRoute path='/welcome' component={WelcomeScreen} />
                    <Route path='/map' component={UserMap} />
                    {/* <Route path='/workermap' component={WorkerMap} />
                    <Route path='/profile' component={MyPage} />
                    <Route path='/choice' component={Choice} /> */}
                </Switch>
            </div>
        </Router>
    )}

export default Routes;