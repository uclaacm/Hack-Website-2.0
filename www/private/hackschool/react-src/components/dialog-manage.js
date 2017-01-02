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
		return members
				.filter(member => member.name.toUpperCase() != this.props.user.name.toUpperCase())
				.map(member => {
					return <li key={member.id}><span>{member.name}</span></li>;
				});
	}

	onFormSubmit(e){
		e.preventDefault();
		this.incrementSlide(1);
	}

	renderDefault(){
		return (
			<div className="left-align">
				<h3>{this.props.team.name}</h3>
				<h3 className="team-id">Team ID: {this.props.team.id}</h3>
				<ul className="team-members">
					<li>{this.props.user.name} (you)</li>
					{this.formatMembers(this.props.team.members)}
				</ul>
				<button className='leave' onClick={() => this.incrementSlide(1)}>Leave team</button>
			</div>
		);
	}

	renderConfirm(){
		return (
			<DialogInput 
					action="LEAVE"
					initialFormValue="team name"
					message="Please confirm that you want to leave team"
					additional={this.props.team.name}
					onFormSubmit={this.onFormSubmit}
					formLabel="Type the name of your team to proceed." />
		);
	}

	renderSuccess(){
		console.log(this.props.team)
		return (
			<div className="dialog-inner">
				<h3>You have successfully left your team.</h3>
				<button className="btn-selection" onClick={() => this.props.changeDialog({onBoarding: true})}>continue</button>
			</div>
		);
	}

	renderFailure(){
		return (
			<div className="dialog-inner">
				<h3>Sorry,</h3>
				<h3>{this.props.team.error}</h3>
				<button className="btn-selection" onClick={() => this.props.changeDialog({active: false, onBoarding: false})}>BACK TO DASHBOARD</button>
			</div>
		);
	}

	renderSlide(slideNum){
		switch(slideNum){
			case 0:
				return this.renderDefault();
			case 1:
				return this.renderConfirm();
			case 2://TODO: account for async request, display loading
				return this.props.team ? this.renderFailure() : this.renderSuccess();
			default:
				return <div>Something went wrong...lmao...</div>;
		}
	}

	render(){
		return (
			<div>
				{
					this.state.currentSlide != 2 && 
					<button className="back" 
							onClick={() => this.incrementSlide(-1)}>
							<img src="/common/images/chevron-left.svg" />
					</button>
				}
				{this.renderSlide(this.state.currentSlide)}
			</div>
		);
	}

}

function mapStateToProps({team, user}){
	return {team, user};
}

function mapDispatchToProps(dispatch){
	return bindActionCreators({changeDialog}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(DialogManage);