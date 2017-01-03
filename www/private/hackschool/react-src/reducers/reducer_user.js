import { FETCH_USER } from '../actions/index';

export default (state = null, action) => {

	switch(action.type){
		case FETCH_USER:
			console.log(action.payload.user)
			return action.payload.user;
		default:
			return state;
	}
}