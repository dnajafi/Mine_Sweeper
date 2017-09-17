import React, { Component } from 'react';
import { connect } from 'react-redux';
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
        {
          this.props.isWinner ?
            <p>WINNER WINNER CHICKEN DINNER!</p>
          :
            null
        }
        <p>PLEASE NOTE: Hold down SHIFT when clicking in order to mark a square with a flag.</p>
      </div>
    );
  }
}


const mapStateToProps = (state) => ({ isWinner: state.game.isWinner });

export default connect(
  mapStateToProps
)(App);


