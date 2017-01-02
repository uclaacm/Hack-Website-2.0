import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { selectSession } from '../actions/index';

class SessionDetail extends Component{

	render(){
		const session = this.props.selectedSession;
		if(!session)
			return null;

		return (
			<div className="session-detail-wrapper">
				<div className="session-detail">
					<button onClick={() => this.props.selectSession(null)}>back</button>
					Week {session.number}<br />
					{session.name}<br />
					{session.desc}<br />
					{session.slidesLink}<br />
					{session.videoLink}<br />
					{session.blogPostLink}
				</div>
			</div>
		);
	}

}

function mapStateToProps({selectedSession}){
	return {selectedSession};
}

function mapDispatchToProps(dispatch){
	return bindActionCreators({selectSession}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SessionDetail);