import React from 'react';
import Dialog from './dialog';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { changeDialog, triggerTeamAction } from '../../actions'; 
import DialogInput from './dialog-input';
import Loading from '../loading';

class DialogManage extends Dialog{

	constructor(props){
		super(props);

		this.state = {currentSlide: 0}

		this.renderSlide = this.renderSlide.bind(this);
		this.renderDefault = this.renderDefault.bind(this);
		this.renderConfirm = this.renderConfirm.bind(this);
		this.renderSuccess = this.renderSuccess.bind(this);
	}

	renderDefault(){
		const team = this.props.team.team;
		return (
			<div className="left-align">
				<h3>{team.name}</h3>
				<h3 className="team-id">Team ID: {team.id}</h3>
				<ul className="team-members">
					<li>{this.props.user.name} (you)</li>
					{ this.formatMembers(team.members) }
				</ul>
				<button className='leave' onClick={() => this.incrementSlide(1)}>Leave team</button>
			</div>
		);
	}

	renderConfirm(){
		const team = this.props.team.team;
		return (
			<DialogInput 
					action="LEAVE"
					initialFormValue="team name"
					message="Please confirm that you want to leave team"
					additional={team.name}
					onFormSubmit={this.onFormSubmit}
					formLabel="Type the name of your team to proceed." />
		);
	}

	renderSuccess(){
		return (
			<div className="dialog-inner">
				<h3>You have successfully left your team.</h3>
				<button className="btn-selection" onClick={() => this.props.changeDialog({onBoarding: true})}>continue</button>
			</div>
		);
	}

	renderSlide(slideNum){
		switch(slideNum){
			case 0:
				return this.renderDefault();
			case 1:
				return this.renderConfirm();
			case 2: 
				if(this.props.team.error)
					return this.renderFailure();
				else if(this.props.team.team) //team is not null yet, but no error
					return <Loading message="loading..." />
				else
					return this.renderSuccess();

			default:
				return <div>Something went wrong...lmao...</div>;
		}
	}

	incrementSlide(num){
		Dialog.prototype.incrementSlide.call(this, num, 2, this.props.triggerTeamAction);
	}

	renderFailure(){
		return Dialog.prototype.renderFailure.call(this, this.props.team.error);
	}

	render(){
		return Dialog.prototype.render.call(this, this.props.team.team); //continues back button if still in team
	}

}

function mapStateToProps({team, user, dialog}){
	return {team, user, dialog};
}

function mapDispatchToProps(dispatch){
	return bindActionCreators({changeDialog, triggerTeamAction}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(DialogManage);