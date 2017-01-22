import axios from 'axios';

export const FETCH_USER = 'FETCH_USER';
export const FETCH_SCOREBOARD = 'FETCH_SCOREBOARD';

export const CHANGE_DIALOG = 'CHANGE_DIALOG';
export const SELECT_SLIDE = 'SELECT_SLIDE';
export const SELECT_SESSION = 'SELECT_SESSION';

export const FETCH_SESSIONS = 'FETCH_SESSIONS';
export const ATTEND_SESSION = 'ATTEND_SESSION';
export const RESET_ATTEND = 'RESET_ATTEND';

export const FETCH_TEAM = 'FETCH_TEAM';
export const CREATE_TEAM = 'CREATE_TEAM';
export const JOIN_TEAM = 'JOIN_TEAM';
export const LEAVE_TEAM = 'LEAVE_TEAM';
export const RESET_TEAM_ERROR = 'RESET_TEAM_ERROR';

export const GET_TEAM_RANK = 'GET_TEAM_RANK';

export function fetchUser(url){

	const request = axios.get(url);

	return{
		type: FETCH_USER,
		payload: request
	}

}

export function triggerSessionAction(action, prop){

	switch(action){
		case 'fetch':
			return{
				type: FETCH_SESSIONS,
				payload: axios.get('/hackschool/sessions')
			}
		case 'attend':
			return{
				type: ATTEND_SESSION,
				payload: axios.post('/hackschool/sessions/attend',{
					session: {
						secret: prop
					}
				})
			}
		case 'reset-attend':
			return{
				type: RESET_ATTEND,
				payload: null
			}
		default:
			console.error(action);
			return{
				type: 'error',
				payload: null
			}
	}

}

export function fetchScoreboard(url){

	const request = axios.get(url);

	return{
		type: FETCH_SCOREBOARD,
		payload: request
	}
}

//change is an object
export function changeDialog(change){
	return{
		type: CHANGE_DIALOG,
		payload: change
	}
}

//slide is a string
export function selectSlide(slide){
	return{
		type: SELECT_SLIDE,
		payload: slide
	}
}

//session is a session/project obj
export function selectSession(session){
	return{
		type: SELECT_SESSION,
		payload: session
	}
}

export function triggerTeamAction(action, prop){

	const url = action != 'fetch' ? `/hackschool/team/${action}` : '/hackschool/team';

	switch(action){
		case 'fetch':
			return{
				type: FETCH_TEAM,
				payload: axios.get(url)
			}
		case 'create':
			return{
				type: CREATE_TEAM,
				payload: axios.post(url, {
							team: {
								name: prop
							}
						})
			}
		case 'join':
			return{
				type: JOIN_TEAM,
				payload: axios.post(url, {
							team:{
								id: prop
							}
						})
			}
		case 'leave':
			//if prop is null (incorrect name match),
			//simulate server response error
			const payload = prop ? axios.get(url) : {data: {error: 'wrong team name submitted'}};
			return{
				type: LEAVE_TEAM,
				payload
			}
		//this is needed if team.error is not null due to previously caused error,
		//and error is displayed (incorrectly) when correct input is submitted, and
		//should instead see loading render
		case 'reset-error':
			return{
				type: RESET_TEAM_ERROR,
				payload: null
			}
		default:
			console.error(action);
			return{
				type: 'error',
				payload: null
			}
	}

}


export function getTeamRank(scoreboard, teamID){

	const match = scoreboard.find(team => team.id === teamID);
	return{
		type: GET_TEAM_RANK,
		payload: typeof match !== undefined 
					? match.rank
					: 'n/a'
	}

}
