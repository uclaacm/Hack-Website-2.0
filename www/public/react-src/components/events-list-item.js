import React, { Component } from 'react';
import { connect } from 'react-redux';

class EventsListItem extends Component {

	constructor(props){
		super(props);

		this.getImageSrc = this.getImageSrc.bind(this);
		this.getDate = this.getDate.bind(this);
	}

	getImageSrc(category){
		this.props.categories.forEach( catItem => {
			if(catItem.name == category)
				return catItem.url;
		});
	}

	getDate(date){
		return new Date(date);
		//getYear, getMouth, minutes, seconds, toDateString
	}

	render(){
		const start = this.getDate(this.props.dateStart);
		const end = this.getDate(this.props.dateEnd);
		const category = this.props.category;

		return (
			<div className="events-item">
				<div className="img-wrapper">
					<img src="/common/images/Hack-Logo-Purple.png"/>
				</div>
				<div className="info-wrapper">
					<p className="category-label">{category}</p>
					<h1>{this.props.title}</h1>
					<h3>{start.getHours()}:{start.getMinutes()} - {end.getHours()}:{end.getMinutes()}</h3>
					<h3>{this.props.location}</h3>
				</div>
			</div>
		);
	}
	
}

function mapStateToProps({categories}){
	return {categories};
}

export default connect(mapStateToProps)(EventsListItem);