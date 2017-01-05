import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchUser, fetchSessions, fetchScoreboard, triggerTeamAction, changeDialog} from '../actions/index';

import MenuBar from './menu-bar';
import Profile from './profile';
import SessionsGrid from './sessions-grid';
import SessionDetail from './session-detail';
import Leaderboard from './leaderboard';
import DialogBox from './dialog-box';
import Loading from './loading';

class Dashboard extends Component{

	componentWillMount(){
		console.log('dash mounting')
		this.props.fetchUser('/hackschool/user');
		this.props.triggerTeamAction('fetch', null);
		this.props.fetchSessions('/hackschool/projects');
		this.props.fetchScoreboard('/hackschool/scoreboard');
	}

	render() {
		//fetchUser not done yet
		if(!this.props.user)
			return <Loading message="Retrieving user info..." />

		//fetchSessions not done yet
		if(!this.props.sessions)
			return <Loading message="Retrieving projects info..." />

		//fetchScoreboard not done yet
		if(!this.props.scoreboard)
			return <Loading message="Retrieving scoreboard info..." />

		if(!this.props.team.done)
			return <Loading message="Retrieving team info..." />

		const currentSlide = this.props.currentSlide == 'sessions' ? <SessionsGrid /> : <Leaderboard />;

		return (
			<div>
				{ this.props.dialog.active && <DialogBox /> }
				{this.props.currentSlide == 'sessions' && <SessionDetail />}
				<MenuBar />
				<Profile />
				{currentSlide}
			</div>
		);
	}
}

function mapStateToProps({dialog, user, scoreboard, currentSlide, sessions, team}){
	return {dialog, user, scoreboard, currentSlide, sessions, team};
}

function mapDispatchToProps(dispatch){
	return bindActionCreators({fetchUser, fetchSessions, fetchScoreboard, triggerTeamAction, changeDialog}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);