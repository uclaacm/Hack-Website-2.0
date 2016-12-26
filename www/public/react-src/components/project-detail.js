import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { selectProject } from '../actions/index';

class ProjectDetail extends Component{

	constructor(props){
		super(props);

		this.formatContributors = this.formatContributors.bind(this);
		this.onClickEvent = this.onClickEvent.bind(this);
	}

	formatContributors(contributors){
		const num = contributors.length;
		return contributors.map((person, i) => {
			if(i < num - 1)
				return `${person}, `;
			else if(i != 0)
				return `and ${person}`;
			else
				return `${person} `;
		});
	}

	onClickEvent(e){
		const projDetail = document.querySelector('.project-detail');
		projDetail.classList.remove('enter');

		const projects = Array.from(document.querySelectorAll('.project-item'));
		projects.forEach(proj => {
				proj.classList.remove('exitLeft');
				proj.classList.remove('exitRight');	
		});
		setTimeout( () => this.props.selectProject(null), 1000);
	}

	render(){
		const project = this.props.selectedProject;
		if(project == null) return <div className="project-detail"></div>;

		return(
			<div className="project-detail">
				<div className="btn-wrapper">
					<button onClick={this.onClickEvent}>
					</button>
				</div>
				<div>
					<div className="img-wrapper">
						<img src={project.image} />
					</div>
					<div className="detail-zoom">
						<h1>{project.title}</h1>
						<h3>by {this.formatContributors(project.contributors)}</h3>
						<div className="project-desc">
							<p>{project.desc}</p>
						</div>
						<a href={project.link}>
							<button>SEE THIS PROJECT</button>
						</a>
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