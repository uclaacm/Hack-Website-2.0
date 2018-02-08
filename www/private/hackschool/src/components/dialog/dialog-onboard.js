import React from 'react';
import Dialog from './dialog';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from 'underscore';
import { changeDialog, triggerTeamAction } from '../../actions';
import DialogInput from './dialog-input';
import Loading from '../loading';

class DialogOnboard extends Dialog{

	constructor(props){
		super(props);

		this.state = {
			currentSlide: 0,
			action: null, //'create' or 'join'
		};

		this.renderSlide = this.renderSlide.bind(this);
		this.renderDefault = this.renderDefault.bind(this);
		this.renderFormInput = this.renderFormInput.bind(this);
		this.renderSuccess = this.renderSuccess.bind(this);
	}

	renderDefault(){
		return(
				<div className="dialog-inner">
					<h3>You&apos;re not on a team yet.</h3>
					<h3>You can:</h3>
					<button className="btn-selection" onClick={() => this.setState({currentSlide: 1, action: 'create'})}>
						create a team
					</button>
					<h3 className="or">or</h3>
					<button className="btn-selection" onClick={() => this.setState({currentSlide: 1, action: 'join'})}>
						join a team
					</button>
				</div>
			);
	}

	renderFormInput(){
		switch(this.state.action){
			case 'create':
				return (
					<DialogInput
						action="CREATE" 
						initialFormValue="Your team name"
						message="Give your team a name! Make sure to keep it community appropriate."
						onFormSubmit={this.onFormSubmit}/>
				);
			case 'join':
				return (
					<DialogInput 
						action="JOIN"
						initialFormValue="team code"
						message="Paste the team ID below."
						onFormSubmit={this.onFormSubmit}/>
				);
			default:
				return <div>Something went wrong...</div>;
		}
	}

	renderSuccess(){
		//if we reach here, can assume this.props.team.team is defined
		const team = this.props.team.team;
		switch(this.state.action){
			case 'create':
				return (
					<div className="create-success dialog-inner">
						<h3>Awesome! Your team name is</h3>
						<h3><span className="hl">{team.name}</span></h3>
						<h3>and your team ID is:</h3>
						<div className="team-id-copy">
							<p>{team.id}</p>
						</div>
						<div className="notice">
							<p>Make sure to share this ID with your teammates. You can access it anytime by clicking &quot;Manage Team&quot;.</p>
						</div>
						<button className="btn-selection" onClick={() => this.props.changeDialog({active: false, onBoarding: false})}>BACK TO DASHBOARD</button>
					</div>
				);
			case 'join':
				return (
					<div className="dialog-inner">
						<h3>Great! You&apos;ve joined team</h3>
						<h3><span className="hl">{team.name}</span></h3>
						<h3>Your teammates are</h3>
						<ul className="team-members">
							{ this.formatMembers(team.members) }
						</ul>
						<br />
						<button className="btn-selection" onClick={() => this.props.changeDialog({active: false, onBoarding: false})}>BACK TO DASHBOARD</button>
					</div>
				);
			default:
				return <div>Something went wrong...</div>;
		}
	}

	renderSlide(slideNum){
		switch(slideNum){
			case 0: 
				return this.renderDefault();
			case 1:
				return this.renderFormInput();
			case 2:
				if(this.props.team.error)
					return this.renderFailure();
				else if(this.props.team.team)
					return this.renderSuccess();					
				else //team is null, and no error
					return <Loading message="loading..." />
			default:
				return <div>Something went wrong...</div>;
		}
	}

	incrementSlide(num){
		Dialog.prototype.incrementSlide.call(this, num, 2, this.props.triggerTeamAction);
	}

	renderFailure(){
		return Dialog.prototype.renderFailure.call(this, this.props.team.error);
	}

	render(){
		return Dialog.prototype.render.call(this,!this.props.team.team); //continues back button if not in team
	}

}

function mapStateToProps({team, user}){
	return {team, user};
}

function mapDispatchToProps(dispatch){
	return bindActionCreators({changeDialog, triggerTeamAction}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(DialogOnboard);