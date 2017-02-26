import { FETCH_SESSIONS, ATTEND_SESSION, RESET_ATTEND } from '../actions';
import _ from 'underscore';

export default (state = null, action) => {
	switch(action.type){
		case FETCH_SESSIONS:
			//console.log(action.payload.data.sessions)
			if(!action.payload.data.success)
				return state;
			else{
				//console.log(action.payload.data.sessions)
				const cols = 4;
				return {
				attend: null,
				attendSuccess: false,
				data: action.payload.data.sessions
						.sort((a, b) => a.number > b.number ? 1 : -1)
				/*		.reduce((arr, session) => {
						if(!_.isEmpty(session.project)){
							session.points = session.project.points;
							session.slidesLink = session.project.slidesLink;
							session.videoLink = session.project.videoLink;
							session.sourceCodeLink = session.project.sourceCodeLink;
							session.submissionLink = session.project.submissionLink;
							session.project = true;
						}else session.project = false;

						if(arr.length == 0 || arr[arr.length-1].length >= cols)
							arr.push([session]);
						else
							arr[arr.length-1].push(session);
						
						return arr;

					}, [])*/
				};
			}
		case ATTEND_SESSION:
			//console.log('session', state)
			//action.payload.data.sessionNumber
			if(action.payload.data.success){
				return {
					attend: action.payload.data.sessionNumber,
					attendSuccess: true,
					data: state.data
				}
			}
			return {
				attend: action.payload.data.error,
				attendSuccess: false,
				data: state.data
			}
		case RESET_ATTEND:
			return {
				attend: null,
				attendSuccess: false,
				data: state.data
			}
		default:
			return state;
	}
}