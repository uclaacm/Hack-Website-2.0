import React from 'react';

export default function Loading({message}){
	return (
		<div className="loading">
			<img src="/common/images/loading.gif"/>
			<h1>{message}</h1>
		</div>
	);
};
