import { CHANGE_DIALOG } from '../actions';

//onBoarding value will be changed if team is null on dialog's render
const defaultState = {
	active: false,
	onBoarding: false
};

export default (state = defaultState, action) => {

	switch(action.type){
		case CHANGE_DIALOG:
			let temp = {};

			//clones state into temp
			for(let property in state){
				temp[property] = state[property];
			}
			
			//updates property values
			for (let property in action.payload) {
			    if (action.payload.hasOwnProperty(property)) {
			        temp[property] = action.payload[property];
			    }
			}
			return temp;
			
		default:
			//console.log('default dialog', state)
			return state;
	}
}