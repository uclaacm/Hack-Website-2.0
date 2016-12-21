import React, { Component } from 'react';
import EventsListItem from './events-list-item';

class EventsList extends Component{


	render(){
		return (
			<EventsListItem key="id"
							date="date"
							title="title"
							location="location"
							category="category"
							tagline="tagline"
							desc="desc" />
		);
	}

}

export default EventsList;