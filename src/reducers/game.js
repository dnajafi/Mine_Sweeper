
const findNumMines = function(row, col, board) {
	let countMines = 0;

	if(row > 0 && col > 0 && board[row-1][col-1] === 'x') {
		countMines++;
	}

	if(row > 0 && board[row-1][col] === 'x') {
		countMines++;
	}

	if(row > 0 && col < (board.length - 2) && board[row-1][col+1] === 'x') {
		countMines++;
	}

	if(col < (board.length - 2) && board[row][col+1] === 'x') {
		countMines++;
	}

	if(row < (board.length - 2) && col < (board.length - 2) && board[row+1][col+1] === 'x') {
		countMines++;
	}

	if(row < (board.length - 2) && board[row+1][col] === 'x') {
		countMines++;
	}

	if(row < (board.length - 2) && col > 0 && board[row+1][col-1] === 'x') {
		countMines++;
	}

	if(col > 0 && board[row][col-1] === 'x') {
		countMines++;
	}

	return countMines;
};

const buildBoard = function(board) {

	let numMines = 10;

	while(numMines > 0) {

		// let randomSquare = Math.floor(Math.random() * 99); // random number between 0 and 99
		let randomSquare = Math.floor(Math.random() * (100 - 0)) + 0; //The maximum is exclusive and the minimum is inclusive

		if(randomSquare < 10) {
			// the number is in the first row
			if(board[0][randomSquare] !== 'x') {
				board[0][randomSquare] = 'x';
				numMines--;
			} else {
				continue;
			}
		} else {
			// the number is not in the first row; need to extract row and col number
			let col = randomSquare % 10;
			let row = Math.floor(randomSquare / 10);

			if(board[row][col] !== 'x') {
				board[row][col] = 'x';
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
					board[i][j] = numMines.toString();
				}
			} 
		}
	}
	return board;
};



const initState = {
	boardCreated: false,
	board: new Array(10).fill().map(() => new Array(10).fill(''))
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
			let board = buildBoard(state.board)
			return { ...state, board: board, boardCreated: true }

		default:
			return state;
	}

};












