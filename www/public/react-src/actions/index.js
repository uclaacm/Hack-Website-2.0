import axios from 'axios';
import _ from 'underscore';

export const FETCH_ALL_DATA = 'FETCH_ALL_DATA';
export const FILTER_DATA = 'FILTER_DATA';
export const SELECT_PROJECT = 'SELECT_PROJECT';

export function fetchAllData(url){

	const request = axios.get(url);
	
	return {
		type: FETCH_ALL_DATA,
		payload: request
	}
}

export function filterData(all, filter){
	return {
		type: FILTER_DATA,
		payload: all.filter(item => _.includes(filter, item.category))
	}
}

export function selectProject(proj){
	return {
		type: SELECT_PROJECT,
		payload: proj
	}
}