import { FETCH_USER } from '../actions/index';

export default (state = {}, action) => {

	switch(action.type){
		case FETCH_USER:
			//might need to account for undefined later when fetching
			return action.payload.user;
		default:
			return state;
	}
}