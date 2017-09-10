const initState = {
	startGame: false,
	board: new Array(10).fill().map(() => new Array(10).fill(''))
};


export default (state = initState, action) => {

	switch(action.type) {

		default:
			return state;
	}

};