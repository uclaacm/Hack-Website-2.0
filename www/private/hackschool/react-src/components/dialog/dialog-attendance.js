import React from 'react';
import Dialog from './dialog';
import DialogInput from './dialog-input';
import Loading from '../loading';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { changeDialog, triggerTeamAction } from '../../actions';

class DialogAttendance extends Dialog{

	constructor(props){
		super(props);

		this.state = {
			currentSlide: 0
		};

		this.renderSlide = this.renderSlide.bind(this);
		this.renderFormInput = this.renderFormInput.bind(this);
		this.renderSuccess = this.renderSuccess.bind(this);
	}

	renderFormInput(){
		return <DialogInput
						action="attend" 
						initialFormValue="ATTENDANCE CODE"
						message="Enter the attendance code."
						onFormSubmit={this.onFormSubmit}/>;
	}

	renderSuccess(){
		//if we reach here, can assume this.props.team.team is defined
		return (
			<div className="create-success dialog-inner">
				<h3>Great! Input code verified.</h3>
				<button className="btn-selection" onClick={() => this.props.changeDialog({active: false, onBoarding: false})}>BACK TO DASHBOARD</button>
			</div>
		);
	}

	renderSlide(slideNum){
		switch(slideNum){
			case 0:
				return this.renderFormInput();
			case 1:
				if(!this.props.sessions)
					return <Loading message="loading..." />;
				else if(this.props.sessions.attendSuccess)
					return this.renderSuccess();
				else
					return (<div className="dialog-inner">
								<h3>Error:</h3>
								<h3>{this.props.sessions.attend}</h3>
							</div>);
			default:
				return <div>Something went wrong...</div>;
		}
	}

	/*incrementSlide(num){
		Dialog.prototype.incrementSlide.call(this, num, 1, this.props.triggerTeamAction);
	}*/

	incrementSlide(num){
		if(this.state.currentSlide == 1)
			this.props.triggerTeamAction('reset-error', null);

		if(this.state.currentSlide == 0 && num < 0)
			this.props.changeDialog({active: false, attendance: false});

		this.setState({currentSlide: this.state.currentSlide + num});
	}

	renderFailure(){
		return Dialog.prototype.renderFailure.call(this, this.props.team.error);
	}

	render(){
		return Dialog.prototype.render.call(this, !this.props.sessions.attendSuccess);
		//return <div>Attendance</div>;
	}

}

function mapStateToProps({sessions}){
	return {sessions};
}

function mapDispatchToProps(dispatch){
	return bindActionCreators({changeDialog, triggerTeamAction}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(DialogAttendance);