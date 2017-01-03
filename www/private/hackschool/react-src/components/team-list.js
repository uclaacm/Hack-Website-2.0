import React, { Component } from 'react';
import { connect } from 'react-redux';
import TeamItem from './team-item';

class TeamList extends Component{

	constructor(props){
		super(props);

		this.renderList = this.renderList.bind(this);
	}

	renderList(team, i){
		const highest = 4;
		return <TeamItem 	key={team.id}
							featured={false}
							first={false}
							name={team.name}
							score={team.totalScore}
							members={team.members}
							rank={i + highest} />;
	}

	render(){
		console.log(this.props.list);
		return (
			<div className="team-list">
				<table>
					<tbody>
					<tr>
						<th>MEMBERS</th>
						<th>TEAM NAME</th>
						<th>POINTS</th>
					</tr>
						{/*this.props.list.map(this.renderList)*/}
					</tbody>
				</table>
			</div>
		);
	}

}

function mapStateToProps({scoreboard}){
	return {list: scoreboard.list}
}

export default connect(mapStateToProps)(TeamList);