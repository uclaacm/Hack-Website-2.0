import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { selectSession } from '../actions';
import SessionItem from './session-item';

class SessionsGrid extends Component{

	constructor(props){
		super(props);

		this.renderSession = this.renderSession.bind(this);
		this.onSelect = this.onSelect.bind(this);
	}

	onSelect(session){	
		this.props.selectSession(session);
	}

	//TODO: TEST THIS
	renderSession(session, i){
		//if the link is not available, don't show its icon
		const sourceCodeLink = typeof session.sourceCodeLink != 'undefined';
		const slidesLink = typeof session.slidesLink != 'undefined';
		const videoLink = typeof session.videoLink != 'undefined';
		const blogPostLink = typeof session.blogPostLink != 'undefined';
		const attendance = this.props.user.attendance;

		return (
				<SessionItem key			= { session.id }
							 title			= { session.name }
							 number			= { session.number }
							 image			= { session.image }
							 onClickEvent	= { () => this.onSelect(session) }
							 project 		= { session.project }
							 sourceCodeLink = { sourceCodeLink }
							 slidesLink		= { slidesLink }
							 videoLink		= { videoLink }
							 blogPostLink	= { blogPostLink } 
							 attendance		= { attendance }/>
		);
	}

	render(){
		return (
			<div className="grid-wrapper">
				<div className="grid">
					{this.props.sessions.map((item, i) => this.renderSession(item, i))}
				</div>
			</div>
		);
	}

}

function mapStateToProps({sessions, user}){
	return {sessions: sessions.data, user};
}

function mapDispatchToProps(dispatch){
	return bindActionCreators({selectSession}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SessionsGrid);