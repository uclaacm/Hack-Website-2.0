import React, { Component } from 'react';
import { connect } from 'react-redux';
import TeamItem from './team-item';

class TeamList extends Component{

	render(){

		return (
			<div>
				team list
				<TeamItem />
			</div>
		);
	}

}

function mapStateToProps({scoreboard}){
	return {list: scoreboard.list}
}

export default connect(mapStateToProps)(TeamList);