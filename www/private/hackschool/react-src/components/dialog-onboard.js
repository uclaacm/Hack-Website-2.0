import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from 'underscore';
import { changeDialog } from '../actions/index';
import DialogOnboardInput from './dialog-onboard-input';

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
				<div>
					<span>You&apos;re not on a team yet. You can:</span>
					<button onClick={() => this.setState({currentSlide: 1, action: 'create'})}>
						create a team
					</button>
					<span>or</span>
					<button onClick={() => this.setState({currentSlide: 1, action: 'join'})}>
						join a team
					</button>
				</div>
			);
	}

	renderFormInput(){
		switch(this.state.action){
			case 'create':
				return (
					<DialogOnboardInput
						action="CREATE" 
						initialFormValue="Your team name"
						message="Give your team a name! Make sure to keep it community appropriate."
						onFormSubmit={this.onFormSubmit}/>
				);
			case 'join':
				return (
					<DialogOnboardInput 
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
					<div>
						<span>Awesome! Your team name is</span>
						<br />
						<span>{this.props.team.name}</span>
						<br />
						<span>and your team ID is:</span>
						<br />
						<span>{this.props.team.id}</span>
						<br />
						<span>Make sure to share this ID with your teammates. You can access it anytime by clicking &quot;Manage Team&quot;.</span>
						<br />
						<button onClick={() => this.props.changeDialog({active: false, onBoarding: false})}>BACK TO DASHBOARD</button>
					</div>
				);
			case 'join':
				return (
					<div>
						<span>Great! You&apos;ve joined team</span>
						<br />
						<span>{this.props.team.name}</span>
						<br />
						<span>Your teammates are</span>
						<br />
						<ul>{this.props.team.members.map(m => `${m.name} `)}</ul>
						<br />
						<button onClick={() => this.props.changeDialog({active: false, onBoarding: false})}>BACK TO DASHBOARD</button>
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
				if(_.isEmpty(this.props.team))
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

export default connect(mapStateToProps, mapDispatchToProps)(DialogOnboard);