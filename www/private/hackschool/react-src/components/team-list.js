import React, { Component } from 'react';
import { connect } from 'react-redux';
import TeamGridItem from './team-grid-item';

class TeamList extends Component{

	constructor(props){
		super(props);

		this.renderList = this.renderList.bind(this);
	}

	renderList(team, i){
		const highest = 4;
		return <TeamGridItem 	key={team.id}
								name={team.name}
								score={team.totalScore}
								members={team.members}
								rank={i + highest} />;
	}

	render(){
		console.log(this.props.list);
		return (
			<div>
			{this.props.list.length != 0 && 
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
			}
			</div>
		);
	}

}

function mapStateToProps({scoreboard}){
	return {list: scoreboard.list}
}

export default connect(mapStateToProps)(TeamList);