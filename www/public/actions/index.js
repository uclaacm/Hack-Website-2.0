import axios from 'axios';

export const FETCH_ALL_EVENTS = 'FETCH_ALL_EVENTS';
export const FILTER_EVENTS = 'FILTER_EVENTS';
export const FETCH_CAT_EVENTS = 'FETCH_CAT_EVENTS';

export function fetchAllEvents(){

	const url = '/api/v1/event';
	//const request = axios.get(url);
	//dummy data for now
	const request = {
		  "success": true,
		  "events": [
		    {
		      "id": "307e6d30-c556-11e6-9cb8-bb15b01c6e55",
		      "date": {
		        "start": "2016-12-18T19:10:33.251Z",
		        "end": "2016-12-18T19:12:07.770Z"
		      },
		      "desc": "Learn Android in 7 weeks",
		      "title": "Hack School Session 1",
		      "location": "PAB 1425",
		      "category": "Hack School",
		      "tagline": "From Zero to Hero"
		    },
		    {
		      "id": "07f6cbe0-c557-11e6-9329-11eadec086cd",
		      "date": {
		        "start": "2016-12-18T19:10:33.251Z",
		        "end": "2016-12-18T19:12:07.770Z"
		      },
		      "desc": "Learn Android in 7 weeks: Part 2!",
		      "title": "Hack School Session 2",
		      "location": "PAB 1425",
		      "category": "Hack School",
		      "tagline": "From Zero to Hero"
		    }
		  ]
		}

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

export function fetchCategoryEvents(category){
	return {
		type: FETCH_CAT_EVENTS,
		payload: null
	}
}