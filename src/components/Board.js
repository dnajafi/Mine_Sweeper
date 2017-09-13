import React, { Component } from 'react';
import { connect } from 'react-redux';
import { timeToStartGame, clickOnSquare } from '../reducers/game';
import smiley from '../smileyFace.png';
import sadFace from '../sadFace.jpeg';

const Square = (props) => {

	if(props.board) {

		if(props.losingCoords[0] === props.row && props.losingCoords[1] === props.col) {
			return (
				<button className="losingSquare" onClick={ (evt) => props.onClick(props.row, props.col, evt.shiftKey) }>
					{props.board[props.row][props.col].symbol}
				</button>
			);
		}


		if(props.board[props.row][props.col].hasBeenClicked) {
			return (
				<button className="clickedSquare" onClick={ (evt) => props.onClick(props.row, props.col, evt.shiftKey) }>
					{props.board[props.row][props.col].symbol}
				</button>
			);
		} else {
			return (
				<button className="square" onClick={ (evt) => props.onClick(props.row, props.col, evt.shiftKey) }></button>
			);
		}
	} else {
		return (
			<button className="square" onClick={ (evt) => props.onClick(props.row, props.col, evt.shiftKey) }></button>
		);
	}

};

class Board extends Component {

	renderSquare(row, col) {
		return (
			<Square row={row} col={col} onClick={this.props.clickOnSquare} board={this.props.board} losingCoords={this.props.losingCoords} />
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
				{!this.props.gameOver ?
					<button style={{backgroundColor: "white"}} onClick={() => this.props.timeToStartGame()}><img className="smiley" src={smiley} /></button>
				:
					<button style={{backgroundColor: "white"}} onClick={() => this.props.timeToStartGame()}><img className="smiley" src={sadFace} /></button>
				}
				
				<div className="board">
					{rows}
				</div>

			</div>
		);
	}
}

const mapStateToProps = (state) => ({ board: state.game.board, gameOver: state.game.gameOver, losingCoords: state.game.losingCoords });
const mapDispatchToProps = { timeToStartGame, clickOnSquare };

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Board);




