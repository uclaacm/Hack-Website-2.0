import { combineReducers } from 'redux';

import UserReducer from './reducer_user';
import SessionsReducer from './reducer_sessions';
import SelectedSessionReducer from './reducer_selected_session';
import ScoreboardReducer from './reducer_scoreboard';
import SlideReducer from './reducer_slide';
import DialogReducer from './reducer_dialog';
import TeamReducer from './reducer_team';
import TeamRankReducer from './reducer_team_rank';

const rootReducer = combineReducers({
	user: UserReducer,
	sessions: SessionsReducer,
	selectedSession: SelectedSessionReducer,
	scoreboard: ScoreboardReducer,
	currentSlide: SlideReducer,
	dialog: DialogReducer,
	team: TeamReducer,
	teamRank: TeamRankReducer
});

export default rootReducer;
