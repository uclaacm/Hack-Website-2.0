import axios from 'axios';

export const FETCH_ALL_EVENTS = 'FETCH_ALL_EVENTS';
export const FETCH_ALL_SHOWCASE = 'FETCH_ALL_SHOWCASE';

export const FILTER_DATA = 'FILTER_DATA';
export const SELECT_PROJECT = 'SELECT_PROJECT';

export function fetchAllEventsData(url){

	const request = axios.get(url);
	
	return {
		type: FETCH_ALL_EVENTS,
		payload: request
	}
}

export function fetchAllShowcaseData(url){

	const request = axios.get(url);

	return {
		type: FETCH_ALL_SHOWCASE,
		payload: request
	}
}

export function filterData(filteredData){
	return {
		type: FILTER_DATA,
		payload: filteredData
	}
}

export function selectProject(proj){
	return {
		type: SELECT_PROJECT,
		payload: proj
	}
}