import React, { Component } from 'react';
import AppContext from '../../contexts/AppContext';

import SessionApiService from '../../services/session-api-service';
import SessionListItem from '../../components/SessionListItem/SessionListItem';

import './SessionListPage.css';

export default class SessionListPage extends Component {
	static contextType = AppContext;

	static defaultProps = {
		location: { match: { params: {} } }
	};

	componentDidMount() {
		this.context.clearError();
		this.context.clearFilters();

		// TBD QUESTION -----------------------------
		// get Schedule on login not on SessionsList ???

		// Promise.all([
		// 	// only gets Schedule if logged in
		// 	// sessionList is combined with loginUser's schedule to have loginuser_id on applicable session records (to show stars)
		// 	// scheduleList is combined with sessions to show all session info
		// 	SessionApiService.getSessions(),
		// 	SessionApiService.getSchedule()
		// ]).then(results => {
		// 	const sessions = results[0];
		// 	const schedule = results[1];

		// 	this.context.setSessionList(sessions);
		// 	this.context.setScheduleList(schedule);
		// });

		// SessionApiService.getSessions()
		// 	.then(this.context.setSessionList)
		// 	.catch(this.context.setError);

		// SessionApiService.getSessions()
		// .then(this.context.setSessionList)
		// .catch(this.context.setError)
		// .then(schedulelist => this.context.setScheduleList(schedulelist)).catch(this.context.setError)

		Promise.all([
			SessionApiService.getSchedule(),
			SessionApiService.getSessions()
		])
			.then(results => {
				const schedule = results[0];
				const sessions = results[1];

				this.context.setScheduleList(schedule);
				this.context.setSessionList(sessions);

				this.updateSessionList();
			})
			.catch(this.context.setError);
	}

	// TBD update sessionList:
	// combine sessionList and scheduleList so have loginUserId in session record
	// COULD NOT - in postgres use joins instead

	updateSessionList() {
		const { sessionList = [], scheduleList = [] } = this.context;

		// automatically update sessionList in context
		// add schedule user id to applicable session records
		// simulating a sessions + schedule left table join
		sessionList.forEach(session => {
			scheduleList.forEach(schedule => {
				if (schedule.session_id === session.id) {
					session.user_id = schedule.user_id;
				} else {
					session.user_id = '';
				}
			});
		});
	}

	// TBD -----------------------------------
	// SessionListPage = add to schedule AND delete from schedule
	// ScheduleListPage = delete from schedule only

	// NEED loginUserId when add session to schedule in context!!!! so updateSessionList can have loginUserId

	addToSchedule = session_id => {
		console.log('---------- add to schedule');

		SessionApiService.addScheduleItem(session_id)
			.then(
				this.context.addScheduleItem({
					session_id: session_id,
					user_id: this.state.loginUserId
				})
			)
			.then(this.updateSessionList())
			.catch(this.context.setError);
	};

	removeFromSchedule = schedule_id => {
		console.log('---------- remove from schedule');

		// remove session from schedule
		// AND clear user_id on that session record in sessionList

		SessionApiService.deleteScheduleItem(schedule_id)
			.then(this.context.removeScheduleItem)
			.then(this.updateSessionList())
			.catch(this.context.setError);
	};

	renderSessions() {
		const { sessionList = [] } = this.context;

		console.log('SESSION LIST PAGE location = ', this.props.location);

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
