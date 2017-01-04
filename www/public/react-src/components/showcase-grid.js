import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { selectProject } from '../actions';

import ProjectItem from './project-item';

class ShowcaseGrid extends Component{

	constructor(props){
		super(props);

		this.renderRow = this.renderRow.bind(this);
		this.renderProject = this.renderProject.bind(this);
		this.onSelect = this.onSelect.bind(this);
	}

	onSelect(project){
		//exit animations
		const projects = Array.from(document.querySelectorAll('.project-item'));
		projects.forEach(proj => {
			switch(proj.classList[0]){
				case "row-even":
					proj.classList.add('exitLeft');
					break;
				case "row-odd":
					proj.classList.add('exitRight');
					break;
			}
			
		});

		//enter animations
		const projDetail = document.querySelector('.project-detail');
		projDetail.classList.add('enter');

		//update app-level state
		this.props.selectProject(project);

		//miscellaneous fixes
		const body = document.querySelector('body');
		body.classList.add('fix-scroll');
	}

	renderProject(project, row, column){
		const rowLabel = row % 2 ? "even" : "odd";
		return (
			<td 	className	= "project-td"
					key			= { project.id }>
				
				<ProjectItem row 			= { row }
							 col 			= { column }
							 rowLabel		= { rowLabel }
							 title			= { project.title }
							 contributors 	= { project.contributors }
							 image			= { project.image } 
							 onClickEvent	= { () => this.onSelect(project) }/>
			</td>
		);
	}

	renderRow(row, rowNum){
		return (
			<tr className="row" key={`row-${row[0].id}`} >
				{row.map((proj, colNum) => this.renderProject(proj, rowNum, colNum%3))}
			</tr>
		);
	}

	render(){
		let rowNum = -1;
		return (
			<table className="grid">
				<tbody>
					{this.props.projects.map((row, rowNum) => this.renderRow(row, rowNum))}
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
