import React from 'react';

export default function ProjectItem(props){
	return (
		<div>
			Title: {props.title}
			<br />
			Contributors: {props.contributors.map(c => `${c} `)}
			<br />
			Image: <img src={props.image} />
		</div>
	);

}
