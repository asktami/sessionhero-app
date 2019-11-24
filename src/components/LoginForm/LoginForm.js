import React, { Component } from 'react';

import TokenService from '../../services/token-service';
import AuthApiService from '../../services/auth-api-service';

export default class LoginForm extends Component {
	static defaultProps = {
		onLoginSuccess: () => {}
	};

	state = { error: null };

	handleSubmitBasicAuth = ev => {
		ev.preventDefault();
		const { username, password } = ev.target;

		// console.log('login form submitted');
		// console.log('username: ', username.value);
		// console.log('password: ', password.value);

		// create the login auth token and save it in localStorage
		TokenService.saveAuthToken(
			TokenService.makeBasicAuthToken(username.value, password.value)
		);

		username.value = '';
		password.value = '';
		this.props.onLoginSuccess();
	};

	handleSubmitJwtAuth = ev => {
		ev.preventDefault();
		this.setState({ error: null });
		const { username, password } = ev.target;

		AuthApiService.postLogin({
			username: username.value,
			password: password.value
		})
			.then(res => {
				username.value = '';
				password.value = '';
				TokenService.saveAuthToken(res.authToken);
				this.props.onLoginSuccess();
			})
			.catch(res => {
				this.setState({ error: res.error });
			});
	};

	render() {
		const { error } = this.state;
		return (
			<form onSubmit={this.handleSubmitJwtAuth}>
				<div role="alert">{error && <p className="error">{error}</p>}</div>
				<div>
					<label htmlFor="username">User name</label>
					<input type="text" required name="username" id="username" />
				</div>
				<div className="password">
					<label htmlFor="password">Password</label>
					<input required name="password" type="password" id="password" />
				</div>
				<button className="btn-basic">Login</button>

				<br />
				<br />
				<div className="developer-note">
					Note: during this test:
					<br />
					You can login with ANY username and password
				</div>
			</form>
		);
	}
}
