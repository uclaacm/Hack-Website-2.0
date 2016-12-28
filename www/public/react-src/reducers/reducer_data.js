import { FETCH_ALL_EVENTS, FETCH_ALL_SHOWCASE } from '../actions/index';

export default (state = [], action) => {

	switch(action.type){
		case FETCH_ALL_EVENTS:
			return action.payload.data;

		case FETCH_ALL_SHOWCASE:
			if(action.payload.data.length == 0)
				return [];
			else{
				const cols = 3;
				return action.payload.data.projects.reduce((arr, proj) => {
					if(arr.length == 0 || arr[arr.length-1].length >= cols)
						arr.push([proj]);
					else
						arr[arr.length-1].push(proj);
					
					return arr;
				}, []);
			}
			
		default:
			return state;
	}
}