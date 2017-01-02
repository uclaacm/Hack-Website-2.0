import React, { Component } from 'react';
import { connect } from 'react-redux';
import TeamItem from './team-item';

class FeaturedTeamList extends Component{

	constructor(props){
		super(props);

		this.renderList = this.renderList.bind(this);
	}

	renderList(team, i){
		return <TeamItem 	key={team.id}
							featured={true}
							first={i==0}
							name={team.name}
							score={team.totalScore}
							members={team.members}
							rank={i+1} />;
	}

	render(){
		return (
			<div className="featured-team-list">
				{this.props.list.map(this.renderList)}
			</div>
		);
	}

}

function mapStateToProps({scoreboard}){
	return {list: scoreboard.featured}
}

export default connect(mapStateToProps)(FeaturedTeamList);