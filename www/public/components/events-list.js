import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchAllEvents } from '../actions/index';
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
		return (
			<div>
				{ this.props.events.map(this.renderEventItem) }
			</div>
		);
	}

}

function mapStateToProps({events}){
	return {events};
}

function mapDispatchToProps(dispatch){
	return bindActionCreators({ fetchAllEvents }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(EventsList);
