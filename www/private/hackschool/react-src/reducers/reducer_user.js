import { FETCH_USER } from '../actions';

export default (state = null, action) => {

	switch(action.type){
		case FETCH_USER:
			//console.log('user', action.payload.data.user)
			return action.payload.data.user;
		default:
			return state;
	}
}