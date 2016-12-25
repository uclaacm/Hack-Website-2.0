import { combineReducers } from 'redux';

import DataReducer from './reducer_data';
import FilteredDataReducer from './reducer_filtered';

import CategoriesReducer from './reducer_categories';
import SelecedProjectReducer from './reducer_selected_project';

const rootReducer = combineReducers({
	data: DataReducer,
	filteredData: FilteredDataReducer,
	categories: CategoriesReducer,
	selectedProject: SelecedProjectReducer
});

export default rootReducer;
