import React, { Component } from 'react';
import LoginForm from '../../components/LoginForm/LoginForm';

export default class LoginPage extends Component {
	// only need defaultProps if 1st time component rendered need to do something before provide a prop
	// static defaultProps = {
	// 	location: {},
	// 	history: {
	// 		push: () => {}
	// 	}
	// };

	handleLoginSuccess = () => {
		const { location, history } = this.props;
		const destination = (location.state || {}).from || '/';
		history.push(destination);
	};

	render() {
		return (
			<section>
				<h2>Login</h2>
				<LoginForm
					history={this.props.history}
					onLoginSuccess={this.handleLoginSuccess}
				/>
			</section>
		);
	}
}
