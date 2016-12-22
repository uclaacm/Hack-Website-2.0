import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/app';
import Events from './components/events';
import Showcase from './components/showcase';

export default (
	<Route path="/" component={App}>
		<Route path="/events.html" component={Events} />
		<Route path="/showcase.html" component={Showcase} />
	</Route>
);

