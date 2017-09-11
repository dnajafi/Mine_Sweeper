import React, { Component } from 'react';
import { connect } from 'react-redux';
import { timeToStartGame } from '../reducers/game';

const Square = (props) => {
	return (
		<button className="square" onClick={(evt) => console.log(evt.shiftKey)}></button>
	);
};

class Board extends Component {


	renderSquare(row, col) {
		return (
			<Square />
		);
	}

	renderRow(row) {
		let squares = [];
		for(var i=0; i<10; i++) {
			squares.push(<div key={i}>{this.renderSquare(row, i)}</div>);
		}
		return squares;
	}

	render() {

		let rows = [];

		for(let i=0; i<10; i++) {
			rows.push(<div key={i}>{this.renderRow(i)}</div>);
		}

		return (

			<div className="board-container">

				<div className="smiley">
					<p>Smiley Face</p>
				</div>

				<div className="board">
					{rows}
				</div>

				{!this.props.boardCreated ?
					<button onClick={() => this.props.timeToStartGame()}>Start Game</button>
				:
					null
				}

			</div>
		);
	}
}

const mapStateToProps = (state) => ({ board: state.game.board, boardCreated: state.game.boardCreated });
const mapDispatchToProps = { timeToStartGame };

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Board);




