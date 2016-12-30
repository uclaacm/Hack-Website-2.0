import React from 'react';

export default function TeamItem(props){

	return(
		<div>
			Rank: {props.rank}
			<br />
			Members: {props.members.map(member => `${member.name} `)}
			<br />
			Total score: {props.score}
		</div>
	);

}