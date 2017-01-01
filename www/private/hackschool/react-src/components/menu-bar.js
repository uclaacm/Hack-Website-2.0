import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { changeDialog } from '../actions/index';
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
				<button onClick=""><span>SIGN OUT</span></button>
				<button onClick={this.toggleDialog}><span>MANAGE TEAM</span></button>
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