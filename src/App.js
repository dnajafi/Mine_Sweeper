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
      </div>
    );
  }
}

export default App;
