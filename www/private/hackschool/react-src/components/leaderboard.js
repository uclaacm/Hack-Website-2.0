import React from 'react';
import FeaturedTeamList from './featured-team-list';
import TeamList from './team-list';

export default function Leaderboard(){

	return(
		<div>
			<FeaturedTeamList />
			<TeamList />
		</div>
	);

}