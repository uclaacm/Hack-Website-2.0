import { FETCH_SESSIONS } from '../actions';

export default (state = null, action) => {

	switch(action.type){
		case FETCH_SESSIONS:
			if(!action.payload.success)
				return state;
			else{
				const cols = 4;
				return action.payload.projects.reduce((arr, proj) => {
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