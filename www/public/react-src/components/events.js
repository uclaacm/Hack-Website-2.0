import React, { Component } from 'react';
import Filter from './filter';
import EventsList from './events-list';

export default class Events extends Component{
	render(){
		return (
			<div className="events-page">
				<div className="col-left">
					<Filter />
					<EventsList />
				</div>
				<div className="col-right">
					<div className="calendar">
						<p>Download the full ACM Hack Winter Quarter schedule here:</p>
						<a href="#"><button>CALENDAR</button></a>
					</div>
				</div>
			</div>
		);
	}
}