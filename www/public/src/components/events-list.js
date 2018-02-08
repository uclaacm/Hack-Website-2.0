import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchAllEventsData, filterData } from '../actions/index';
import EventsListItem from './events-list-item';


class EventsList extends Component{

	componentWillMount(){
		this.props.fetchAllEventsData('/api/v1/event');
	}

	renderEventItem(event){
		return (
			<EventsListItem key			= { event.id }
							dateStart	= { event.date.start }
							dateEnd		= { event.date.end }
							title		= { event.title }
							location	= { event.location }
							category	= { event.category }
							tagline		= { event.tagline }
							desc		= { event.desc } />
		);
	}

	render(){
		if( this.props.filteredData.length == 0)
			return (
				<div className="events-list">
					<div className="events-item events-none">
						<p>Select categories above to view.</p>
					</div>
				</div>
			);

		return (
			<div className="events-list">
				{ this.props.filteredData.map(this.renderEventItem) }
			</div>
		);
	}

}

function mapStateToProps({data, filteredData}){
	return {events: data.events, filteredData};
}

function mapDispatchToProps(dispatch){
	return bindActionCreators({ fetchAllEventsData, filterData }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(EventsList);
