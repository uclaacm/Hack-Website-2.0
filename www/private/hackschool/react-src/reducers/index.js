import { combineReducers } from 'redux';

import UserReducer from './reducer_user';
import ScoreboardReducer from './reducer_scoreboard';
import SlideReducer from './reducer_slide';
import DialogReducer from './reducer_dialog';
import TeamReducer from './reducer_team';
import TeamRankReducer from './reducer_team_rank';

const rootReducer = combineReducers({
	user: UserReducer,
	scoreboard: ScoreboardReducer,
	currentSlide: SlideReducer,
	dialog: DialogReducer,
	team: TeamReducer,
	teamRank: TeamRankReducer
});

export default rootReducer;
