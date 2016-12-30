import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { selectSlide } from '../actions/index';

class DashboardNav extends Component{

	render(){
		return (
			<div>	
				<button onClick={() => this.props.selectSlide('sessions')}>SESSIONS</button>
				{this.props.currentSlide == 'sessions' && <span>selected</span>}
				<br />
				<button onClick={() => this.props.selectSlide('leaderboard')}>LEADERBOARD</button>
				{this.props.currentSlide == 'leaderboard' && <span>selected</span>}
			</div>
		);
	}

}

function mapStateToProps({currentSlide}){
	return {currentSlide};
}


function mapDispatchToProps(dispatch){
	return bindActionCreators({selectSlide}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(DashboardNav);