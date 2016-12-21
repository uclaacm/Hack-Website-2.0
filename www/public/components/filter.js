import React, { Component } from 'react';
import { connect } from 'react-redux';

class Filter extends Component{

	constructor(props){
		super(props);
	}

	renderList(category){
		return (
			<li key={category}>
				<input type="radio" name="category" value={category}/>
				<label htmlFor={category}>{category}</label>
			</li>
		);
	}

	render(){
		return(
			<ul>
				{this.props.events.map(this.renderList)}
			</ul>
		);
	}

}

function mapStateToProps({events}){
	return {events};
}

export default connect(mapStateToProps)(Filter);