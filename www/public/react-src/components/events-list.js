import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchAllEvents, filterEvents } from '../actions/index';
import EventsListItem from './events-list-item';


class EventsList extends Component{

	componentWillMount(){
		this.props.fetchAllEvents();
	}

	renderEventItem(event){
		return (
			<EventsListItem key			= { event.id }
							date		= { event.date.start }
							title		= { event.title }
							location	= { event.location }
							category	= { event.category }
							tagline		= { event.tagline }
							desc		= { event.desc } />
		);
	}

	render(){
		if( this.props.filteredEvents.length == 0)
			return <div>Click on more categories.</div>;

		return (
			<div>
				{ this.props.filteredEvents.map(this.renderEventItem) }
			</div>
		);
	}

}

function mapStateToProps({events, filteredEvents}){
	return {events, filteredEvents};
}

function mapDispatchToProps(dispatch){
	return bindActionCreators({ fetchAllEvents, filterEvents }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(EventsList);
