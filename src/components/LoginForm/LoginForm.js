import React, { Component } from 'react';
import AppContext from '../../contexts/AppContext';

// import TokenService from '../../services/token-service';
import AuthApiService from '../../services/auth-api-service';

export default class LoginForm extends Component {
	static contextType = AppContext;

	static defaultProps = {
		onLoginSuccess: () => {},
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

	handleSubmitJwtAuth = (e) => {
		e.preventDefault();
		this.setState({ error: null });
		const { username, password } = e.target;

		AuthApiService.postLogin({
			username: username.value,
			password: password.value,
			history: this.props.history,
		})
			.then((res) => {
				username.value = '';
				password.value = '';

				// save loginUserId
				this.context.setLoginUserId(res.user_id);

				//	TokenService.saveAuthToken(res.authToken);

				this.props.onLoginSuccess();
			})

			.catch((res) => {
				this.setState({ error: res.message });
			});
	};

	render() {
		const { error } = this.state;

		return (
			<form onSubmit={this.handleSubmitJwtAuth}>
				<div role="alert">{error && <p className="error">{error}</p>}</div>
				<div>
					<label htmlFor="username">Username</label>
					<input
						type="text"
						required
						name="username"
						id="username"
						autoComplete="username"
					/>
				</div>
				<div className="password">
					<label htmlFor="password">Password</label>
					<input
						type="password"
						required
						name="password"
						id="password"
						autoComplete="current-password"
					/>
				</div>
				<button className="btn-basic">Login</button>
			</form>
		);
	}
}
