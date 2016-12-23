import { FILTER_EVENTS } from '../actions/index';

export default (state = [], action) => {

	switch(action.type){
		case FILTER_EVENTS:
			return action.payload.sort((a,b) => {
				const first = new Date(a.date.start);
				const second = new Date(b.date.start);
				return first < second ? 1 : -1;
			});
		default:
			return state;
	}
}