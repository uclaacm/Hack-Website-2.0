import React from 'react';

export default function SessionItem(props){
		
	return(
			<div className="session-item" onClick={props.onClickEvent}>
				<div 	className="img-wrapper"
						style={{backgroundImage: `url(${props.image})`}}>
				</div>
				{	
					props.attendance.includes(props.number) &&
					<div className="attend">
						<div className="circle-icon">
							<i className="fa fa-check hl" ariaHidden="true"></i>
						</div>
						<p>ATTENDED</p>
					</div>
				}
				<div className="text-wrapper">
					<h4 className="week">Week {props.number}</h4>
					<h3>{props.title}</h3>
				</div>
				<div className="icons">
					{/*if the link is not available, don't show its icon*/}
					{
						props.project && props.sourceCodeLink &&
						<span>
							<i className="fa fa-code" ariaHidden="true"></i>
						</span>
					}
					{
						props.project && props.slidesLink &&
						<span>
							<i className="fa fa-film" ariaHidden="true"></i>
						</span>
					}
					{
						props.project && props.videoLink &&
						<span>
							<i className="fa fa-video-camera" ariaHidden="true"></i>
						</span>
					}
					{
						props.project && props.blogPostLink &&
						<span>
							<i className="fa fa-thumb-tack" ariaHidden="true"></i>
						</span>
					}
					{
						props.project && 
						<span className="right">
							<i className="fa fa-plus hl" ariaHidden="true"></i>
						</span>
					}
				</div>
			</div>
		);

}