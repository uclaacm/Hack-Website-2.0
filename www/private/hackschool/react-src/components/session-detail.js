import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { selectSession } from '../actions';

class SessionDetail extends Component{

	constructor(props){
		super(props);

		this.toggleConfirm = this.toggleConfirm.bind(this);
	}

	componentWillMount(){
		document.querySelector('body').classList.add('noscroll');
	}

	componentWillUnmount(){
		document.querySelector('body').classList.remove('noscroll');
	}

	toggleConfirm(){
		document.querySelector('.session-inner').classList.toggle('exit-left');
		document.querySelector('.confirm').classList.toggle('exit-left');
	}

	render(){
		const session = this.props.selectedSession;
		if(!session)
			return null;

		let teamScore = this.props.team.team
							? this.props.team.team.scores
								.find(score => score.sessionNumber == session.number)
							: null;

		if(!session.project)
			teamScore = null;
		else if(typeof teamScore == 'undefined' || teamScore == null)
			teamScore = `0/`;
		else
			teamScore = `${teamScore.score}/`;
		
		//if no link, button will not be displayed
		const sourceCodeLink = typeof session.sourceCodeLink != 'undefined';
		const slidesLink = typeof session.slidesLink != 'undefined';
		const videoLink = typeof session.videoLink != 'undefined';
		const blogPostLink = typeof session.blogPostLink != 'undefined';
		const submissionLink = typeof session.submissionLink != 'undefined';

		return (
			<div className="session-detail-wrapper">
				<button className="back"
					onClick={() => this.props.selectSession(null)}>
						<i className="fa fa-chevron-left hl" ariaHidden="true"></i>
				</button>
				<div className="session-detail">
					<div 	className="img-top"
							style={{backgroundImage: `url(${session.image})`}}>
					</div>
					<div className="session-content">
						<div className="session-inner">
							<div className="content-left">
								<div className="header">
									<h4 className="hl-grey week">Week {session.number}</h4>
									<h3>{session.name}</h3>
								</div>
								<p>{session.desc}</p>
								<div className="gradient"></div>
							</div>
							<div className="content-right">
								{session.project && 
								<div className="scores">
									<p>SCORE</p>
									<p>{teamScore}{session.points}</p>
								</div>}
								{/*display links only if they are not empty*/}
								{sourceCodeLink && <a href={session.sourceCodeLink} target="_blank">
									<button><span className="icon"><i className="fa fa-code" ariaHidden="true"></i></span> PROJECT</button>
								</a>}
								{slidesLink && <a href={session.slidesLink} target="_blank">
									<button><span className="icon"><i className="fa fa-film" ariaHidden="true"></i></span> SLIDES</button>
								</a>}
								{videoLink && <a href={session.videoLink} target="_blank">
									<button><span className="icon"><i className="fa fa-video-camera" ariaHidden="true"></i></span> SCREENCAST</button>
								</a>}
								{blogPostLink && <a href={session.blogPostLink} target="_blank">
									<button><span className="icon"><i className="fa fa-thumb-tack" ariaHidden="true"></i></span> BLOG POST</button>
								</a>}
							</div>
							{submissionLink && <a onClick={this.toggleConfirm}>
								<button className="btn-selection"><i className="fa fa-plus" ariaHidden="true"></i> ADD SUBMISSION</button>
							</a>}
						</div>
						<div className="confirm">
							<h3>Before you submit, make sure that: </h3>
							<ul>
								<li><i className="fa fa-check" ariaHidden="true"></i> You are submitting only 1 zip file per team</li>
								<li><i className="fa fa-check" ariaHidden="true"></i> You are <strong>not</strong> making multiple submissions</li>
								<li><i className="fa fa-check" ariaHidden="true"></i> You have provided your team name & team ID in a text file</li>
								<li><i className="fa fa-check" ariaHidden="true"></i> You have included the contents of your entire <strong>Android</strong> project</li>
								<li><i className="fa fa-check" ariaHidden="true"></i> You have only done <strong>either</strong> the exercises or project, <strong>not both</strong></li>
								<li><i className="fa fa-check" ariaHidden="true"></i> If you have done the exercises, they should all be in <strong>one project</strong></li>
							</ul>
							<div className="notice">
								<p>Submissions will be due 1 week from the session, but we will accept late submissions taking some points for each day it is late. The lateness penalty for an assignment that is submitted between N and N+1 full days late (where N is nonnegative) is 2^N % of the assignment&apos;s value. That is, the penalty is 1% for being up to 1 day late, 2% for being from 1 to 2 days late, 4% for being from 2 to 3 days late, and so forth.
								</p>
							</div>
							<a onClick={this.toggleConfirm} className="cancel">
								<button className="btn-selection">CANCEL</button>
							</a>
							<a href={session.submissionLink} target="_blank" onClick={() => this.props.selectSession(null)}>
								<button className="btn-selection">CONFIRM</button>
							</a>
						</div>
					</div>
					
				</div>
			</div>
		);
	}

}

function mapStateToProps({selectedSession, team}){
	return {selectedSession, team};
}

function mapDispatchToProps(dispatch){
	return bindActionCreators({selectSession}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SessionDetail);