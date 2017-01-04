import { FETCH_TEAM, CREATE_TEAM, JOIN_TEAM, LEAVE_TEAM, RESET_TEAM_ERROR } from '../actions/index';

export default (state = {team: null, error: null, done: false}, action) => {
	switch(action.type){
		case FETCH_TEAM:
			/*if(action.payload.data.team == null){ //if not joined team, trigger onboarding
				changeDialog({onBoarding: true});
				console.log('set onboarding true')
			}*/
		case CREATE_TEAM:
		case JOIN_TEAM:
			console.log('my team: ', action.payload.data.team)
			return action.payload.data.success 
					? {team: action.payload.data.team, error: null, done: true}
					: {team: null, error: action.payload.data.error, done: true}		
		case LEAVE_TEAM:
			if(action.payload.data.success)
				return {team: null, error: null, done: true};

			//wrong team name submitted, so null payload reaches here
			return {								
				team: state.team, 					//unchanged
				error: action.payload.data.error, 	//updated
				done: true
			}		
		case RESET_TEAM_ERROR:
			return{
				team: state.team,
				error: null,
				done: true
			}
		default:
			return state;
	}
}
