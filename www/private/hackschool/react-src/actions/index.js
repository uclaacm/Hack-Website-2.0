import axios from 'axios';

export const FETCH_USER = 'FETCH_USER';
export const FETCH_SESSIONS = 'FETCH_SESSIONS';
export const FETCH_SCOREBOARD = 'FETCH_SCOREBOARD';

export const CHANGE_DIALOG = 'CHANGE_DIALOG';
export const SELECT_SLIDE = 'SELECT_SLIDE';
export const SELECT_SESSION = 'SELECT_SESSION';

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

export function fetchSessions(url){

	const request2 = axios.get(url);
	const request = {
		data:{
			success: true,
			error: null,
			projects: [
				{
					id: 'r7truyd',
					number: 1,
					points: 10,
					name: 'Introduction to Android',
					desc: 'description uefhidjsh a da df fd df df a fd description uefhidjsh fdsja uedescription uefhidjsh a da df fd df df adescription uefhidjsh a da df fd df df a fd description uefhidjsh fdsja ue fd description uefhidjsh fdsja uefhidjsh fda dsa fdadescription uefhidjsh a da df fd df df a fd description uefhidjsh fdsja uefhidjsh fda dsa fda',
					image: '/common/images/Android_M.jpg',
					videoLink: 'http://youtube.com',
					slidesLink: 'http://google.com',
					blogPostLink: '',
					submissionLink: ''
				},
				{
					id: '7tfhgv',
					number: 2,
					points: 10,
					name: 'Second Lesson on Android Long Long Long Long',
					desc: 'description uefhidjsh a da df fd df df a fd description uefhidjsh fdsja uedescription uefhidjsh a da df fd df df adescription uefhidjsh a da df fd df df a fd description uefhidjsh fdsja ue fd description uefhidjsh fdsja uefhidjsh fda dsa fdadescription uefhidjsh a da df fd df df a fd description uefhidjsh fdsja uefhidjsh fda dsa fda',
					image: '/common/images/Android_M.jpg',
					videoLink: '',
					slidesLink: 'http://google.com',
					blogPostLink: 'http://medium.com',
					submissionLink: ''
				},
				{
					id: '32uyiwrfgdj',
					number: 3,
					points: 10,
					name: 'Project 3',
					desc: 'description eijskfd',
					image: '/common/images/Android_M.jpg',
					videoLink: 'http://youtube.com',
					slidesLink: '',
					blogPostLink: '',
					submissionLink: ''
				},
				{
					id: '38u7ryefd',
					number: 4,
					points: 10,
					name: 'Project 4',
					desc: 'description 32urwhj',
					image: '/common/images/Android_M.jpg',
					videoLink: 'http://youtube.com',
					slidesLink: '',
					blogPostLink: '',
					submissionLink: ''
				},
				{
					id: 'h4398fdf',
					number: 5,
					points: 10,
					name: 'Project 5',
					desc: 'description 34ru8eigfdyj',
					image: '/common/images/Android_M.jpg',
					videoLink: '',
					slidesLink: '',
					blogPostLink: '',
					submissionLink: ''
				}]
			}
	};

	return{
		type: FETCH_SESSIONS,
		payload: request
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

export function triggerTeamAction(endpoint, props){

	const url = endpoint != 'fetch' ? `/hackschool/team/${endpoint}` : '/hackschool/team';

	switch(endpoint){
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
								name: props
							}
						})
			}
		case 'join':
			return{
				type: JOIN_TEAM,
				payload: axios.post(url, {
							team:{
								id: props
							}
						})
			}
		case 'leave':
			//if props is null (incorrect name match),
			//simulate server response error
			const payload = props ? axios.get(url) : {data: {error: 'wrong team name submitted'}};
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
			console.error(endpoint);
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
					? scoreboard.indexOf(match) + 1
					: 'n/a'
	}

}
