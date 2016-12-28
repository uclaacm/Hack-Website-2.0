import { combineReducers } from 'redux';

import ScoreboardReducer from './reducer_scoreboard';

const rootReducer = combineReducers({
	user: null,
	scoreboard: ScoreboardReducer
});

export default rootReducer;
