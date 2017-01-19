import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { changeDialog } from '../actions';
import DialogBox from './dialog/dialog-box';

class MenuBar extends Component{

	constructor(props){
		super(props);

		this.activateDialog = this.activateDialog.bind(this);
		this.activateAttendance = this.activateAttendance.bind(this);
	}

	activateDialog(){
		this.props.changeDialog({active: true});
	}

	activateAttendance(){
		this.activateDialog();
		this.props.changeDialog({attendance: true});
	}

	render(){
		return (
			<div>
				<div className="dashboard-menu desktop">
					<a href="" className="hack-dash">HACKSCHOOL DASHBOARD</a>
					<a href="/auth/logout">
						<button><i className="fa fa-power-off" ariaHidden="true"></i> SIGN OUT</button>
					</a>
					<button onClick={this.activateDialog}><i className="fa fa-user" ariaHidden="true"></i> MANAGE TEAM</button>
					<button onClick={this.activateAttendance}><i className="fa fa-calendar-o" ariaHidden="true"></i> ATTENDANCE</button>
				</div>
				<div className="dashboard-menu mobile">
					<a href="" className="hack-dash">HACKSCHOOL</a>
					<a className="menu-hover">
						<button>MENU</button>
					</a>
					<div className="dropdown">
						<a href="/auth/logout">
							<button><i className="fa fa-power-off" ariaHidden="true"></i> SIGN OUT</button>
						</a>
						<button onClick={this.activateDialog}><i className="fa fa-user" ariaHidden="true"></i> MANAGE TEAM</button>
						<button onClick={this.activateAttendance}><i className="fa fa-calendar-o" ariaHidden="true"></i> ATTENDANCE</button>
					</div>
				</div>
			</div>
		);
	}

}

function mapStateToProps({user, dialog}){
	return {user, dialog};
}

function mapDispatchToProps(dispatch){
	return bindActionCreators({changeDialog}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(MenuBar);