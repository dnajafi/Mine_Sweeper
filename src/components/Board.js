import React, { Component } from 'react';
import { connect } from 'react-redux';

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

			</div>
		);
	}
}

export default connect()(Board);




