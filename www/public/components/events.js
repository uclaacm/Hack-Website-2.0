import React, { Component } from 'react';
import Filter from './filter';
import EventsList from './events-list';

export default class Events extends Component{
	render(){
		return (
			<div>
				<p>Select hack school for now...</p>
				<Filter />
				<EventsList />
			</div>
		);
	}
}