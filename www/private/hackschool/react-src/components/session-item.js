import React, { Component } from 'react';

class SessionItem extends Component{

	render(){
		return(
			<div className="session-item" onClick={this.props.onClickEvent}>
				<div 	className="img-wrapper"
						style={{backgroundImage: `url(${this.props.image})`}}>
				</div>
				<div className="text-wrapper">
					<h4>Week {this.props.number}</h4>
					<h3>{this.props.title}</h3>
				</div>
				<div className="icons"></div>
			</div>
		);
	}

}

export default SessionItem;