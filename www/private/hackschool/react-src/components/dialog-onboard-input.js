import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createTeam } from '../actions/index';

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
		this.props.createTeam(this.state.term);
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
					<button type="submit">{this.props.btnText}</button>
				</form>
			</div>
		);
	}

}

function mapStateToProps({team}){
	return {team};
}

function mapDispatchToProps(dispatch){
	return bindActionCreators({createTeam}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(DialogOnboardInput);