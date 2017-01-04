import { FETCH_TEAM, CREATE_TEAM, JOIN_TEAM, LEAVE_TEAM, CHANGE_DIALOG, RESET_TEAM_ERROR } from '../actions/index';
import { changeDialog } from '../actions/index';

export default (state = {team: null, error: null}, action) => {
	switch(action.type){
		case FETCH_TEAM:
		case CREATE_TEAM:
		case JOIN_TEAM:
			console.log('my team: ', action.payload.data.team)
			return action.payload.data.success 
					? {team: action.payload.data.team, error: null}
					: {team: null, error: action.payload.data.error}		
		case LEAVE_TEAM:
			if(action.payload.data.success)
				return {team: null, error: null};

			//wrong team name submitted, so null payload reaches here
			return {								
				team: state.team, 					//unchanged
				error: action.payload.data.error 	//updated
			}		
		case RESET_TEAM_ERROR:
			return{
				team: state.team,
				error: null
			}
		default:
			return state;
	}
}
