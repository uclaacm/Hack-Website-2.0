import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { filterEvents } from '../actions/index';

class Filter extends Component{

	constructor(props){
		super(props);

		//binding functions
		this.renderList = this.renderList.bind(this);
		this.onRadioSelect = this.onRadioSelect.bind(this);
	}

	onRadioSelect(e){
		const selectedCategory = e.target.value;

		//call action creator with newly selected events
		this.props.filterEvents(
			this.props.events.filter(event => event.category == selectedCategory)
		);
	}

	renderList(category){
		return (
			<li key={category}>
				<input type="radio" name="category" value={category} onChange={this.onRadioSelect}/>
				<label htmlFor={category}>{category}</label>
			</li>
		);
	}

	render(){
		return(
			<form>
				<ul>
					{this.props.categories.map(this.renderList)}
				</ul>
			</form>
		);
	}

}

function mapStateToProps({categories, events}){
	return {categories, events};
}

function mapDispatchToProps(dispatch){
	return bindActionCreators({ filterEvents }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Filter);