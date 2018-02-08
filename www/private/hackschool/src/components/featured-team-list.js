import React, { Component } from 'react';
import { connect } from 'react-redux';
import FeaturedTeamItem from './featured-team-item';

class FeaturedTeamList extends Component{

	constructor(props){
		super(props);

		this.renderList = this.renderList.bind(this);
	}

	renderList(team){
		return <FeaturedTeamItem 	key={team.id}
									featured={true}
									name={team.name}
									score={team.totalScore}
									members={team.members}
									rank={team.rank} />;
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