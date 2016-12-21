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
				{this.props.categories.map(this.renderList)}
			</ul>
		);
	}

}

function mapStateToProps({categories}){
	return {categories};
}

export default connect(mapStateToProps)(Filter);