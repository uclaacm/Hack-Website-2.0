import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from 'underscore';
import { changeDialog } from '../actions/index';
import DialogInput from './dialog-input';

class DialogOnboard extends Component{

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
		this.renderLoading = this.renderLoading.bind(this);
		this.renderFailure = this.renderFailure.bind(this);
		
		this.incrementSlide = this.incrementSlide.bind(this);
		this.onFormSubmit = this.onFormSubmit.bind(this);
	}

	incrementSlide(num){
		if(this.state.currentSlide == 0 && num < 0)
			this.props.changeDialog({active : false});

		this.setState({currentSlide: this.state.currentSlide+num});
	}

	onFormSubmit(e){
		e.preventDefault();
		this.incrementSlide(1);
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

	renderLoading(){
		return (
			<div>Loading...</div>
		);
	}

	renderFailure(){
		return (
			<div>
				Error:<br />
				
			</div>
		);
	}

	renderSuccess(){
		switch(this.state.action){
			case 'create':
				return (
					<div className="create-success dialog-inner">
						<h3>Awesome! Your team name is</h3>
						<h3><span>{this.props.team.name}</span></h3>
						<h3>and your team ID is:</h3>
						<div className="team-id-copy">
							<p>{this.props.team.id}</p>
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
						<h3><span>{this.props.team.name}</span></h3>
						<h3>Your teammates are</h3>
						<ul className="team-members">
							{
								this.props.team.members.map(member => {
									return <li key={member.id}>{member.name}</li>;
								})
							}
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
				console.log(this.props.team)
				if(this.props.team == null)
					return this.renderLoading();
				else if (typeof this.props.team === 'string')
					return this.renderFailure();
				else
					return this.renderSuccess();
			default:
				return <div>Something went wrong...</div>;
		}
	}

	render(){
		return(
			<div>
				{
					this.state.currentSlide == 1 &&
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

function mapStateToProps({team}){
	return {team};
}

function mapDispatchToProps(dispatch){
	return bindActionCreators({changeDialog}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(DialogOnboard);