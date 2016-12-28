import axios from 'axios';

export const FETCH_SCOREBOARD = 'FETCH_SCOREBOARD';

export function fetchAllTeams(url){

	//const request = axios.get(url);

	return{
		type: FETCH_SCOREBOARD,
		payload: []
	}
}