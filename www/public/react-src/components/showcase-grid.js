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
	}

	renderProject(project){
		return (
			<div 	className="project-item"
					key={project.id}
					onClick={ () => this.props.selectProject(project)}>
				
				<ProjectItem title			= { project.title }
							 contributors 	= { project.contributors }
							 image			= { project.image } />
			</div>
		);
	}

	renderRow(row){
		return (
			<div className="row" key={`row-${row[0].id}`} >
				{row.map(this.renderProject)}
			</div>
		);
	}

	render(){
		return (
			<div>
				{this.props.projects.map(this.renderRow)}
			</div>
		);
	}
}

function mapStateToProps({data}){
	//return {projects: data.projects};

	//dummy data for now
	let projects = [
	    {
	      "id": "1653fac0-c712-11e6-b0e4-fd8b404bc168",
	      "date": "2016-12-21T00:11:57.932Z",
	      "desc": "An API for ACM Hack to view, create, update, and delete showcase projects",
	      "image": "/common/images/Android_M.jpg",
	      "link": "/api/v1/showcase",
	      "title": "Hack Showcase API",
	      "contributors": [
	        "Nikhil Kansal",
	        "Yvonne Chen",
	        "Justin Liu"
	      ]
	    },
	    {
	      "id": "8891a468-f32c-4e75-a434-8ced1df9183a",
	      "date": "2016-12-22T05:47:15.722Z",
	      "desc": "The dashboard for hack school students to complete hack school tasks",
	      "image": "/common/images/Android_M.jpg",
	      "link": "http://hackucla.com/hackschool",
	      "title": "Hack School Dashboard",
	      "contributors": [
	        "Nikhil Kansal",
	        "Justin Liu",
	        "Yvonne Chen"
	      ]
	    }];

	//divides into arrays of length 3
	const cols = 3;

	projects = projects.reduce((arr, proj) => {
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
