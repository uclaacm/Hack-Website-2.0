import React, { Component } from 'react';
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
		this.incrementSlide = this.incrementSlide.bind(this);

		this.onFormSubmit = this.onFormSubmit.bind(this);
	}

	incrementSlide(){
		this.setState({currentSlide: this.state.currentSlide+1});
	}

	onFormSubmit(e){
		e.preventDefault();
		//TODO: detect success/failure and render different messages
		this.incrementSlide();
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
						initialFormValue="Your team name"
						message="Give your team a name! Make sure to keep it community appropriate."
						btnText="CREATE"
						onFormSubmit={this.onFormSubmit}/>
				);
			case 'join':
				return (
					<DialogOnboardInput 
						initialFormValue="team code"
						message="Paste the team ID below"
						btnText="JOIN"
						onFormSubmit={this.onFormSubmit}/>
				);
			default:
				return <div>Something went wrong...</div>;
		}
		
	}

	renderSuccess(){
		return (
			<div>success</div>
		);
	}

	renderSlide(slideNum){
		switch(slideNum){
			case 0:
				return this.renderDefault();
			case 1:
				return this.renderFormInput();
			case 2:
				return this.renderSuccess();
			default:
				return <div>Something went wrong...</div>;
		}
	}

	render(){
		return(
			<div>
				{this.renderSlide(this.state.currentSlide)}
			</div>
		);
	}

}

export default DialogOnboard;