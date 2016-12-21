import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { filterEvents } from '../actions/index';

class Filter extends Component{

	constructor(props){
		super(props);

		this.state = { selectedCategories: []};

		//binding functions
		this.setAllCheckBoxes = this.setAllCheckBoxes.bind(this);
		this.setStateAndCallAction = this.setStateAndCallAction.bind(this);
		this.onCheckBoxToggle = this.onCheckBoxToggle.bind(this);
		this.renderList = this.renderList.bind(this);
	}

	//sets default state to be all checked
	componentDidMount(){
		this.toggleBoxes(true);
	}

	setAllCheckBoxes(toggle)
	{
		[...document.forms['filter'].elements].forEach(element => {
			if(element.type == 'checkbox')
				element.checked = toggle;
		});
	}

	setStateAndCallAction(newCategories){
		this.setState({
			selectedCategories : newCategories
		}, () => {
			this.props.filterEvents(
				this.props.events.filter(event => this.state.selectedCategories.includes(event.category))
			);
		});
	}

	//false unchecks all boxes, true checks all boxes
	toggleBoxes(toggle){
		this.setAllCheckBoxes(toggle);
		if(!toggle)
			this.setStateAndCallAction([]);
		else
			this.setStateAndCallAction(this.props.categories);
	}

	onCheckBoxToggle(e){		
		const selectedCategory = e.target.value;
		const stateCats = this.state.selectedCategories;
		const index = this.state.selectedCategories.indexOf(selectedCategory);
		
		//updating state to reflect checked checkboxes
		let newCategories;
		if(index == -1)
			newCategories = [...stateCats, selectedCategory];
		else
			newCategories = [...stateCats.slice(0, index),
							 ...stateCats.slice(index+1)];

		//passing in component state to action creator
		this.setStateAndCallAction(newCategories)
	}

	renderList(category){
		return (
			<li key={category}>
				<input type="checkbox" value={category} onChange={this.onCheckBoxToggle}/>
				<label htmlFor={category}>{category}</label>
			</li>
		);
	}

	render(){
		return(
			<form name="filter">
				<ul>
					{this.props.categories.map(this.renderList)}
					<li key="clear">
						<button onClick={(e) =>{
							this.toggleBoxes(false);
							e.preventDefault();
						}}>
							clear
						</button>
						<button onClick={(e) => {
							this.toggleBoxes(true);
							e.preventDefault();
						}}>
							all
						</button>
					</li>
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