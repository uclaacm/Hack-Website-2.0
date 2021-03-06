import React from 'react';
import Filter from './filter';
import EventsList from './events-list';

export default function Events(){
	return (
		<div className="events-page">
			<div className="col-left">
				<Filter />
				<EventsList />
			</div>
			<div className="col-right">
				<div className="calendar">
					<p>Download the full ACM Hack Winter Quarter schedule here:</p>
					<a href="https://s3-us-west-1.amazonaws.com/hack-ucla/ACM_Hack_Events.ics" target="_BLANK"><button>CALENDAR</button></a>
				</div>
			</div>
		</div>
	);
}
