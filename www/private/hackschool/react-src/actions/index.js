import axios from 'axios';

export const FETCH_SCOREBOARD = 'FETCH_SCOREBOARD';

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
