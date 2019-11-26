import React from 'react';
import config from '../../config';
import AppContext from '../../contexts/AppContext';
import SessionApiService from '../../services/session-api-service';
import ValidationError from '../../ValidationError';

class EditComment extends React.Component {
	static contextType = AppContext;

	state = {
		apiError: null,
		formValid: true,
		errorCount: null,
		id: '',
		text: '',
		rating: '',
		session_id: '',
		errors: {
			text: '',
			rating: ''
		}
	};

	// to see EditComment apiError in ui:
	/*
	state = {
		apiError: 'editComment apiError errorMessage',
		...
	*/

	// TBD HOW TO USE SessionApiService.getComment here???

	// componentDidMount() {
	// 	const { commentId } = this.props.match.params;

	// 	this.context.clearError();
	// 	SessionApiService.getComment(commentId)
	// 		.then(this.context.setComment)
	// 		.catch(this.context.setError);
	// }

	componentDidMount() {
		const { commentId } = this.props.match.params;
		fetch(config.API_ENDPOINT + `/comments/${commentId}`, {
			method: 'GET',
			headers: {
				'content-type': 'application/json',
				authorization: `Bearer ${config.API_KEY}`
			}
		})
			.then(res => {
				if (!res.ok) return res.json().then(error => Promise.reject(error));

				return res.json();
			})
			.then(responseData => {
				this.setState({
					id: responseData.id,
					text: responseData.text,
					rating: responseData.rating,
					session_id: responseData.session_id
				});
			})
			.catch(error => {
				this.setState({ apiError: error });
			});
	}

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

		if (name === 'rating') {
			if (value.length === 0) {
				err = 'You must enter a rating';
			} else if (!Number.isInteger(value) || value < 1 || value > 5) {
				err = 'The rating must be a number between 1 and 5';
			}
		}

		const { errors } = { ...this.state };
		errors[name] = err;
		this.setState({ errors });
	};

	handleChange = event => {
		const { name, value } = event.target;
		this.setState({ [name]: value });

		this.validateField(name, value);
		this.updateErrorCount();
	};

	handleClickCancel = () => {
		this.props.history.push(`/sessions/${this.state.session_id}`);
	};

	resetFields = newFields => {
		this.setState({
			id: newFields.id || '',
			text: newFields.text || '',
			rating: newFields.rating || '',
			session_id: newFields.session_id || ''
		});
	};

	handleSubmit = e => {
		e.preventDefault();

		// do NOT submit form if any errors
		if (this.state.errorCount > 0) return;

		// get the form fields to be updated
		const { commentId } = this.props.match.params;

		const updatedComment = {
			id: commentId,
			text: this.state.text,
			rating: this.state.rating,
			modified: new Date()
		};

		this.setState({ apiError: null });

		SessionApiService.editComment(updatedComment)
			.then(this.context.editComment)
			.then(() => {
				this.resetFields(updatedComment);
				this.context.editComment(updatedComment);
				this.props.history.goBack();
			})
			.catch(this.context.setError);
	};

	render() {
		const { errors, text, rating } = this.state;
		if (this.state.apiError) {
			return <p className="error">{this.state.apiErrors}</p>;
		}

		return (
			<form onSubmit={this.handleSubmit}>
				<fieldset>
					<legend></legend>
					<label htmlFor="text">Comment</label>
					<textarea
						id="text"
						name="text"
						placeholder="Type a comment.."
						required
						aria-required="true"
						aria-describedby="textError"
						aria-label="Edit comment..."
						aria-invalid="true"
						value={text}
						onChange={this.handleChange}
					/>
					{errors.text.length > 0 && (
						<ValidationError id={'textError'} message={errors.text} />
					)}
					<label htmlFor="rating">Rating</label>
					<select
						id="rating"
						name="rating"
						aria-label="Rating"
						required
						aria-required="true"
						aria-invalid="true"
						value={rating}
						onChange={this.handleChange}
					>
						<option value="">Rate this Session</option>
						{[1, 2, 3, 4, 5].map(rating => (
							<option key={rating} value={rating}>
								{rating} Stars
							</option>
						))}
					</select>
					<br />
					<br />
					<button className="btn-cancel" onClick={this.handleClickCancel}>
						Cancel
					</button>{' '}
					<button
						className="btn-save-comment"
						disabled={this.state.formValid === false}
						type="submit"
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
		);
	}
}

export default EditComment;
