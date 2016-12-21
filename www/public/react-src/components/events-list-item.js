import React from 'react';

export default (props) => {
	return (
		<div>
			Date: {props.date}
			<br />
			Title: {props.title}
			<br />
			Location: {props.location}
			<br />
			Category: {props.category}
			<br />
			Tagline: {props.tagline}
			<br />
			Desc: {props.desc}
		</div>
	);
}