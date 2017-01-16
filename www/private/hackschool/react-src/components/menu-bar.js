import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { changeDialog } from '../actions';
import DialogBox from './dialog-box';

class MenuBar extends Component{

	constructor(props){
		super(props);

		this.toggleDialog = this.toggleDialog.bind(this);
	}

	toggleDialog(){
		this.props.changeDialog({active : true});
	}

	render(){
		
		return (
			<div className="dashboard-menu">
				<p>HACKSCHOOL DASHBOARD</p>
				<a href="/auth/logout">
					<button><i className="fa fa-power-off" ariaHidden="true"></i> SIGN OUT</button>
				</a>
				<button onClick={this.toggleDialog}><i className="fa fa-user" ariaHidden="true"></i> MANAGE TEAM</button>
				<button onClick=""><i className="fa fa-calendar-o" ariaHidden="true"></i> ATTENDANCE</button>
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