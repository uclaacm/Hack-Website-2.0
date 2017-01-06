import React, { Component } from 'react';
import FeaturedTeamList from './featured-team-list';
import TeamList from './team-list';


class Leaderboard extends Component{

	render() {
		return(
			<div className="leaderboard">
				<FeaturedTeamList />
				<TeamList />
			</div>
		);
	}

}

export default Leaderboard;