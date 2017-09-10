import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import gameReducer from './reducers/game';

const reducer = combineReducers({
	game: gameReducer
});

export default createStore(
	reducer,
	composeWithDevTools(applyMiddleware(thunk))
);