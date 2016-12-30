import axios from 'axios';

export const FETCH_USER = 'FETCH_USER';
export const FETCH_SCOREBOARD = 'FETCH_SCOREBOARD';
export const FETCH_TEAM_RANK = 'FETCH_TEAM_RANK';

export const CHANGE_DIALOG = 'CHANGE_DIALOG';
export const CREATE_TEAM = 'CREATE_TEAM';
export const JOIN_TEAM = 'JOIN_TEAM';
export const LEAVE_TEAM = 'LEAVE_TEAM';

export function fetchUser(url){

	//const request = axios.get(url);
	const request = {
		success: true,
		error: null,
		user: {
			id: 'ab-15-asdf',
			name: 'John Doe',
			profilePicture: ''
		}
	};

	return{
		type: FETCH_USER,
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
				id: 'some-id',
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
						id: 'some-id',
						name: 'Member 1',
						profilePicture: ''
					},
					{
						id: 'some-id',
						name: 'Member 2',
						profilePicture: ''
					},
					{
						id: 'some-id',
						name: 'Member 3',
						profilePicture: ''
					}
				]
			},//several more like this
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

export function changeDialog(change){

	return{
		type: CHANGE_DIALOG,
		payload: change
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
