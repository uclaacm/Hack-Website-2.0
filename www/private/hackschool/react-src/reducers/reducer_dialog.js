import { CHANGE_DIALOG } from '../actions';

//onBoarding value will be changed if team is null on dialog's render
const defaultState = {
	active: false,
	onBoarding: false,
	attendance: false
};

export default (state = defaultState, action) => {
	switch(action.type){
		case CHANGE_DIALOG:
			return Object.assign({}, state, action.payload);	
		default:
			return state;
	}
}