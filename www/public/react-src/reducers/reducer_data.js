import { FETCH_ALL_DATA } from '../actions/index';

export default (state = [], action) => {

	switch(action.type){
		case FETCH_ALL_DATA:
			return action.payload.data;
		default:
			return state;
	}
}