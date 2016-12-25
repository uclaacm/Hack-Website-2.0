import React from 'react';

export default function App(props){
	return (
		<div className="app-wrapper">
			{props.children}
		</div>
	);
}