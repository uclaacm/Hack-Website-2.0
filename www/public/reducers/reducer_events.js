import { FETCH_ALL_EVENTS } from '../actions/index';

export default (state = [], action) => {

	switch(action.type){
		case FETCH_ALL_EVENTS:
			return action.payload.events;
		default:
			return state;
	}
}