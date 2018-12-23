import React from 'react';
import { connect } from 'react-redux';
import {  Route, Redirect } from 'react-router-dom';

function PrivateRoute({ user, component: Component, ...rest }) {
  console.log("プライベート", user);
  // const is_logged = props.auth.user !== null ? true : false;
  
  return (
    <Route
      {...rest}
      render={props => 
        
        // ここで認証状態を取得します。
        // firebaseだったらfirebase.auth.currentUser !== nullとかで同様になります。
          user!==null ? (
          // ログイン済みならば、PrivateRouteに渡されたcomponentを返します。
          <Component {...props} />
        ) : (
          // ログインしてなければログインページ(/login)に飛ばします。
          <Redirect
            to='/login'
          />
        )
      }
    />
  );
}

const mapStateToProps = state => ({
    user: state.auth.user
})

export default connect(mapStateToProps)(PrivateRoute);