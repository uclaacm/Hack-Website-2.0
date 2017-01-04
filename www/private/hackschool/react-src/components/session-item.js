import React, { Component } from 'react';

class SessionItem extends Component{

	render(){
		return(
			<div className="session-item" onClick={this.props.onClickEvent}>
				<div 	className="img-wrapper"
						style={{backgroundImage: `url(${this.props.image})`}}>
				</div>
				<div className="text-wrapper">
					<h4 className="week">Week {this.props.number}</h4>
					<h3>{this.props.title}</h3>
				</div>
				<div className="icons">
					{/*if the link is not available, don't show it's icon*/}
					{this.props.slidesLink && <span></span>}
					{this.props.videoLink && <span></span>}
					{this.props.blogPostLink && <span></span>}
					<span className="right"></span>
				</div>
			</div>
		);
	}

}

export default SessionItem;