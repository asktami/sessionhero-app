import React from 'react';
import ReactDOM from 'react-dom';
import LoginForm from './LoginForm';

it('renders without crashing', () => {
	const div = document.createElement('div');
	const props = {
		username: '',
		password: ''
	};
	ReactDOM.render(<LoginForm {...props} />, div);
	ReactDOM.unmountComponentAtNode(div);
});
