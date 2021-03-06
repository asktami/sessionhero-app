import React from 'react';
import AppContext from '../../contexts/AppContext';
import SessionApiService from '../../services/session-api-service';
import ValidationError from '../../ValidationError';

class EditComment extends React.Component {
	static contextType = AppContext;

	static defaultProps = {
		match: { params: {} },
		location: {},
		history: {
			push: () => {}
		}
	};

	state = {
		formValid: true,
		errorCount: null,
		id: '',
		comment: '',
		rating: '',
		session_id: '',
		errors: {
			comment: '',
			rating: ''
		}
	};

	componentDidMount() {
		// this parameter name is defined in App.js private route
		const { comment_id } = this.props.match.params;
		this.context.clearError();

		SessionApiService.getComment(comment_id)
			.then(this.context.setComment)
			.then(responseData => {
				this.setState({
					id: responseData.id,
					comment: responseData.comment,
					rating: responseData.rating,
					session_id: responseData.session_id
				});
			})
			.catch(this.context.setError);
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

		if (name === 'comment') {
			if (value.length === 0) {
				err = 'You must enter a comment';
			} else if (value.length < 5) {
				err = 'The comment must be at least 5 characters long';
			}
		}

		if (name === 'rating') {
			if (value.length === 0) {
				err = 'You must enter a rating';
			} else if (
				!Number.isInteger(parseInt(value)) ||
				parseInt(value) < 1 ||
				parseInt(value) > 5
			) {
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
			comment: newFields.comment || '',
			rating: newFields.rating || '',
			session_id: newFields.session_id || ''
		});
	};

	handleSubmit = e => {
		e.preventDefault();

		// do NOT submit form if any errors
		if (this.state.errorCount > 0) return;

		// get the form fields to be updated
		const { comment_id } = this.props.match.params;

		const updatedComment = {
			id: comment_id,
			comment: this.state.comment,
			rating: parseInt(this.state.rating),
			modified: new Date()
		};

		SessionApiService.editComment(updatedComment)
			.then(() => this.context.editComment(updatedComment))
			.then(() => {
				this.resetFields(updatedComment);
				this.props.history.goBack();
			})
			.catch(this.context.setError);
	};

	render() {
		const { errors, comment, rating } = this.state;

		return (
			<form onSubmit={this.handleSubmit}>
				<fieldset>
					<legend></legend>
					<label htmlFor="comment">Comment</label>
					<textarea
						id="comment"
						name="comment"
						placeholder="Type a comment.."
						required
						aria-required="true"
						aria-describedby="commentError"
						aria-label="Edit comment..."
						aria-invalid="true"
						value={comment}
						onChange={this.handleChange}
					/>
					{errors.comment.length > 0 && (
						<ValidationError id={'commentError'} message={errors.comment} />
					)}
					<label htmlFor="rating">Rating</label>
					<select
						id="rating"
						name="rating"
						aria-label="Rating"
						required
						aria-required="true"
						aria-describedby="ratingError"
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
					{errors.rating.length > 0 && (
						<ValidationError id={'ratingError'} message={errors.rating} />
					)}
					<p>
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
					</p>
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
