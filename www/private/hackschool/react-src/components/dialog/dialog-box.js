import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { changeDialog } from '../../actions';

import DialogAttendance from './dialog-attendance';
import DialogOnboard from './dialog-onboard';
import DialogManage from './dialog-manage';

class DialogBox extends Component{

	constructor(props){
		super(props);

		this.state = {triggerOnboard: null};
	}

	componentWillMount(){
		if(!this.props.team) //team is null, trigger onboarding
			this.props.changeDialog({onBoarding: true});
		else
			this.props.changeDialog({onBoarding: false});
	}

	componentWillReceiveProps(props){
		this.setState({triggerOnboard: props.dialog.onBoarding});
	}

	render(){
		if(this.state.triggerOnboard == null)
			return null;

		let dialogBox;
		if(this.props.dialog.attendance)
			dialogBox = <DialogAttendance />
		else
			dialogBox = this.state.triggerOnboard
							? <DialogOnboard />
							: <DialogManage />;
		return(
			<div className="dialog-box-wrapper">
				<div className="dialog-box">
					{dialogBox}
				</div>
			</div>
		);

	}

}

function mapStateToProps({dialog, team}){
	return {dialog, team: team.team};
}

function mapDispatchToProps(dispatch){
	return bindActionCreators({changeDialog}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(DialogBox);