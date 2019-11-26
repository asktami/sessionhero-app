import React, { Component } from 'react';
import AppContext from '../../contexts/AppContext';

import TokenService from '../../services/token-service';
import AuthApiService from '../../services/auth-api-service';
import SessionApiService from '../../services/session-api-service';

export default class LoginForm extends Component {
	static contextType = AppContext;

	static defaultProps = {
		onLoginSuccess: () => {}
	};

	state = { error: null };

	handleSubmitBasicAuth = ev => {
		ev.preventDefault();
		const { username, password } = ev.target;

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

				console.log('loginForm loginUserId = ', JSON.stringify(res.user_id));
				// save loginUserId
				this.context.setLoginUserId(res.user_id);

				TokenService.saveAuthToken(res.authToken);
				this.props.onLoginSuccess();
			})
			.then(() => {
				// get schedule immediately upon login
				// TBD - schedule is NOT being stored in context????  If reload page its gone!!!
				SessionApiService.getSchedule()
					.then(this.context.setScheduleList)
					.catch(this.context.setError);
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
			</form>
		);
	}
}
