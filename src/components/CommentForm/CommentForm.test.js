import React from 'react';
import ReactDOM from 'react-dom';
import CommentForm from './CommentForm';

it('renders without crashing', () => {
	const div = document.createElement('div');
	const props = {
		comment: '',
		rating: ''
	};
	ReactDOM.render(<CommentForm {...props} />, div);
	ReactDOM.unmountComponentAtNode(div);
});
