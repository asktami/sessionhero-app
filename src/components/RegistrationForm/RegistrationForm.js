import React, { Component } from 'react';
import { Required } from '../Utils/Utils';
import AuthApiService from '../../services/auth-api-service';
import ValidationError from '../../ValidationError';

const REGEX_UPPER_LOWER_NUMBER_SPECIAL = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&])[\S]+/;

export default class RegistrationForm extends Component {
	static defaultProps = {
		onRegistrationSuccess: () => {}
	};
	// error is the result from the POST to the API
	// errors holds the form field change before the POST to the API
	state = {
		error: null,
		formValid: false,
		errorCount: null,
		password: '',
		errors: {
			password: ''
		}
	};

	updateErrorCount = () => {
		let errors = this.state.errors;
		let count = 0;

		Object.values(errors).forEach(val => {
			if (val.length > 0) {
				count++;
			}
		});

		this.setState({ errorCount: count });
		let valid = count === 0 ? true : false;
		this.setState({ formValid: valid });
	};

	validatePassword(password) {
		if (password.length < 8) {
			return 'Password must be longer than 7 characters';
		}
		if (password.length > 72) {
			return 'Password must be less than 72 characters';
		}
		if (password.startsWith(' ') || password.endsWith(' ')) {
			return 'Password must not start or end with empty spaces';
		}
		if (!REGEX_UPPER_LOWER_NUMBER_SPECIAL.test(password)) {
			return 'Password must contain one upper case, lower case, number and special character';
		}
		return '';
	}

	validateField = (name, value) => {
		let err = '';

		if (name === 'password') {
			err = this.validatePassword(value);
		}

		const { errors } = { ...this.state };
		errors[name] = err;
		this.setState({ errors });
	};

	handleChange = event => {
		const { name, value } = event.target;
		this.setState({ [name]: value.trim() });

		this.validateField(name, value);
		this.updateErrorCount();
	};

	handleSubmit = event => {
		event.preventDefault();
		const { username, password, fullname } = event.target;

		this.setState({ error: null });
		AuthApiService.postUser({
			username: username.value,
			password: password.value,
			fullname: fullname.value
		})
			.then(user => {
				username.value = '';
				password.value = '';
				fullname.value = '';
				this.props.onRegistrationSuccess();
			})
			.catch(res => {
				this.setState({ error: res.message });
			});
	};

	render() {
		const { error, errors } = this.state;
		return (
			<form className="RegistrationForm" onSubmit={this.handleSubmit}>
				<div role="alert">{error && <p className="error">{error}</p>}</div>
				<div>
					<label htmlFor="fullname">
						Full Name <Required />
					</label>
					<input name="fullname" type="text" required id="fullname" />
				</div>
				<div>
					<label htmlFor="username">
						Username <Required />
					</label>
					<input name="username" type="text" required id="username" />
				</div>
				<div className="password">
					<label htmlFor="password">
						Password <Required />
					</label>
					<input
						name="password"
						type="password"
						required
						id="password"
						aria-required="true"
						aria-describedby="passwordError"
						aria-invalid="true"
						onChange={this.handleChange}
					/>
					{errors.password.length > 0 && (
						<ValidationError message={errors.password} id={'passwordError'} />
					)}
					<br />
				</div>
				<button className="btn-basic">Register</button>
			</form>
		);
	}
}
