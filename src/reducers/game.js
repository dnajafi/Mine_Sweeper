const findNumMines = function(row, col, board) {
	let countMines = 0;

	if(row > 0 && col > 0 && board[row-1][col-1]['symbol'] === 'x') {
		countMines++;
	}

	if(row > 0 && board[row-1][col]['symbol'] === 'x') {
		countMines++;
	}

	if(row > 0 && col < (board.length - 2) && board[row-1][col+1]['symbol'] === 'x') {
		countMines++;
	}

	if(col < (board.length - 2) && board[row][col+1]['symbol'] === 'x') {
		countMines++;
	}

	if(row < (board.length - 2) && col < (board.length - 2) && board[row+1][col+1]['symbol'] === 'x') {
		countMines++;
	}

	if(row < (board.length - 2) && board[row+1][col]['symbol'] === 'x') {
		countMines++;
	}

	if(row < (board.length - 2) && col > 0 && board[row+1][col-1]['symbol'] === 'x') {
		countMines++;
	}

	if(col > 0 && board[row][col-1]['symbol'] === 'x') {
		countMines++;
	}

	return countMines;
};

const buildBoard = function(board) {

	let numMines = 10;

	while(numMines > 0) {
		let randomSquare = Math.floor(Math.random() * (100 - 0)) + 0; //The maximum is exclusive and the minimum is inclusive; between 0 and 99

		if(randomSquare < 10) {
			// the number is in the first row
			if(board[0][randomSquare] !== 'x') {
				console.log('*****');
				console.log(board[0][randomSquare]);
				board[0][randomSquare].symbol = 'x';
				console.log(board[0][randomSquare]);
				console.log('*****');
				// board[0][randomSquare]['hasBeenClicked'] = false;
				// board[0][randomSquare]['isFlag'] = false;
				numMines--;
			} else {
				continue;
			}
		} else {
			// the number is not in the first row; need to extract row and col number
			let col = randomSquare % 10;
			let row = Math.floor(randomSquare / 10);

			if(board[row][col] !== 'x') {
				console.log(board[row][col].symbol);
				board[row][col].symbol = 'x';
				// board[row][col]['hasBeenClicked'] = false;
				// board[row][col]['isFlag'] = false;
				numMines--;
			} else {
				continue;
			}
		}
	}

	for(let i=0; i<board.length; i++) {
		for(let j=0; j<board[i].length; j++) {
			if(board[i][j] !== 'x') {
				let numMines = findNumMines(i, j, board);

				if(numMines !== 0) {
					board[i][j].symbol = numMines.toString();
					// board[i][j]['hasBeenClicked'] = false;
					// board[i][j]['isFlag'] = false;
				}
			} 
		}
	}


	// each square should be an object:
	/*
		{
			symbol: '' // number, mine, empty string,
			hasBeenClicked: false // boolean of whether it has been clicked
			isFlag: false // boolean of whether there is flag on it
		}
	*/
	// let finalBoard = new Array(10).fill().map(() => new Array(10).fill(new Object));

	// for(let i=0; i<board.length; i++) {
	// 	for(let j=0; j<board[i].length; j++) {
	// 		// console.log(board[i][j]);
	// 		// finalBoard[i][j]['symbol'] = board[i][j];
	// 		console.log('********');
	// 		console.log(board[i][j]);
	// 		console.log('********');
	// 		finalBoard[i][j]['symbol'] = '';
	// 		finalBoard[i][j]['symbol'] = board[i][j];
	// 		finalBoard[i][j]['hasBeenClicked'] = false;
	// 		finalBoard[i][j]['isFlag'] = false;
	// 	}
	// }


	console.log(board);

	return board;
};



const initState = {
	board: null
};

const START_GAME = 'START_GAME';

const startGame = () => ({ type: START_GAME });

export const timeToStartGame = () => {
	return (dispatch) => {
		dispatch(startGame());
	};
};




export default (state = initState, action) => {

	switch(action.type) {
		case START_GAME:
			// let board = buildBoard(new Array(10).fill().map(() => new Array(10).fill({
			// 	'symbol': '',
			// 	'hasBeenClicked' : false,
			// 	'isFlag': false
			// })))

			let board = buildBoard(new Array(10).fill().map(() => [{'symbol':'','hasBeenClicked':false,'isFlag':false }, {'symbol':'','hasBeenClicked':false,'isFlag':false }, {'symbol':'','hasBeenClicked':false,'isFlag':false }, {'symbol':'','hasBeenClicked':false,'isFlag':false }, {'symbol':'','hasBeenClicked':false,'isFlag':false }, {'symbol':'','hasBeenClicked':false,'isFlag':false }, {'symbol':'','hasBeenClicked':false,'isFlag':false }, {'symbol':'','hasBeenClicked':false,'isFlag':false }, {'symbol':'','hasBeenClicked':false,'isFlag':false }, {'symbol':'','hasBeenClicked':false,'isFlag':false }]))

			return { ...state, board: board }

		default:
			return state;
	}

};












