import React, { Component } from 'react';
import AppContext from '../../contexts/AppContext';
import SessionApiService from '../../services/session-api-service';
import SessionListItem from '../../components/SessionListItem/SessionListItem';
import './SessionListPage.css';

export default class SessionListPage extends Component {
	static contextType = AppContext;

	componentDidMount() {
		this.context.clearError();
		this.context.clearFilters();

		// get Schecule on login not on SessionsList

		// Promise.all([
		// 	// only gets Schedule if logged in
		// 	// sessionList is combined with loginUser's schedule to have loginUserId on applicable session records (to show stars)
		// 	// scheduleList is combined with sessions to show all session info
		// 	SessionApiService.getSessions(),
		// 	SessionApiService.getSchedule()
		// ]).then(results => {
		// 	const sessions = results[0];
		// 	const schedule = results[1];

		// 	this.context.setSessionList(sessions);
		// 	this.context.setScheduleList(schedule);
		// });

		SessionApiService.getSessions()
			.then(this.context.setSessionList)
			.catch(this.context.setError);

		// SessionApiService.getSessions()
		// .then(this.context.setSessionList)
		// .catch(this.context.setError)
		// .then(schedulelist => this.context.setScheduleList(schedulelist)).catch(this.context.setError)
	}

	renderSessions() {
		const { sessionList = [] } = this.context;

		// apply search filters: filterDay and filterTrack
		return sessionList
			.filter(
				session =>
					session.day
						.toLowerCase()
						.includes(this.context.filterDay.toLowerCase()) &&
					session.track
						.toLowerCase()
						.includes(this.context.filterTrack.toLowerCase())
			)
			.map(session => (
				<li className="item" key={session.id}>
					<SessionListItem
						session={session}
						pathname={this.props.location.pathname}
					/>
				</li>
			));
	}

	render() {
		const { error } = this.context;

		console.log('sessionList in context = ', this.context.sessionList);

		console.log('scheduleList in context = ', this.context.scheduleList);

		console.log('loginUserId in context = ', this.context.loginUserId);

		return (
			<section>
				{error ? (
					<p className="error">
						There was an error, try again.
						<br />
						{JSON.stringify(error)}
					</p>
				) : (
					<ul className="sessions-list">{this.renderSessions()}</ul>
				)}
			</section>
		);
	}
}
