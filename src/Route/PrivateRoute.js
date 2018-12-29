import React from 'react';
import {  Route, Redirect } from 'react-router-dom';
import firebase from 'firebase';

function PrivateRoute({ component: Component, ...rest }) {
  console.log(firebase.auth().currentUser);
  return (
    <Route
      {...rest}
      render={props => 
        // ここで認証状態を取得します。
        // firebaseだったらfirebase.auth.currentUser !== nullとかで同様になります。
        firebase.auth().currentUser !== null ? (
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

// const mapStateToProps = state => ({
//     user: state.auth.user
// })

export default PrivateRoute;