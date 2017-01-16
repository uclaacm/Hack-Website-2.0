import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { selectSession } from '../actions';

class SessionDetail extends Component{

	render(){
		const session = this.props.selectedSession;
		if(!session)
			return null;
		
		//if no link, button will not be displayed
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
								<p>{session.points || 0}</p>
							</div>}
							{/*display links only if they are not empty*/}
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
						{submissionLink && <a href={session.submissionLink} target="_blank" >
							<button className="btn-selection"><i className="fa fa-plus" ariaHidden="true"></i> ADD SUBMISSION</button>
						</a>}
					</div>
					
				</div>
			</div>
		);
	}

}

function mapStateToProps({selectedSession}){
	return {selectedSession};
}

function mapDispatchToProps(dispatch){
	return bindActionCreators({selectSession}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SessionDetail);