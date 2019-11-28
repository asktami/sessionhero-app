import React, { Component } from 'react';
import AppContext from '../../contexts/AppContext';

import TokenService from '../../services/token-service';
import AuthApiService from '../../services/auth-api-service';

export default class LoginForm extends Component {
	static contextType = AppContext;

	static defaultProps = {
		onLoginSuccess: () => {}
	};

	state = { error: null };

	// UNUSED
	// handleSubmitBasicAuth = e => {
	// 	e.preventDefault();
	// 	const { username, password } = e.target;

	// 	// create the login auth token and save it in localStorage
	// 	TokenService.saveAuthToken(
	// 		TokenService.makeBasicAuthToken(username.value, password.value)
	// 	);

	// 	username.value = '';
	// 	password.value = '';
	// 	this.props.onLoginSuccess();
	// };

	handleSubmitJwtAuth = e => {
		e.preventDefault();
		this.setState({ error: null });
		const { username, password } = e.target;

		AuthApiService.postLogin({
			username: username.value,
			password: password.value
		})
			.then(res => {
				username.value = '';
				password.value = '';

				console.log('loginForm loginUserId = ', JSON.stringify(res.user_id));

				// save loginUserId
				this.context.setLoginUserId(res.user_id);
				// QUESTION - should this be part of the token function?

				TokenService.saveAuthToken(res.authToken);

				this.props.onLoginSuccess();
			})

			// QUESTION - should I set scheduleList on login?
			// TBD
			// .then(() => {
			// 	// get schedule immediately upon login
			// 	SessionApiService.getSchedule()
			// 		.then(this.context.setScheduleList)
			// 		.catch(this.context.setError);
			// })

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
			</form>
		);
	}
}
