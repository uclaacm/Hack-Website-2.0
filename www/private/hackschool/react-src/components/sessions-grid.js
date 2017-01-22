import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { selectSession } from '../actions';
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

	componentWillReceiveProps(props){
		//console.log('component will receive in sessions', props);
	}

	renderSession(session, row, column){
		//if the link is not available, don't show its icon
		const sourceCodeLink = typeof session.sourceCodeLink != 'undefined';
		const slidesLink = typeof session.slidesLink != 'undefined';
		const videoLink = typeof session.videoLink != 'undefined';
		const blogPostLink = typeof session.blogPostLink != 'undefined';
		const attendance = this.props.user.attendance;

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
							 sourceCodeLink = { sourceCodeLink }
							 slidesLink		= { slidesLink }
							 videoLink		= { videoLink }
							 blogPostLink	= { blogPostLink } 
							 attendance		= { attendance }/>
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

function mapStateToProps({sessions, user}){
	return {sessions: sessions.data, user};
}

function mapDispatchToProps(dispatch){
	return bindActionCreators({selectSession}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SessionsGrid);