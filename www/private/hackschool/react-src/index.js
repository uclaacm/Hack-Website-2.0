import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxPromise from 'redux-promise';

import Dashboard from './components/dashboard';
import reducers from './reducers';

const createStoreWithMiddleware = applyMiddleware(ReduxPromise)(createStore);


ReactDOM.render(<Provider store={createStoreWithMiddleware(reducers)}>
					<Dashboard />
				</Provider>, document.querySelector('.container'));