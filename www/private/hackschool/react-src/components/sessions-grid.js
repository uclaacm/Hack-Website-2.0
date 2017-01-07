import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { selectSession } from '../actions/index';
import SessionItem from './session-item';

class SessionsGrid extends Component{

	constructor(props){
		super(props);

		this.renderRow = this.renderRow.bind(this);
		this.renderSession = this.renderSession.bind(this);
		this.onSelect = this.onSelect.bind(this);
	}

	onSelect(session){	
		this.props.selectSession(session);
	}

	renderSession(session, row, column){
		//if the link is not available, don't show its icon
		const slidesLink = session.slidesLink == "" ? false : true;
		const videoLink = session.videoLink == "" ? false : true;
		const blogPostLink = session.blogPostLink == "" ? false : true;
		
		return (
			<td 	className	= "project-td"
					key			= { session.id }>
				
				<SessionItem row 			= { row }
							 col 			= { column }
							 title			= { session.name }
							 number			= { session.number }
							 image			= { session.image }
							 onClickEvent	= { () => this.onSelect(session) }
							 project 		= { session.project }
							 slidesLink		= { slidesLink }
							 videoLink		= { videoLink }
							 blogPostLink	= { blogPostLink } />
			</td>
		);
	}

	renderRow(row, rowNum){
		return (
			<tr className="row" key={`row-${row[0].id}`} >
				{row.map((proj, colNum) => this.renderSession(proj, rowNum, colNum%4))}
			</tr>
		);
	}

	render(){
		return (
			<div className="grid-wrapper">
				<table className="grid">
					<tbody>
						{this.props.sessions.map((row, rowNum) => this.renderRow(row, rowNum))}
					</tbody>
				</table>
			</div>
		);
	}

}

function mapStateToProps({sessions}){
	return {sessions};
}

function mapDispatchToProps(dispatch){
	return bindActionCreators({selectSession}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SessionsGrid);