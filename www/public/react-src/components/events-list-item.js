import React, { Component } from 'react';
import { connect } from 'react-redux';

class EventsListItem extends Component {

	constructor(props){
		super(props);

		this.getImageSrc = this.getImageSrc.bind(this);
		this.getDate = this.getDate.bind(this);
	}

	getImageSrc(category){
		return this.props.categories
					.find( catItem => catItem.name == category)
					.url;
	}

	getDate(date){
		let newDate = new Date(date);
		newDate.hour = newDate.getHours() % 12;
		newDate.suffix = newDate.getHours() > 12 ? 'PM' : 'AM';
		newDate.min = newDate.getMinutes() == '0' ? '00' : newDate.getMinutes();
		newDate.month = newDate.toDateString().substr(4,4);
		return newDate;
	}

	render(){
		const start = this.getDate(this.props.dateStart);
		const end = this.getDate(this.props.dateEnd);
		const category = this.props.category;

		return (
			<div className="events-item-wrapper">
				<div className="time-label">
					<p>
						<span>{start.month.trim()}</span><br/>
						<span className="date-number">{start.getDate()}</span>
					</p>
				</div>
				<div className="events-item">
					<div className="img-wrapper">
						<img src={this.getImageSrc(category)}/>
					</div>
					<div className="info-wrapper info-default">
						<p className="category-label">{category}</p>
						<h1>{this.props.title}</h1>
						<h3>{start.month} {start.hour}:{start.min} {start.suffix} - {end.hour}:{end.min} {end.suffix}</h3>
						<h3>{this.props.location}</h3>
					</div>
					<div className="info-wrapper info-hover">
						<h1>{this.props.tagline}</h1>
						<p>{this.props.desc}</p>
					</div>
				</div>
			</div>
		);
	}
	
}

function mapStateToProps({categories}){
	return {categories};
}

export default connect(mapStateToProps)(EventsListItem);