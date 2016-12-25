import { SELECT_PROJECT } from '../actions/index';

export default (state = null, action) => {

	switch(action.type){
		case SELECT_PROJECT:
			return action.payload;
		default:
			return state;
	}
}