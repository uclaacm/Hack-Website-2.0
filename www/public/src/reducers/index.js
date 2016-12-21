import { combineReducers } from 'redux';
import CategoriesReducer from './reducer_categories';
import EventsReducer from './reducer_events';
import FilteredEventsReducer from './reducer_filtered';

const rootReducer = combineReducers({
	categories: CategoriesReducer,
	events: EventsReducer,
	filteredEvents: FilteredEventsReducer
});

export default rootReducer;
