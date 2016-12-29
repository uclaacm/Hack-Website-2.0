import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createTeam, joinTeam, leaveTeam } from '../actions/index';

class DialogOnboardInput extends Component{

	constructor(props){
		super(props);

		this.state = {term: this.props.initialFormValue};

		this.onInputChange = this.onInputChange.bind(this);
		this.onFormSubmit = this.onFormSubmit.bind(this);
	}

	onInputChange(value){
		this.setState({ term: value });
	}

	onFormSubmit(e){
		switch(this.props.action){
			case 'CREATE':
				this.props.createTeam(this.state.term);
				break;
			case 'JOIN':
				this.props.joinTeam(this.state.term);
				break;
			case 'LEAVE':
				const input = this.state.term == this.props.team.name ? this.state.term : false;
				this.props.leaveTeam(input);
				break;
		}
			
		this.props.onFormSubmit(e);
	}

	render(){
		
		return (
			<div>
				<span>{this.props.message}</span>
				<form onSubmit={this.onFormSubmit}>
					<input 	type="text"
							value={this.state.term}
							onChange={e => this.onInputChange(e.target.value)} />
					<button type="submit">{this.props.action}</button>
				</form>
			</div>
		);
	}

}

function mapStateToProps({team}){
	return {team};
}

function mapDispatchToProps(dispatch){
	return bindActionCreators({createTeam, joinTeam, leaveTeam}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(DialogOnboardInput);