import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getTeamRank } from '../actions';
import DashboardNav from './dashboard-nav';

class Profile extends Component{

	constructor(props){
		super(props);
		this.formatOtherMembers = this.formatOtherMembers.bind(this);
	}

	//not just initial mount, need to change to whenever update
	//can't use componentWillUpdate() since will generate infinite loop
	//TODO: figure this out
	componentWillMount(){
		if(this.props.team.team)
			this.props.getTeamRank([...this.props.scoreboard.featured, ...this.props.scoreboard.list], this.props.team.team.id);
	}

	componentWillReceiveProps(props){
		//console.log('profile props', props)
	}

	formatOtherMembers(members){
		//extract members that are not this user, then format
		return members
					.filter(member => member.id != this.props.user.id)
					.map(member => <li key={member.id}>
										<div	className="team-profile-pic shadow"></div>
										<div 	className="team-profile-pic"
												style={{backgroundImage: `url(${member.profilePicture.small})`}}></div>
										<div className="hover-name">
											<div className="triangle-with-shadow"></div>
											<span>{member.name}</span>
										</div>
									</li>);

	}

	render(){
		const props = this.props.team;

		const teamDisplay 	= props.team ? <h4 className="team">Team {props.team.name}</h4> : <h4 className="team">Not on a team</h4>
		const teamMembers 	= props.team ? this.formatOtherMembers(props.team.members) : null;

		const teamRanking 	= props.team 
								? 	<div>
										<h3>TEAM RANKING</h3>
										<h3 className="number">{this.props.teamRank}</h3>
									</div>
								: null;
		const totalScore 	= props.team 
								? 	<div>
										<h3>TOTAL POINTS</h3>
										<h3 className="number">{props.team.totalScore}</h3>
									</div>
								: null;

		return(
			<div className="profile-wrapper">
				<div className="profile">
					<div	className="profile-pic shadow"></div>
					<div 	className="profile-pic main"
							style={{backgroundImage: `url(${this.props.user.profilePicture.medium})`}}></div>
					<div className="main-profile-info">
						<h3 className="greeting">Hello,</h3>
						<h1>{this.props.user.name}</h1>
						{teamDisplay}
						<ul className="team-members">{teamMembers}</ul>
					</div>
					<div className="info-right">
						{teamRanking}
						{totalScore}
					</div>
				</div>
				<DashboardNav />
			</div>
		);
	}

}

function mapStateToProps({user, team, scoreboard}){
	return {user, team, scoreboard, teamRank: team.rank};
}

function mapDispatchToProps(dispatch){
	return bindActionCreators({getTeamRank}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
