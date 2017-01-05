import React, { Component } from 'react';

class TeamFeaturedItem extends Component{

	constructor(props){
		super(props);

		this.formatNumber = this.formatNumber.bind(this);
		this.formatMembers = this.formatMembers.bind(this);
	}

	formatNumber(number){
		switch(number){
			case 1:
				return '1st';
			case 2:
				return '2nd';
			case 3:
				return '3rd';
			default:
				return number;
		}
	}

	formatMembers(members){
		return members.map(member => {
			return (
				<li key={member.id}
					className="team-profile-pic"
					style={{backgroundImage: `url(${member.profilePicture})`}}>
				</li>
			);
		});
	}

	render(){
		return (
			<div className="team-item-featured team-item">
				<div>
					<h2 className="hl">{this.formatNumber(this.props.rank)}</h2>
					<ul>{this.formatMembers(this.props.members)}</ul>
				</div>
				
				<h3>{this.props.name}</h3>
				<h3 className="hl-grey">{this.props.score} points</h3>
			</div>
		);
	}

}

export default TeamFeaturedItem;