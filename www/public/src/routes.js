import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/app';
import Events from './components/events';
import Showcase from './components/showcase';

export default (
	<Route path="/" component={App}>
		<Route path="/events" component={Events} />
		<Route path="/showcase" component={Showcase} />
	</Route>
);

