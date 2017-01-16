import React, { Component} from 'react';

class Dialog extends Component{

	constructor(props){
		super(props);

		this.state = {currentSlide: 0}

		this.onFormSubmit = this.onFormSubmit.bind(this);
		this.incrementSlide = this.incrementSlide.bind(this);
		this.formatMembers = this.formatMembers.bind(this);
		this.renderFailure = this.renderFailure.bind(this);
		this.render = this.render.bind(this);
	}

	incrementSlide(num, callback){
		if(this.state.currentSlide == 2)
			callback('reset-error', null);

		if(this.state.currentSlide == 0 && num < 0)
			this.props.changeDialog({active : false});

		this.setState({currentSlide: this.state.currentSlide+num});
	}

	onFormSubmit(e){
		e.preventDefault();
		this.incrementSlide(1);
	}

	formatMembers(members){
		return members.map(member => {
				if(member.id == this.props.user.id) return;
				return <li key={member.id}>{member.name}</li>;
		});
	}

	renderFailure(error){
		return (
			<div className="dialog-inner">
				<h3>Error:</h3>
				<h3>{error}</h3>
			</div>
		);
	}

	render(back){
		return(
			<div>
				{
					back &&
					<button className="back"
							onClick={() => this.incrementSlide(-1)}>
							<i className="fa fa-chevron-left hl" ariaHidden="true"></i>
					</button>
				}
				{this.renderSlide(this.state.currentSlide)}
			</div>
		);
	}
}

export default Dialog;