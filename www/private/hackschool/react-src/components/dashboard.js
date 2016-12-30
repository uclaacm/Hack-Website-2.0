import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchUser, fetchSessions, fetchScoreboard } from '../actions/index';

import MenuBar from './menu-bar';
import Profile from './profile';
import SessionsGrid from './sessions-grid';
import SessionDetail from './session-detail';
import Leaderboard from './leaderboard';
import DialogBox from './dialog-box';

class Dashboard extends Component{

	componentWillMount(){
		this.props.fetchUser('/hackschool/user');
		this.props.fetchSessions('/hackschool/projects');
		this.props.fetchScoreboard('/hackschool/scoreboard');
	}

	render() {
		//fetchUser not done yet
		if(!this.props.user)
			return <div>Retrieving profile info...</div>;

		//fetchSessions not done yet
		if(!this.props.sessions)
			return <div>Retrieving projects info...</div>;

		//fetchScoreboard not done yet
		if(!this.props.scoreboard)
			return <div>Retrieving team info...</div>;

		const currentSlide = this.props.currentSlide == 'sessions' ? <SessionsGrid /> : <Leaderboard />;

		return (
			<div>
				{ this.props.dialog.active && <DialogBox /> }
				<MenuBar />
				<Profile />
				{currentSlide}
				<SessionDetail />
			</div>
		);
	}
}

function mapStateToProps({dialog, user, scoreboard, currentSlide, sessions}){
	return {dialog, user, scoreboard, currentSlide, sessions};
}

function mapDispatchToProps(dispatch){
	return bindActionCreators({fetchUser, fetchSessions, fetchScoreboard}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);