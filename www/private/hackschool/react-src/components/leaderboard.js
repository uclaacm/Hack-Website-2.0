import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchScoreboard } from '../actions/index';

import FeaturedTeamList from './featured-team-list';
import TeamList from './team-list';


class Leaderboard extends Component{

	componentWillMount(){
		this.props.fetchScoreboard('/hackschool/scoreboard');
	}

	render() {
		return(
			<div>
				<FeaturedTeamList />
				<TeamList />
			</div>
		);
	}

}


function mapDispatchToProps(dispatch){
	return bindActionCreators({fetchScoreboard}, dispatch);
}

export default connect(null, mapDispatchToProps)(Leaderboard);