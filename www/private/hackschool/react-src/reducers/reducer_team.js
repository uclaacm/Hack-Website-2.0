import { CREATE_TEAM, JOIN_TEAM, LEAVE_TEAM } from '../actions/index';

export default (state = {}, action) => {

	switch(action.type){
		case CREATE_TEAM:
		case JOIN_TEAM:
			return action.payload.success ? action.payload.team : action.payload.error;
		case LEAVE_TEAM:
			if(action.payload.success)
				return null;

			//wrong user input value, need to update error
			let temp = {};

			for(let property in state){
				temp[property] = state[property];
			}
			temp.error = 'Wrong team name submitted.';
			return temp;
		default:
			return state;
	}
}