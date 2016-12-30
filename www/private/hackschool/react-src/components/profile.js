import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'underscore';
import DashboardNav from './dashboard-nav';

class Profile extends Component{

	constructor(props){
		super(props);

		this.formatOtherMembers = this.formatOtherMembers.bind(this);
	}


	formatOtherMembers(members){
		//extract members that are not this user, then format
		return members
					.filter(member => member.id != this.props.user.id)
					//TODO: change to profile pic
					.map(member => <li key={member.id}>{member.name}</li>);

	}

	render(){
		const teamName 		= _.isEmpty(this.props.team) ? 'Join a team by clicking \'Manage Team\'' : this.props.team.name;
		const teamMembers 	= _.isEmpty(this.props.team) ? null : this.formatOtherMembers(this.props.team.members);
		const totalScore 	= _.isEmpty(this.props.team) ? 'Not available.' : this.props.team.totalScore;

		return(
			<div>
				<div style={{backgroundImage: `url(${this.props.user.profilePicture})`, width: '100px', height:'100px', border: '1px solid black'}}></div>
				<ul>{teamMembers}</ul>
				<h3>Hello,</h3>
				<h2>{this.props.user.name}</h2>
				<h4>{teamName}</h4>
				<h4> {/* TODO */}Team ranking:</h4>
				<h4>Total points: {totalScore}</h4>
				<DashboardNav />
			</div>
		);
	}

}

function mapStateToProps({user, team}){
	return {user, team};
}

export default connect(mapStateToProps)(Profile);