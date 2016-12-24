import React from 'react';

export default function ProjectItem(props){
	return (
		<div>
			<div className="img-wrapper" style={{backgroundImage: `url(${props.image})`}}>
			</div>
			<div className="text-wrapper">
				Title: {props.title}
				<br />
				Contributors: {props.contributors.map(c => `${c} `)}
				<br />
			</div>
		</div>
	);

}
