import { FETCH_TEAM, CREATE_TEAM, JOIN_TEAM, LEAVE_TEAM, GET_TEAM_RANK, RESET_TEAM_ERROR } from '../actions';

export default (state = {team: null, rank: 'n/a', error: null, done: false}, action) => {
	switch(action.type){
		case FETCH_TEAM:
		case CREATE_TEAM:
		case JOIN_TEAM:
			console.log('my team', action.payload.data.team)
			return action.payload.data.success 
					? {
						team: action.payload.data.team,
						rank: state.rank,
						error: null,
						done: true
					  }
					: {
						team: null,
						rank: state.rank,
						error: action.payload.data.error,
						done: true
					}		
		case LEAVE_TEAM:
			if(action.payload.data.success){
				console.log('my team', null);
				return {
					team: null,
					rank: 'n/a',
					error: null,
					done: true
				};
			}

			//wrong team name submitted, so null payload reaches here
			console.log('my team', 'unchanged: ' + action.payload.data.error)
			return {								
				team: state.team, 					//unchanged
				rank: state.rank,					//unchanged
				error: action.payload.data.error, 	//updated
				done: true
			}
		case GET_TEAM_RANK:
			return{
				team: state.team,
				rank: action.payload,	//update made here
				error: state.error,
				done: state.done,
			}
		case RESET_TEAM_ERROR:
			return{
				team: state.team,
				rank: state.rank,
				error: null,
				done: true
			}
		default:
			return state;
	}
}
