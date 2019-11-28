import React, { Component } from 'react';
import AppContext from '../../contexts/AppContext';
import SessionApiService from '../../services/session-api-service';
import './CommentForm.css';
import ValidationError from '../../ValidationError';

export default class CommentForm extends Component {
	static contextType = AppContext;

	state = {
		formValid: false,
		errorCount: null,
		text: '',
		errors: {
			text: '',
			rating: ''
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

	validateField = (name, value) => {
		let err = '';

		if (name === 'text') {
			if (value.length === 0) {
				err = 'You must enter a comment';
			} else if (value.length < 5) {
				err = 'The comment must be at least 5 characters long';
			}
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

	handleSubmit = e => {
		e.preventDefault();

		// do NOT submit form if any errors
		if (this.state.errorCount > 0) return;

		// get the form fields from the event
		const { session, addComment, setError } = this.context;
		const { text, rating } = e.target;

		SessionApiService.postComment(session.id, text.value, Number(rating.value))
			.then(addComment)
			.then(() => {
				text.value = '';
				rating.value = '';
			})
			.catch(setError);
	};

	render() {
		const { errors } = this.state;

		if (this.context.error) {
			return <p className="error">{this.context.error}</p>;
		}
		return (
			<section>
				<form className="comment-form" onSubmit={this.handleSubmit}>
					<fieldset>
						<div className="text">
							<textarea
								aria-label="Type a comment..."
								name="text"
								id="text"
								placeholder="Type a comment.."
								required
								aria-required="true"
								aria-describedby="textError"
								aria-invalid="true"
								onChange={this.handleChange}
							/>
							{errors.text.length > 0 && (
								<ValidationError message={errors.text} id={'textError'} />
							)}
							<br />
						</div>

						<select
							required
							aria-label="Rate this session"
							type="number"
							name="rating"
							id="rating"
							aria-required="true"
							aria-invalid="true"
							onChange={this.handleChange}
						>
							<option value="">Rate this Session</option>
						{[1, 2, 3, 4, 5].map(rating => (
							<option key={rating} value={rating}>
								{rating} Stars
							</option>

						</select>
						<br />
						<br />
						<button
							className="btn-save-comment"
							disabled={this.state.formValid === false}
						>
							Save
						</button>
					</fieldset>

					{this.state.errorCount !== null ? (
						<p className="form-status">
							Form is {this.state.formValid ? 'complete  ✅' : 'incomplete  ❌'}
						</p>
					) : null}
				</form>
			</section>
		);
	}
}
