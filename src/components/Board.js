import React, { Component } from 'react';
import { connect } from 'react-redux';
import { timeToStartGame } from '../reducers/game';
import smiley from '../smileyFace.png';

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

		// console.log(this.props.board);

		let rows = [];

		for(let i=0; i<10; i++) {
			rows.push(<div key={i}>{this.renderRow(i)}</div>);
		}

		return (

			<div className="board-container">
				<button style={{backgroundColor: "white"}} onClick={() => this.props.timeToStartGame()}><img className="smiley" src={smiley} /></button>
				
				<div className="board">
					{rows}
				</div>

			</div>
		);
	}
}

const mapStateToProps = (state) => ({ board: state.game.board });
const mapDispatchToProps = { timeToStartGame };

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Board);




