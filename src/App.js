import React, { Component } from 'react';
import firebase from 'firebase';
import SimpleCard from './Card';
import './App.css';
import firebaseConfig from './firebase/config';

const styles = {
  card: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
};

class App extends Component {
  render() {
    return (
      <div>
        <input type="button" value="deploy test" />
      </div>
    );
  }
}

export default App;
