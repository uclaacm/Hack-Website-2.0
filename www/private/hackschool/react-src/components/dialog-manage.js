import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { changeDialog } from '../actions/index'; 
import DialogInput from './dialog-input';

class DialogManage extends Component{

	constructor(props){
		super(props);

		this.state = {currentSlide: 0}

		this.incrementSlide = this.incrementSlide.bind(this);
		this.formatMembers = this.formatMembers.bind(this);
		this.renderSlide = this.renderSlide.bind(this);
		this.renderDefault = this.renderDefault.bind(this);
		this.renderConfirm = this.renderConfirm.bind(this);
		this.renderFailure = this.renderFailure.bind(this);
		this.renderSuccess = this.renderSuccess.bind(this);
		this.onFormSubmit = this.onFormSubmit.bind(this);
	}

	incrementSlide(num){
		if(this.state.currentSlide == 0 && num < 0)
			this.props.changeDialog({active : false});

		this.setState({currentSlide: this.state.currentSlide+num});
	}

	formatMembers(members){
		return members.map(member => {
			return <li key={member.id}>{member.name}</li>;
		});
	}

	onFormSubmit(e){
		e.preventDefault();
		this.incrementSlide(1);
	}

	renderDefault(){
		return (
			<div>
				Team name: {this.props.team.name}
				<br />
				Team id: {this.props.team.id}
				<br />
				<ul>{this.formatMembers(this.props.team.members)}</ul>
				<button onClick={() => this.incrementSlide(1)}>Leave team</button>
			</div>
		);
	}

	renderConfirm(){
		return (
			<DialogInput 
					action="LEAVE"
					initialFormValue=""
					message="Please confirm that you want to leave team"
					onFormSubmit={this.onFormSubmit} />
		);
	}

	renderSuccess(){
		console.log(this.props.team)
		return (
			<div>
				You have successfully left your team.
				<button onClick={() => this.props.changeDialog({onBoarding: true})}>continue</button>
			</div>
		);
	}

	renderFailure(){
		return (
			<div>
				Error: <br />
				{this.props.team.error}
				<button onClick={() => this.props.changeDialog({active: false, onBoarding: false})}>BACK TO DASHBOARD</button>
			</div>
		);
	}

	renderSlide(slideNum){
		switch(slideNum){
			case 0:
				return this.renderDefault();
			case 1:
				return this.renderConfirm();
			case 2://TODO: account for async request
				return this.props.team ? this.renderFailure() : this.renderSuccess();
			default:
				return <div>Something went wrong...lmao...</div>;
		}
	}

	render(){
		return (
			<div>
				{this.state.currentSlide != 2 && <button onClick={() => this.incrementSlide(-1)}>back</button>}
				{this.renderSlide(this.state.currentSlide)}
			</div>
		);
	}

}

function mapStateToProps({team}){
	return {team};
}

function mapDispatchToProps(dispatch){
	return bindActionCreators({changeDialog}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(DialogManage);