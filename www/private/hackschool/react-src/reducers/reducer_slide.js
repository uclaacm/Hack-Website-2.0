import { SELECT_SLIDE } from '../actions/index';

export default (state = 'sessions', action) => {

	switch(action.type){
		case SELECT_SLIDE:
			return action.payload;
		default:
			return state;
	}

}