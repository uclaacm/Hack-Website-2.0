import React from 'react';
import Dialog from './dialog';
import DialogInput from './dialog-input';
import Loading from '../loading';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { changeDialog, triggerSessionAction } from '../../actions';

class DialogAttendance extends Dialog{

	constructor(props){
		super(props);

		//this.state = {currentSlide: 0};

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
				<h3>Great! Input code verified. </h3>
				<button className="btn-selection" onClick={() => this.props.changeDialog({active: false, onBoarding: false})}>BACK TO DASHBOARD</button>
			</div>
		);
	}

	renderSlide(slideNum){
		switch(slideNum){
			case 0:
				return this.renderFormInput();
			case 1:
				if(!this.props.sessions.attend)
					return <Loading message="loading..." />;
				else if(this.props.sessions.attendSuccess)
					return this.renderSuccess();
				else
					return this.renderFailure();
			default:
				return <div>Something went wrong...</div>;
		}
	}

	incrementSlide(num){
		if(this.state.currentSlide == 1)
			this.props.triggerSessionAction('reset-attend', null);

		if(this.state.currentSlide == 0 && num < 0){
			this.props.triggerSessionAction('reset-attend', null);
			this.props.changeDialog({active: false, attendance: false});
		}

		this.setState({currentSlide: this.state.currentSlide + num});
	}

	renderFailure(){
		return Dialog.prototype.renderFailure.call(this, this.props.sessions.attend);
	}

	render(){
		return Dialog.prototype.render.call(this, !this.props.sessions.attendSuccess);
	}

}

function mapStateToProps({sessions}){
	return {sessions};
}

function mapDispatchToProps(dispatch){
	return bindActionCreators({changeDialog, triggerSessionAction}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(DialogAttendance);