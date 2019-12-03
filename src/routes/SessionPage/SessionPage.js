import React, { Component } from 'react';
import AppContext from '../../contexts/AppContext';
import SessionApiService from '../../services/session-api-service';
import SessionListItem from '../../components/SessionListItem/SessionListItem';
import SessionComments from '../../components/SessionComments/SessionComments';
import CommentForm from '../../components/CommentForm/CommentForm';

import './SessionPage.css';

export default class SessionPage extends Component {
	static contextType = AppContext;

	static defaultProps = {
		match: { params: {} }
	};

	componentDidMount() {
		const { session_id } = this.props.match.params;
		this.context.clearError();

		SessionApiService.getSession(session_id)
			.then(this.context.setSession)
			.catch(this.context.setError);

		SessionApiService.getSessionComments(session_id)
			.then(this.context.setComments)
			.catch(this.context.setError);
	}

	componentWillUnmount() {
		this.context.clearSession();
	}

	renderSession() {
		const { session } = this.context;

		return (
			<>
				<SessionListItem
					session={session}
					pathname={this.props.location.pathname}
					hideStars={true}
				/>
				<SessionComments />
				<CommentForm />
			</>
		);
	}

	render() {
		const { error, session } = this.context;
		let content;
		if (error) {
			content =
				error.message === `Session doesn't exist` ? (
					<p className="error">Session not found</p>
				) : (
					<p className="error">There was an error</p>
				);
		} else if (!session.id) {
			content = <div className="loading" />;
		} else {
			content = this.renderSession();
		}
		return <section>{content}</section>;
	}
}
