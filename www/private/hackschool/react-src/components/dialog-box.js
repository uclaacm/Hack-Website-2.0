import React, { Component } from 'react';
import { connect } from 'react-redux';
import DialogOnboard from './dialog-onboard';
import DialogManage from './dialog-manage';


class DialogBox extends Component{

	render(){
		const dialogBox = this.props.dialog.onBoarding ? <DialogOnboard /> : <DialogManage />;
		return(
			<div>
				{dialogBox}
			</div>
		);

	}

}

function mapStateToProps({dialog}){
	return {dialog};
}

export default connect(mapStateToProps)(DialogBox);