import React from 'react';

export default function ValidationError(props) {
	if (props.message) {
		return (
			<div className="error" id={props.id}>
				<p>{props.message}</p>
			</div>
		);
	}

	return <></>;
}
