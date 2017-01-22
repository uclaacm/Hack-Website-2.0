import React, { Component } from 'react';
import { connect } from 'react-redux';
import TeamItem from './team-item';

class TeamList extends Component{

	constructor(props){
		super(props);

		this.renderList = this.renderList.bind(this);
	}

	renderList(team, i){
		return <TeamItem 	key={team.id}
							name={team.name}
							score={team.totalScore}
							members={team.members}
							rank={team.rank} />;
	}

	render(){
		if (this.props.list.length != 0)
			return (
				<div className="team-list">
					<div className="gradient"></div>
						<table>
							<thead>
								<tr>
									<th></th>
									<th>MEMBERS</th>
									<th>TEAM NAME</th>
									<th>POINTS</th>
								</tr>
								</thead>
							<tbody>
							{this.props.list.map(this.renderList)}
							</tbody>
						</table>
					</div>
			);

		return null;
	}

}

function mapStateToProps({scoreboard}){
	return {list: scoreboard.list}
}

export default connect(mapStateToProps)(TeamList);
