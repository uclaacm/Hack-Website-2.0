import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchUser } from '../actions/index';

import MenuBar from './menu-bar';
import Leaderboard from './leaderboard';
import DialogBox from './dialog-box';

class Dashboard extends Component{

	componentWillMount(){
		this.props.fetchUser('/hackschool/user');
	}

	render() {

		return (
			<div>
				{ this.props.dialog.active && <DialogBox /> }
				<MenuBar />
				<Leaderboard />
			</div>
		);
	}
}

function mapStateToProps({dialog}){
	return {dialog};
}

function mapDispatchToProps(dispatch){
	return bindActionCreators({fetchUser}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);