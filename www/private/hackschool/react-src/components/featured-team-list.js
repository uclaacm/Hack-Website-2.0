import React, { Component } from 'react';
import { connect } from 'react-redux';
import FeaturedTeamItem from './featured-team-item';

class FeaturedTeamList extends Component{

	constructor(props){
		super(props);

		this.renderList = this.renderList.bind(this);
	}

	renderList(team){
		return <FeaturedTeamItem key={team.id}/>;
	}

	render(){
		console.log(this.props.list);
		return (
			<div>
			Featured
				{this.props.list.map(this.renderList)}
			</div>
		);
	}

}

function mapStateToProps({scoreboard}){
	return {list: scoreboard.featured}
}

export default connect(mapStateToProps)(FeaturedTeamList);