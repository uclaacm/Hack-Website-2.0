import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchAllShowcaseData } from '../actions/index';

import ShowcaseGrid from './showcase-grid';
import ProjectDetail from './project-detail';

class Showcase extends Component{

	componentWillMount(){
		this.props.fetchAllShowcaseData('/api/v1/showcase');
	}

	render(){
		return (
			<div className="showcase-page">
				<a href="https://docs.google.com/forms/d/e/1FAIpQLSfflJk_PR2Vt45XhROVyCw-U6zEjPOyhKszwSNkv3YopMq3-Q/viewform?c=0&w=1&usp=send_form" target="_blank">
					<div className="submit-project">
						Click here to submit your project!
					</div>
				</a>
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
	return bindActionCreators({ fetchAllShowcaseData }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Showcase);
