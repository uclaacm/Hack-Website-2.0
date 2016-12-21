import { combineReducers } from 'redux';
import CategoriesReducer from './reducer_categories';
import EventsReducer from './reducer_events';

const rootReducer = combineReducers({
	categories: CategoriesReducer,
	events: EventsReducer
});

export default rootReducer;
