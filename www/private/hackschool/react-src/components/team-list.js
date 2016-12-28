import React, { Component } from 'react';
import { connect } from 'react-redux';
import TeamItem from './team-item';

class TeamList extends Component{

	constructor(props){
		super(props);

		this.renderList = this.renderList.bind(this);
	}

	renderList(team){
		return <TeamItem key={team.id}/>;
	}

	render(){
		console.log(this.props.list);
		return (
			<div>
			List
				{this.props.list.map(this.renderList)}
			</div>
		);
	}

}

function mapStateToProps({scoreboard}){
	return {list: scoreboard.list}
}

export default connect(mapStateToProps)(TeamList);