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

		Promise.all([
			// only gets Schedule if logged in
			// sessionList is combined with loginUser's schedule to have loginUserId on applicable session records (to show stars)
			// scheduleList is combined with sessions to show all session info
			SessionApiService.getSchedule(this.context.loginUserId),
			SessionApiService.getSessions()
		])
			.then(results => {
				const schedule = results[0];
				const sessions = results[1];

				this.context.setScheduleList(schedule);
				this.context.setSessionList(sessions);
			})
			.catch(this.context.setError);
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

		console.log('loginUserId in context = ', this.context.loginUserId);
		console.log('sessionList in context = ', this.context.sessionList);
		console.log('scheduleList in context = ', this.context.scheduleList);

		return (
			<section>
				{/* TBD debug loginUserId */}
				{this.context.loginUserId && (
					<p>loginUserId: {this.context.loginUserId}</p>
				)}
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
