import { SELECT_SESSION } from '../actions';

export default (state = null, action) => {

	switch(action.type){

		case SELECT_SESSION:
			return action.payload;
		default:
			return state;

	}

}