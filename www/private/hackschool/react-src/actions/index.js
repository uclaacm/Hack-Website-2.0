import axios from 'axios';

export const FETCH_USER = 'FETCH_USER';
export const FETCH_SESSIONS = 'FETCH_SESSIONS';
export const FETCH_SCOREBOARD = 'FETCH_SCOREBOARD';
export const FETCH_TEAM_RANK = 'FETCH_TEAM_RANK';

export const CHANGE_DIALOG = 'CHANGE_DIALOG';
export const SELECT_SLIDE = 'SELECT_SLIDE';
export const SELECT_SESSION = 'SELECT_SESSION';

export const CREATE_TEAM = 'CREATE_TEAM';
export const JOIN_TEAM = 'JOIN_TEAM';
export const LEAVE_TEAM = 'LEAVE_TEAM';

export function fetchUser(url){

	//const request2 = axios.get(url);
	//console.log(request2);
	const request = {
		success: true,
		error: null,
		user: {
			id: 'ab-15-asdf',
			name: 'Dmitri Brereton',
			profilePicture: ''
		}
	};

	return{
		type: FETCH_USER,
		payload: request
	}

}

export function fetchSessions(url){

	//const request = axios.get(url);
	const request = {
		success: true,
		error: null,
		projects: [
			{
				id: 'r7truyd',
				number: 1,
				points: 10,
				name: 'Project 1',
				desc: 'description uefhidjsh',
				image: '/common/images/Android_M.jpg',
				videoLink: '',
				slidesLink: '',
				blogPostLink: '',
				submissionLink: ''
			},
			{
				id: '7tfhgv',
				number: 2,
				points: 10,
				name: 'Project 2',
				desc: 'description eiuwihsdfjxcn',
				image: '/common/images/Android_M.jpg',
				videoLink: '',
				slidesLink: '',
				blogPostLink: '',
				submissionLink: ''
			},
			{
				id: '32uyiwrfgdj',
				number: 3,
				points: 10,
				name: 'Project 3',
				desc: 'description eijskfd',
				image: '/common/images/Android_M.jpg',
				videoLink: '',
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
				videoLink: '',
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
	};

	return{
		type: FETCH_SESSIONS,
		payload: request
	}


}

export function fetchScoreboard(url){

	//const request = axios.get(url);

	//simulate server response
	const request = {
		success: true,
		error: null,
		scoreboard: [
			{
				id: '987656',
				name: 'Team #1',
				totalScore: 30,
				scores: [
					{
						projectNumber: 1,
						score: 10
					},
					{
						projectNumber: 2,
						score: 10
					},
					{
						projectNumber: 3,
						score: 10
					},

				],
				members: [
					{
						id: '8uhk',
						name: 'Member 1',
						profilePicture: ''
					},
					{
						id: '98yugjhb',
						name: 'Member 2',
						profilePicture: ''
					},
					{
						id: '213werfdg',
						name: 'Member 3',
						profilePicture: ''
					}
				]
			},
			{
				id: '1234564',
				name: 'Team #2',
				totalScore: 24,
				scores: [
					{
						projectNumber: 1,
						score: 9
					},
					{
						projectNumber: 2,
						score: 8
					},
					{
						projectNumber: 3,
						score: 7
					},

				],
				members: [
					{
						id: 'vghu98',
						name: 'Member 1',
						profilePicture: ''
					},
					{
						id: 'gf45656',
						name: 'Member 2',
						profilePicture: ''
					},
					{
						id: '87yutf5',
						name: 'Member 3',
						profilePicture: ''
					}
				]
			},
			{
				id: '65rdfgjbb8o9i9',
				name: 'Team #3',
				totalScore: 18,
				scores: [
					{
						projectNumber: 1,
						score: 6
					},
					{
						projectNumber: 2,
						score: 7
					},
					{
						projectNumber: 3,
						score: 5
					},

				],
				members: [
					{
						id: '23yfdgyuvhcj',
						name: 'Member 1',
						profilePicture: ''
					},
					{
						id: '97rwe234r',
						name: 'Member 2',
						profilePicture: ''
					},
					{
						id: '3284y7rwe',
						name: 'Member 3',
						profilePicture: ''
					}
				]
			},
			{
				id: 'some-id',
				name: 'Team #4',
				totalScore: 12,
				scores: [
					{
						projectNumber: 1,
						score: 4
					},
					{
						projectNumber: 2,
						score: 4
					},
					{
						projectNumber: 3,
						score: 4
					},

				],
				members: [
					{
						id: '21343wetdf',
						name: 'Member 1',
						profilePicture: ''
					},
					{
						id: 'ny7b632d',
						name: 'Member 2',
						profilePicture: ''
					},
					{
						id: '349nv984',
						name: 'Member 3',
						profilePicture: ''
					}
				]
			}
		]
	}

	return{
		type: FETCH_SCOREBOARD,
		payload: request
	}
}

export function fetchTeamRank(){

	//stuffs with parameters
	//might need to call this function within reducer_scoreboard.js
	//would need to know 1) ordered scoreboard, 2) this user's team
	//need to do this after fetchScoreboard and fetchTeam are successful

	return{
		type: FETCH_TEAM_RANK,
		payload: null
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

export function createTeam(teamName){

	const url = '/hackschool/team/create';
	const request = {
		success: true,
  		error: null,
  		team: {
  			id: '123-456-789',
  			name: teamName,
  			totalScore: 0,
  			scores: [],
			members: [
				{
					id: '1234',
					name: 'Member 1',
					profilePicture: ''
				}
			]
  		}
	};

	/*const request = axios.post(url, {
						  	{team: {name: teamName}}
						});*/

	return{
		type: CREATE_TEAM,
		payload: request
	}

}

export function joinTeam(teamID){

	const url = '/hackschool/team/join';
	const request = {
		success: true,
  		error: null,
  		team: {
  			id: teamID,
  			name: 'fetched team name',
  			totalScore: 0,
  			scores: [],
			members: [
				{
					id: '1234',
					name: 'Member 1',
					profilePicture: ''
				}
			]
  		}
	}

	/*const request = axios.post(url, {
						  	{team: {id: teamID}}
						});*/

	return{
		type: JOIN_TEAM,
		payload: request
	}

}

export function leaveTeam(teamInput){

	const url = '/hackschool/team/leave';
	let request;

	if(teamInput)
		request = {
			success: true,
			error: null,
			team: null
		};
	else
		request = {
			success: false,
			error: 'Incorrect team name'
		};

	return {
		type: LEAVE_TEAM,
		payload: request
	}

}
