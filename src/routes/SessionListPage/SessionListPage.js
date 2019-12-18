import React, { Component } from 'react';
import AppContext from '../../contexts/AppContext';

import SessionApiService from '../../services/session-api-service';
import SessionListItem from '../../components/SessionListItem/SessionListItem';

import './SessionListPage.css';

// using trackPromise so can use LoadingIndicator
import { trackPromise } from 'react-promise-tracker';
import LoadingIndicator from '../../components/LoadingIndicator/LoadingIndicator';

export default class SessionListPage extends Component {
	static contextType = AppContext;

	static defaultProps = {
		location: { match: { params: {} } }
	};

	componentDidMount() {
		this.context.clearError();
		this.context.clearFilters();

		console.time('stars');
		trackPromise(
			Promise.all([
				SessionApiService.getSchedule(),
				SessionApiService.getSessions()
			])
				.then(results => {
					console.timeEnd('stars');

					const schedule = results[0];
					const sessions = results[1];

					this.context.setScheduleList(schedule);
					this.context.setSessionList(sessions);
				})
				.catch(this.context.setError)
		);
	}

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
						hideStars={false}
					/>
				</li>
			));

		if (result.length === 0) {
			return <div className="text-center">No results.</div>;
		} else {
			return <ul className="sessions-list">{result}</ul>;
		}
	}

	render() {
		const { error } = this.context;

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
