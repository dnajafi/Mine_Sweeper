const findNumMinesAroundSquare = function(row, col, board) {
	let countMines = 0;

	if(row > 0 && col > 0 && board[row-1][col-1]['symbol'] === '✸') {
		countMines++;
	}

	if(row > 0 && board[row-1][col]['symbol'] === '✸') {
		countMines++;
	}

	if(row > 0 && col < (board.length - 2) && board[row-1][col+1]['symbol'] === '✸') {
		countMines++;
	}

	if(col < (board.length - 2) && board[row][col+1]['symbol'] === '✸') {
		countMines++;
	}

	if(row < (board.length - 2) && col < (board.length - 2) && board[row+1][col+1]['symbol'] === '✸') {
		countMines++;
	}

	if(row < (board.length - 2) && board[row+1][col]['symbol'] === '✸') {
		countMines++;
	}

	if(row < (board.length - 2) && col > 0 && board[row+1][col-1]['symbol'] === '✸') {
		countMines++;
	}

	if(col > 0 && board[row][col-1]['symbol'] === '✸') {
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
			if(board[0][randomSquare] !== '✸') {
				board[0][randomSquare].symbol = '✸';
				numMines--;
			} else {
				continue;
			}
		} else {
			// the number is not in the first row; need to extract row and col number
			let col = randomSquare % 10;
			let row = Math.floor(randomSquare / 10);

			if(board[row][col] !== '✸') {
				board[row][col].symbol = '✸';
				numMines--;
			} else {
				continue;
			}
		}
	}

	for(let i=0; i<board.length; i++) {
		for(let j=0; j<board[i].length; j++) {
			if(board[i][j] !== '✸') {
				let numMines = findNumMinesAroundSquare(i, j, board);

				if(numMines !== 0) {
					board[i][j].symbol = numMines.toString();
				}
			} 
		}
	}

	// console.log(board);
	return board;
};



const initState = {
	board: null,
	gameOver: false,
	losingCoords: [-1, -1],
	isWinner: false
};

const START_GAME = 'START_GAME';
const CLICK_SQUARE = 'CLICK_SQUARE';

const startGame = () => ({ type: START_GAME });
const clickSquare = (row, col, shiftFlag) => ({ type: CLICK_SQUARE, payload: {row: row, col: col, shiftFlag: shiftFlag} });

export const timeToStartGame = () => {
	return (dispatch) => {
		dispatch(startGame());
	};
};

export const clickOnSquare = (row, col, shiftFlag) => {
	return (dispatch) => {
		dispatch(clickSquare(row, col, shiftFlag));
	}
};

const augmentBoard = function(row, col, board, shiftFlag) {
	let currSquare = board[row][col];

	if(shiftFlag) {
		currSquare.isFlag = !currSquare.isFlag;
	}	else {

		if(currSquare.symbol === '✸') {
			return 'LOST';
		}

		if(!currSquare.hasBeenClicked) {
			currSquare.hasBeenClicked = true;

			let numSquaresToReveal = Math.floor(Math.random() * 4);
			let randomCountDown = 5; // just in case we can't decrement numSquaresToReveal down to 0

			while(numSquaresToReveal > 0 || randomCountDown !== 0) {
				if(row > 0  && !board[row-1][col].hasBeenClicked && board[row-1][col].symbol !== '✸') {
					board[row-1][col].hasBeenClicked = true;
					numSquaresToReveal--;
					continue;
				}
				if(row > 0 && col < board.length-2 && !board[row-1][col+1].hasBeenClicked && board[row-1][col+1].symbol !== '✸') {
					board[row-1][col+1].hasBeenClicked = true;
					numSquaresToReveal--;
					continue;
				}
				if(col < board.length-2 && !board[row][col+1].hasBeenClicked && board[row][col+1].symbol !== '✸') {
					board[row][col+1].hasBeenClicked = true;
					numSquaresToReveal--;
					continue;
				}
				if(row < board.length-2 && col < board.length-2 && !board[row+1][col+1].hasBeenClicked && board[row+1][col+1].symbol !== '✸') {
					board[row+1][col+1].hasBeenClicked = true;
					numSquaresToReveal--;
					continue;
				}
				if(row < board.length-2 && !board[row+1][col].hasBeenClicked && board[row+1][col].symbol !== '✸') {
					board[row+1][col].hasBeenClicked = true;
					numSquaresToReveal--;
					continue;
				}
				if(row < board.length-2 && col > 0 && !board[row+1][col-1].hasBeenClicked && board[row+1][col-1].symbol !== '✸') {
					board[row+1][col-1].hasBeenClicked = true;
					numSquaresToReveal--;
					continue;
				}
				if(col > 0 && !board[row][col-1].hasBeenClicked && board[row][col-1].symbol !== '✸') {
					board[row][col-1].hasBeenClicked = true;
					numSquaresToReveal--;
					continue;
				}
				randomCountDown--;
			}
		}
	}

	let newBoard = board.slice();

	newBoard[row][col] = currSquare;
	return newBoard;
};


const turnAllMines = function(board) {
	let newBoard = board.slice();

	for(let i=0; i<newBoard.length; i++) {
		for(let j=0; j<newBoard[i].length; j++) {
			if(newBoard[i][j].symbol === '✸') {
				newBoard[i][j].hasBeenClicked = true;
			}
		}
	}

	return newBoard;
}

const findTotalNumMines = function(board) {
	let numMines = 0;

	for(let i=0; i<board.length; i++) {
		for(let j=0; j<board[i].length; j++) {
			if(board[i][j].symbol === '✸') {
				numMines++;
			}
		}
	}

	return numMines;
}

const determineWinner = function(board) {
	let totalNumMines = findTotalNumMines(board);
	let countMineFlags = 0;

	for(let i=0; i<board.length; i++) {
		for(let j=0; j<board[i].length; j++) {
			let currSquare = board[i][j];

			if(currSquare.isFlag === true && currSquare.symbol === '*') {
				countMineFlags++;
			}
		}
	}

	if(countMineFlags === totalNumMines) {
		return true;
	}

	return false;
}

const makeWinnerBoard = function(board) {
	for(let i=0; i<board.length; i++) {
		for(let j=0; j<board[i].length; j++) {
			board[i][j].hasBeenClicked = true
		}
	}

	return board;
}


export default (state = initState, action) => {
	switch(action.type) {
		case START_GAME:
			let board = [];
			for(let i=0; i<10; i++) {
				let row = [];
				for(let j=0; j<10; j++) {
					row.push({'symbol':'','hasBeenClicked':false,'isFlag':false });
				}
				board.push(row);
			}

			board = buildBoard(board);
			return { ...state, board: board, gameOver: false, losingCoords: [-1, -1], isWinner: false }

		case CLICK_SQUARE:
			let result = augmentBoard(action.payload.row, action.payload.col, state.board, action.payload.shiftFlag);

			if(result === 'LOST') {
				// GAME OVER
				// TURN ALL SQUARES TRUE
				let losingBoard = turnAllMines(state.board);

				return { ...state, gameOver: true, board: losingBoard, losingCoords: [action.payload.row, action.payload.col] };
			} else {
				// result is equal to the new board

				let winner = determineWinner(result);

				if(winner) {
					// DID WIN
					let winnerBoard = makeWinnerBoard(result);

					return { ...state, board: winnerBoard, isWinner: true };
				} else {
					// didn't win yet
					return { ...state, board: result };
				}
			}
		default:
			return state;
	}
};
