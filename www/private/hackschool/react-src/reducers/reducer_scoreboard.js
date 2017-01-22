import { FETCH_SCOREBOARD } from '../actions';

export default (state = null, action) => {

	switch(action.type){
		case FETCH_SCOREBOARD:
			return {
				featured: [...action.payload.data.scoreboard.slice(0,3)],
				list: [...action.payload.data.scoreboard.slice(3)]
			};
		default:
			return state;
	}
}