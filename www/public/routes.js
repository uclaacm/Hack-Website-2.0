import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/app';
import MainIndex from './components/main_index';
import Events from './components/events';
import Showcase from './components/showcase';

export default (
	<Route path="/" component={App}>
		<IndexRoute component={MainIndex} />
		<Route path="/events.html" component={Events} />
		<Route path="/showcase.html" component={Showcase} />
	</Route>
);

