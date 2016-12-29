import { CREATE_TEAM } from '../actions/index';

export default (state = {}, action) => {

	switch(action.type){
		case CREATE_TEAM:
			return action.payload.success ? action.payload.team : action.payload.error;
		default:
			return state;
	}
}