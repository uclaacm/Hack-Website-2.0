import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { selectProject } from '../actions/index';

import ProjectItem from './project-item';

class ShowcaseGrid extends Component{

	constructor(props){
		super(props);

		this.renderRow = this.renderRow.bind(this);
		this.renderProject = this.renderProject.bind(this);
		this.onSelect = this.onSelect.bind(this);
	}

	onSelect(project){
		this.props.selectProject(project);
	}

	renderProject(project){
		return (
			<td 	className	= "project-td"
					key			= { project.id }>
				
				<ProjectItem title			= { project.title }
							 contributors 	= { project.contributors }
							 image			= { project.image } 
							 onClickEvent	= { () => this.onSelect(project) }/>
			</td>
		);
	}

	renderRow(row){

		return (
			<tr className="row" key={`row-${row[0].id}`} >
				{row.map(this.renderProject)}
			</tr>
		);
	}

	render(){
		return (
			<table className="grid">
				<tbody>
					{this.props.projects.map(this.renderRow)}
				</tbody>
			</table>
		);
	}
}

function mapStateToProps({data}){
	if(data.length == 0) 
		return {projects: []};

	//divides into arrays of length 3
	const cols = 3;

	let projects = data.projects.reduce((arr, proj) => {
		if(arr.length == 0 || arr[arr.length-1].length >= cols)
			arr.push([proj]);
		else
			arr[arr.length-1].push(proj);
		
		return arr;

	}, []);

	return {projects};
}


function mapDispatchToProps(dispatch){
	return bindActionCreators({ selectProject }, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(ShowcaseGrid);
