import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchUser, triggerSessionAction, fetchScoreboard, triggerTeamAction, changeDialog} from '../actions';

import MenuBar from './menu-bar';
import Profile from './profile';
import SessionsGrid from './sessions-grid';
import SessionDetail from './session-detail';
import Leaderboard from './leaderboard';
import DialogBox from './dialog/dialog-box';
import Loading from './loading';

class Dashboard extends Component{

	componentWillMount(){
		this.props.fetchUser('/hackschool/user');
		this.props.triggerTeamAction('fetch', null);
		this.props.triggerSessionAction('fetch', null);
		this.props.fetchScoreboard('/hackschool/scoreboard');
	}

	render() {
		//fetchUser not done yet
		if(!this.props.user)
			return <Loading message="Retrieving user info..." />

		//fetchSessions not done yet
		if(!this.props.sessions)
			return <Loading message="Retrieving sessions info..." />

		//fetchScoreboard not done yet
		if(!this.props.scoreboard)
			return <Loading message="Retrieving scoreboard info..." />

		if(!this.props.team.done)
			return <Loading message="Retrieving team info..." />

		const classes = this.props.currentSlide == 'sessions' ? "slide-wrapper" : "slide-wrapper slide-exit";

		return (
			<div>
				{ this.props.dialog.active && <DialogBox /> }
				{ this.props.currentSlide == 'sessions' && <SessionDetail /> }
				<MenuBar />
				<Profile /> 
				<div className={classes}> 
					<SessionsGrid />
					<Leaderboard />
				</div>
			</div>
		);
	}
}

function mapStateToProps({dialog, user, scoreboard, currentSlide, sessions, team}){
	return {dialog, user, scoreboard, currentSlide, sessions, team};
}

function mapDispatchToProps(dispatch){
	return bindActionCreators({fetchUser, triggerSessionAction, fetchScoreboard, triggerTeamAction, changeDialog}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);