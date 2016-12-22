import axios from 'axios';

export const FETCH_ALL_EVENTS = 'FETCH_ALL_EVENTS';
export const FILTER_EVENTS = 'FILTER_EVENTS';

export function fetchAllEvents(){

	const url = '/api/v1/event';
	const request = axios.get(url);
	
	return {
		type: FETCH_ALL_EVENTS,
		payload: request
	}
}

export function filterEvents(filteredEvents){
	return {
		type: FILTER_EVENTS,
		payload: filteredEvents
	}
}