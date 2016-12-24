import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { selectProject } from '../actions/index';

class ProjectDetail extends Component{

	render(){
		const project = this.props.selectedProject;
		if(project == null) return <div className="project-detail"></div>;

		return(
			<div className="project-detail">
				<div className="btn-wrapper">
					<button onClick={() => this.props.selectProject(null)}>BACK</button>
				</div>
				<div>
					<div className="img-wrapper">
						<img src={project.image} />
					</div>
					<div className="detail-zoom">
						<h1>{project.title}</h1>
						<h3>{project.contributors.map(c => `${c} `)}</h3>
						<p>{project.desc}</p>
						<a href={project.link}>Link</a>
					</div>
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