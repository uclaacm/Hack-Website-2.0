import { FETCH_SESSIONS } from '../actions';
import _ from 'underscore';

export default (state = null, action) => {
	switch(action.type){

		case FETCH_SESSIONS:
			if(!action.payload.data.success)
				return state;
			else{
				const cols = 4;
				return action.payload.data.sessions.reduce((arr, session) => {

					if(!_.isEmpty(session.project)){
						session.points = session.project.points;
						session.slidesLink = session.project.slidesLink;
						session.videoLink = session.project.videoLink;
						session.submissionLink = session.project.submissionLink;
						session.project = true;
					}else session.project = false;

					if(arr.length == 0 || arr[arr.length-1].length >= cols)
						arr.push([session]);
					else
						arr[arr.length-1].push(session);
					
					return arr;
				}, []);
			}
		default:
			return state;
	}
}