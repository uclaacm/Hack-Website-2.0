import React, { Component } from 'react';
import Filter from './filter';
import EventsList from './events-list';

export default class Events extends Component{
	render(){
		return (
			<div>
				<Filter />
				<EventsList />
			</div>
		);
	}
}