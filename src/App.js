import React, { Component } from 'react';
import firebase from 'firebase';
import logo from './logo.svg';
import './App.css';
import firebaseConfig from './firebase/config';

class App extends Component {
  componentDidMount(){
    firebase.initializeApp(firebaseConfig);
    const db = firebase.firestore()
    
    db.collection("cities").where("population", ">", 100000).orderBy("population").limit(5)
    .get()
    .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
        });
    })
    .catch(function(error) {
        console.log("Error getting documents: ", error);
    });
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
}

export default App;
