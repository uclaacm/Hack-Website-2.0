import React, { Component } from 'react';

class ProjectItem extends Component{

	render(){
		return (
			<div className={`row-${this.props.rowLabel} project-item`}>
				<div 	className="img-wrapper"
						style={{backgroundImage: `url(${this.props.image})`}}>
				</div>
				<div className="text-wrapper">
					<div className="title-wrapper">
						<h3>{this.props.title}</h3>
					</div>
					<ul>
						{this.props.contributors.map(c => <li key={c}>{c}</li>)}
					</ul>
					<button onClick={this.props.onClickEvent}>SEE THIS PROJECT</button>
				</div>
			</div>
		);
	}
}

export default ProjectItem;