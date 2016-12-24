import React from 'react';

export default function ProjectItem(props){
	return (
		<div className="project-item">
			<div 	className="img-wrapper"
					style={{backgroundImage: `url(${props.image})`}}>
			</div>
			<div className="text-wrapper">
				<div className="title-wrapper">
					<h3>{props.title}</h3>
				</div>
				<ul>
					{props.contributors.map(c => <li key={c}>{c}</li>)}
				</ul>
				<button onClick={props.onClickEvent}>SEE THIS PROJECT</button>
			</div>
		</div>
	);

}
