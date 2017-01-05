import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { triggerTeamAction } from '../actions';

class DialogOnboardInput extends Component{

	constructor(props){
		super(props);

		this.state = {term: ''};

		this.onInputChange = this.onInputChange.bind(this);
		this.onFormSubmit = this.onFormSubmit.bind(this);
	}

	onInputChange(value){
		this.setState({ term: value });
	}

	onFormSubmit(e){
		const action = this.props.action.toLowerCase();

		let userInput = this.state.term;
		if(action == 'leave' && this.state.term != this.props.team.name)
			userInput = null;
		this.props.triggerTeamAction(action, userInput);
		this.props.onFormSubmit(e);
	}

	render(){

		const additional = <span>{this.props.additional}</span>;
		const label = <label>{this.props.formLabel}</label>;
		
		return (
			<div className="dialog-inner">
				<h3>{this.props.message}</h3>
				<h3 className="hl">{additional}</h3>
				<form onSubmit={this.onFormSubmit}>
					<input 	type="text"
							value={this.state.term}
							placeholder={this.props.initialFormValue}
							onChange={e => this.onInputChange(e.target.value)} />
					{label}
					<button className="btn-action" type="submit">{this.props.action}</button>
				</form>
			</div>
		);
	}

}

function mapStateToProps({team}){
	return {team: team.team};
}

function mapDispatchToProps(dispatch){
	return bindActionCreators({triggerTeamAction}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(DialogOnboardInput);