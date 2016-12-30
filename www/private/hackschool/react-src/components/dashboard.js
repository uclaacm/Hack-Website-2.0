import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchUser, fetchScoreboard } from '../actions/index';

import MenuBar from './menu-bar';
import Profile from './profile';
import Leaderboard from './leaderboard';
import DialogBox from './dialog-box';

class Dashboard extends Component{

	componentWillMount(){
		this.props.fetchUser('/hackschool/user');
		this.props.fetchScoreboard('/hackschool/scoreboard');
	}

	render() {
		//fetchUser not done yet
		if(!this.props.user)
			return <div>Retrieving profile info...</div>;

		//fetchScoreboard not done yet
		if(!this.props.scoreboard)
			return <div>Retrieving team info...</div>;

		console.log(this.props.user)
		return (
			<div>
				{ this.props.dialog.active && <DialogBox /> }
				<MenuBar />
				<Profile />
				<Leaderboard />
			</div>
		);
	}
}

function mapStateToProps({dialog, user, scoreboard}){
	return {dialog, user, scoreboard};
}

function mapDispatchToProps(dispatch){
	return bindActionCreators({fetchUser, fetchScoreboard}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);