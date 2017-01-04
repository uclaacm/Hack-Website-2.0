import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchAllData } from '../actions';

import ShowcaseGrid from './showcase-grid';
import ProjectDetail from './project-detail';

class Showcase extends Component{

	componentWillMount(){
		this.props.fetchAllData('/api/v1/showcase');
	}

	render(){
		return (
			<div className="showcase-page">
				<ProjectDetail />
				<ShowcaseGrid />
			</div>
		);
	}
}

function mapStateToProps({selectedProject}){
	return {selectedProject};
}


function mapDispatchToProps(dispatch){
	return bindActionCreators({ fetchAllData }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Showcase);
