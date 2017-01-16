import React, { Component } from 'react';

class TeamGridItem extends Component{

	constructor(props){
		super(props);

		this.formatMembers = this.formatMembers.bind(this);
	}

	formatMembers(members){
		return members.map(member => {
			return (
				<li key={member.id}
					className="team-profile-pic"
					style={{backgroundImage: `url(${member.profilePicture.small})`}}>
				</li>
			);
		});
	}

	render(){
		return (
			<tr className="team-item">
				<td>
					{this.props.rank}
				</td>
				<td>
					<ul>{this.formatMembers(this.props.members)}</ul>
				</td>
				<td>
					<p>{this.props.name}</p>
				</td>
				<td>
					<p>{this.props.score}</p>
				</td>
			</tr>
		);
	}

}

export default TeamGridItem;
