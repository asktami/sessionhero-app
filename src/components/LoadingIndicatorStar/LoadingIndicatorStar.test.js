import React from 'react';
import ReactDOM from 'react-dom';
import LoadingIndicatorStar from './LoadingIndicatorStar';

it('renders without crashing', () => {
	const div = document.createElement('div');

	ReactDOM.render(<LoadingIndicatorStar />, div);
	ReactDOM.unmountComponentAtNode(div);
});
