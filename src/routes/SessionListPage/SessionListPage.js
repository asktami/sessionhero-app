import React, { Component } from 'react';
import AppContext from '../../contexts/AppContext';

import SessionApiService from '../../services/session-api-service';
import SessionListItem from '../../components/SessionListItem/SessionListItem';

import './SessionListPage.css';

// using trackPromise so can use LoadingIndicator
import { trackPromise } from 'react-promise-tracker';
import LoadingIndicator from '../../components/LoadingIndicator/LoadingIndicator';

import LoadingIndicatorStar from '../../components/LoadingIndicatorStar/LoadingIndicatorStar';

export default class SessionListPage extends Component {
	static contextType = AppContext;

	static defaultProps = {
		location: { match: { params: {} } }
	};

	componentDidMount() {
		this.context.clearError();
		this.context.clearFilters();

		trackPromise(
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
				.catch(this.context.setError)
		);
	}

	addToSchedule = session_id => {
		// add session tp schedule
		// AND add user_id on that session record in sessionList

		this.context.addScheduleItem({
			session_id: session_id,
			user_id: this.context.loginUserId
		});

		trackPromise(
			SessionApiService.addScheduleItem(session_id)
				.then(() => {
					SessionApiService.getSchedule().then(scheduleResult => {
						SessionApiService.getSessions().then(sessionResult => {
							this.context.setScheduleList(scheduleResult);
							this.context.setSessionList(sessionResult);
						});
					});
				})
				.catch(this.context.setError),
			'stars-add'
		);
	};

	removeFromSchedule = schedule_id => {
		// remove session from schedule
		// AND clear user_id on that session record in sessionList

		this.context.removeScheduleItem(schedule_id);

		trackPromise(
			SessionApiService.deleteScheduleItem(schedule_id)
				.then(() => {
					SessionApiService.getSchedule().then(scheduleResult => {
						SessionApiService.getSessions().then(sessionResult => {
							// this.context.setScheduleList(scheduleResult);
							this.context.setSessionList(sessionResult);
						});
					});
				})
				.catch(this.context.setError),
			'stars-remove'
		);
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

		if (count === 0 && this.props.location.pathname === '/') {
			return <div className="text-center">Sessions are loading.</div>;
		}

		if (count === 0 && this.props.location.pathname !== '/') {
			return (
				<div className="text-center">
					There are no sessions in your schedule.
				</div>
			);
		}

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
						hideStars={false}
					/>
				</li>
			));

		return <ul className="sessions-list">{result}</ul>;
	}

	render() {
		const { error } = this.context;

		// console.log('sessionList in context = ', this.context.sessionList);
		// console.log('scheduleList in context = ', this.context.scheduleList);
		// console.log('loginUserId in context = ', this.context.loginUserId);

		return (
			<section>
				{error ? (
					<p className="error">
						There was an error, try again.
						<br />
						{error.message ? error.message : JSON.parse(JSON.stringify(error))}
					</p>
				) : (
					this.renderSessions()
				)}

				<LoadingIndicator />
			</section>
		);
	}
}
