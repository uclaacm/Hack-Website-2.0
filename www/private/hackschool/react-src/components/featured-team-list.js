import React, { Component } from 'react';
import { connect } from 'react-redux';
import TeamFeaturedItem from './team-featured-item';

class FeaturedTeamList extends Component{

	constructor(props){
		super(props);

		this.renderList = this.renderList.bind(this);
	}

	renderList(team, i){
		return <TeamFeaturedItem 	key={team.id}
									featured={true}
									first={i==0}
									name={team.name}
									score={team.totalScore}
									members={team.members}
									rank={i+1} />;
	}

	render(){
		//console.log('list', this.props.list);
		return (
			<div className="featured-team-list">
				{this.props.list.map(this.renderList)}
				{this.props.list.length == 0 && <div><h3>No teams yet!</h3></div>}
			</div>
		);
	}

}

function mapStateToProps({scoreboard}){
	return {list: scoreboard.featured}
}

export default connect(mapStateToProps)(FeaturedTeamList);