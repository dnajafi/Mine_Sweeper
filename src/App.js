import React, { Component } from 'react';
import './App.css';
import Board from './components/Board';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <p>Mine Sweeper</p>
          <div className="builtBy">
            <p>By Blaise Najafi</p>
          </div>
        </div>
        <Board />
        <p>PLEASE NOTE: Hold down SHIFT when clicking in order to mark a square with a flag.</p>
      </div>
    );
  }
}

export default App;
