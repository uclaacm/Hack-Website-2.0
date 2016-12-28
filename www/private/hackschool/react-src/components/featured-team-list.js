import React, { Component } from 'react';
import { connect } from 'react-redux';
import FeaturedTeamItem from './featured-team-item';

class FeaturedTeamList extends Component{

	render(){

		return (
			<div>
				Feature team list
				<FeaturedTeamItem />
			</div>
		);
	}

}

function mapStateToProps({scoreboard}){
	return {list: scoreboard.featured}
}

export default connect(mapStateToProps)(FeaturedTeamList);