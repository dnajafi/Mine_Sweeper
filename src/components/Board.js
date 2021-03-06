import React, { Component } from 'react';
import { connect } from 'react-redux';
import { timeToStartGame, clickOnSquare } from '../reducers/game';
import smiley from '../smileyFace.png';
import sadFace from '../sadFace.jpeg';

const Square = (props) => {

	if(props.board) {
		if(props.isWinner) {
			return (
				<button className="winnerSquare" onClick={ (evt) => props.onClick(props.row, props.col, evt.shiftKey) }>
				</button>
			);
		}

		if(props.board[props.row][props.col].isFlag) {
			return (
				<button className="flagSquare" onClick={ (evt) => props.onClick(props.row, props.col, evt.shiftKey) }>
					⚐
				</button>
			);
		}

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

		if(this.props.isWinner) {
			const winnerFuction = function() {
				alert('Winner Winner Chicken Dinner!');
			};

			return (
				<Square row={row} col={col} onClick={winnerFuction} board={this.props.board} losingCoords={this.props.losingCoords} isWinner={this.props.isWinner} />
			);

		}

		if(this.props.gameOver) {
			const gameOverFunction = function() {
				alert('Game Over!');
			};

			return (
				<Square row={row} col={col} onClick={gameOverFunction} board={this.props.board} losingCoords={this.props.losingCoords} isWinner={this.props.isWinner} />
			);
		}

		return (
			<Square row={row} col={col} onClick={this.props.clickOnSquare} board={this.props.board} losingCoords={this.props.losingCoords} isWinner={this.props.isWinner} />
		);
	}

	renderRow(row) {
		let squares = [];
		for(var i=0; i<10; i++) {
			squares.push(<div key={i}>{this.renderSquare(row, i)}</div>);
		}
		return squares;
	}

	componentDidMount() {
		this.props.timeToStartGame();
	}

	render() {
		let rows = [];

		for(let i=0; i<10; i++) {
			rows.push(<div key={i}>{this.renderRow(i)}</div>);
		}

		return (

			<div className="board-container">
				{!this.props.gameOver ?
					<button style={{backgroundColor: "white"}} onClick={() => this.props.timeToStartGame()}><img className="smiley" src={smiley} alt="Smiley Face" /></button>
				:
					<button style={{backgroundColor: "white"}} onClick={() => this.props.timeToStartGame()}><img className="smiley" src={sadFace} alt="Sad Face" /></button>
				}
				<div className="board">
					{rows}
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => ({ board: state.game.board, gameOver: state.game.gameOver, losingCoords: state.game.losingCoords, isWinner: state.game.isWinner });
const mapDispatchToProps = { timeToStartGame, clickOnSquare };

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Board);


