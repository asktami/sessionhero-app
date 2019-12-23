import React from 'react';
import ReactDOM from 'react-dom';
import { SessionStarRating } from './SessionStarRating';

it('renders without crashing', () => {
	const div = document.createElement('div');
	const props = {
		rating: 3
	};
	ReactDOM.render(<SessionStarRating {...props} />, div);
	ReactDOM.unmountComponentAtNode(div);
});
