import { FETCH_TEAM_RANK } from '../actions';

export default (state = null, action) => {

	switch(action.type){
		case FETCH_TEAM_RANK:
			return action.payload;
		default: 
			return state;
	}

}