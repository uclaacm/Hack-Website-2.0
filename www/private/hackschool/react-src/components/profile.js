import React, { Component } from 'react';
import { connect } from 'react-redux';
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
					.map(member => <li key={member.id}>
										<div	className="team-profile-pic shadow"></div>
										<div 	className="team-profile-pic"
												style={{backgroundImage: `url(${member.profilePicture})`}}></div>
									</li>);

	}

	render(){
		const teamDisplay 	= this.props.team ? <h4 className="team">Team {this.props.team.name}</h4> : <h4 className="team">Not on a team</h4>
		const teamMembers 	= this.props.team ? this.formatOtherMembers(this.props.team.members) : null;

		const teamRanking 	= this.props.team 
								? 	<div>
										<h3>TEAM RANKING</h3>
										<h3 className="number">0</h3>
									</div>
								: null;
		const totalScore 	= this.props.team 
								? 	<div>
										<h3>TOTAL POINTS</h3>
										<h3 className="number">{this.props.team.totalScore}</h3>
									</div>
								: null;

		return(
			<div>
				<div className="profile">
					<div	className="profile-pic shadow"></div>
					<div 	className="profile-pic main"
							style={{backgroundImage: `url(${this.props.user.profilePicture})`}}></div>
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

function mapStateToProps({user, team}){
	return {user, team: team.team};
}

export default connect(mapStateToProps)(Profile);