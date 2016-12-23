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
		//this.toggleBoxes(true);
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
			this.setStateAndCallAction(this.props.categories.map(cat => cat.name));
	}

	onCheckBoxToggle(e){		
		const selectedCategory = e.target.value;
		const stateCats = this.state.selectedCategories;
		const index = stateCats.indexOf(selectedCategory);
		
		//updating state to reflect checked checkboxes
		let newCategories;
		if(index == -1)
			newCategories = [...stateCats, selectedCategory]; 	//copy of appended
		else
			newCategories = [...stateCats.slice(0, index),		//copy of removed
							 ...stateCats.slice(index+1)];

		//passing in component state to action creator
		this.setStateAndCallAction(newCategories)
	}

	renderList(category){
		return (
			<li key={category.name}>
				<input 	type="checkbox" className="checkbox" value={category.name}
						id={category.name} onChange={this.onCheckBoxToggle}/>
				
				<div className="custom-check">
				    <label htmlFor={category.name}></label>
				    <p>{category.name}</p>
				</div>
			</li>
		);
	}

	render(){
		return(
			<form name="filter">
				<ul className="filter-categories">
					{this.props.categories.map(this.renderList)}
					<li key="clear" className="buttons">
						<button onClick={(e) => {
							this.toggleBoxes(true);
							e.preventDefault();
						}}>
							all
						</button>
						<button onClick={(e) =>{
							this.toggleBoxes(false);
							e.preventDefault();
						}}>
							none
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