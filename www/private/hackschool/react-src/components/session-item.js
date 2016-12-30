import React, { Component } from 'react';

class SessionItem extends Component{

	render(){
		return(
			<div>
				<button onClick={this.props.onClickEvent}>select</button>
				Week {this.props.number}
				<br />
				Title: {this.props.title}
			</div>
		);
	}

}

export default SessionItem;