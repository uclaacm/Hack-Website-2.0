import { FETCH_SCOREBOARD } from '../actions/index';

export default (state = [], action) => {

	switch(action.type){
		case FETCH_SCOREBOARD:
			return action.payload;
		default:
			return state;
	}
}