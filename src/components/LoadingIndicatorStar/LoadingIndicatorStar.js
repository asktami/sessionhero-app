import React from 'react';

import Loader from 'react-loader-spinner';
import { usePromiseTracker } from 'react-promise-tracker';

// loading spinner for stars to add to / remove from schedule
const LoadingIndicatorStar = props => {
	const { promiseInProgress } = usePromiseTracker({ area: props.area });

	return (
		promiseInProgress && (
			<>
				<div
					style={{
						width: '100%',
						height: '100',
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center'
					}}
				>
					<Loader type="ThreeDots" color={'#F88C04'} />
				</div>
				<div
					style={{
						width: '100%',
						height: '10',
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center'
					}}
				>
					updating
				</div>
			</>
		)
	);
};

export default LoadingIndicatorStar;
