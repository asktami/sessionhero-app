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

		Promise.all([
			SessionApiService.getSchedule(),
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

	// updateSessionList() {
	// 	const { sessionList = [], scheduleList = [] } = this.context;

	// 	// automatically update sessionList in context
	// 	// add schedule user id to applicable session records
	// 	// simulating a sessions + schedule left table join
	// 	sessionList.forEach(session => {
	// 		scheduleList.forEach(schedule => {
	// 			if (schedule.session_id === session.id) {
	// 				session.user_id = schedule.user_id;
	// 			}
	// 			// else {
	// 			// 	session.user_id = '';
	// 			// }
	// 		});
	// 	});
	// }

	addToSchedule = session_id => {
		// SessionApiService.addScheduleItem(session_id)
		// 	.then(
		// 		this.context.addScheduleItem({
		// 			session_id: session_id,
		// 			user_id: this.context.loginUserId
		// 		})
		// 	)
		// 	.then(SessionApiService.getSessions())
		// 	.catch(this.context.setError);

		Promise.all([
			SessionApiService.addScheduleItem(session_id),
			SessionApiService.getSessions(),
			SessionApiService.getSchedule()
		])
			.then(results => {
				this.context.addScheduleItem({
					session_id: session_id,
					user_id: this.context.loginUserId
				});

				const sessions = results[1];
				const schedule = results[2];

				this.context.setSessionList(sessions);
				this.context.setScheduleList(schedule);
			})
			.catch(this.context.setError);
	};

	removeFromSchedule = schedule_id => {
		// remove session from schedule
		// AND clear user_id on that session record in sessionList
		// SessionApiService.deleteScheduleItem(schedule_id)
		// 	.then(this.context.removeScheduleItem(schedule_id))
		// 	.then(SessionApiService.getSessions())
		// 	.then(SessionApiService.getSchedule())
		// 	.catch(this.context.setError);

		Promise.all([
			SessionApiService.deleteScheduleItem(schedule_id),
			SessionApiService.getSessions(),
			SessionApiService.getSchedule()
		])
			.then(results => {
				this.context.removeScheduleItem(schedule_id);
				const sessions = results[1];
				const schedule = results[2];

				this.context.setSessionList(sessions);
				this.context.setScheduleList(schedule);
			})
			.catch(this.context.setError);
	};

	renderSessions() {
		const { sessionList = [], scheduleList = [] } = this.context;

		let sessionOrScheduleList;
		let result;

		if (this.props.location.pathname === '/') {
			sessionOrScheduleList = sessionList;
		} else {
			sessionOrScheduleList = scheduleList;
		}

		let count = sessionOrScheduleList.length;
		if (count === 0)
			return (
				<div className="text-center">
					You haven't added any sessions to your schedule yet.
				</div>
			);

		// apply search filters: filterDay and filterTrack
		result = sessionOrScheduleList
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
						addToSchedule={this.addToSchedule}
						removeFromSchedule={this.removeFromSchedule}
					/>
				</li>
			));

		return <ul className="sessions-list">{result}</ul>;
	}

	render() {
		const { error } = this.context;

		console.log('sessionList in context = ', this.context.sessionList);
		console.log('scheduleList in context = ', this.context.scheduleList);
		console.log('loginUserId in context = ', this.context.loginUserId);

		console.log('-------SESSIONLIST pathname = ', this.props.location.pathname);

		return (
			<section>
				{error ? (
					<p className="error">
						There was an error, try again.
						<br />
						{JSON.stringify(error)}
					</p>
				) : (
					this.renderSessions()
				)}
			</section>
		);
	}
}
