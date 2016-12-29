import { combineReducers } from 'redux';

import UserReducer from './reducer_user';
import ScoreboardReducer from './reducer_scoreboard';
import DialogReducer from './reducer_dialog';

const rootReducer = combineReducers({
	user: UserReducer,
	scoreboard: ScoreboardReducer,
	dialog: DialogReducer
});

export default rootReducer;
