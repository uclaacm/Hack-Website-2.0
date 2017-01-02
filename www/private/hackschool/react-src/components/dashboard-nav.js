import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { selectSlide } from '../actions/index';

class DashboardNav extends Component{

	render(){
		return (
			<div className="dashboard-nav">	
				<button onClick={() => this.props.selectSlide('sessions')}>
					{this.props.currentSlide == 'sessions' && <div className="select"></div>}
					{this.props.currentSlide != 'sessions' && <div className="no-select"></div>}
					<h3>SESSIONS</h3>
				</button>
				<button onClick={() => this.props.selectSlide('leaderboard')}>
					{this.props.currentSlide == 'leaderboard' && <div className="select"></div>}
					{this.props.currentSlide != 'leaderboard' && <div className="no-select"></div>}
					<h3>LEADERBOARD</h3>
				</button>
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