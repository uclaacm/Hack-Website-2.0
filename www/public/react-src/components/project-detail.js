import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { selectProject } from '../actions/index';

class ProjectDetail extends Component{

	render(){

		const project = this.props.selectedProject;

		if(project == null)
			return <div></div>;

		return(
			<div>
				<div>
					<button>BACK</button>
				</div>
				<div>
					<img src={project.image} />
					<br />
					Title: {project.title}
					<br />
					Contributors: {project.contributors.map(c => `${c} `)}
					<br />
					Description: {project.desc}
					<br />
					<a href={project.link}>Link</a>
				</div>
			</div>
		);
	}
}

function mapStateToProps({ selectedProject }){
	return { selectedProject };
}

function mapDispatchToProps(dispatch){
	return bindActionCreators({ selectProject }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectDetail);