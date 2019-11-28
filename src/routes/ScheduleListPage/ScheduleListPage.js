import React, { Component } from 'react';
import AppContext from '../../contexts/AppContext';

import SessionApiService from '../../services/session-api-service';
import SessionListItem from '../../components/SessionListItem/SessionListItem';

import './ScheduleListPage.css';

export default class ScheduleListPage extends Component {
	static contextType = AppContext;

	static defaultProps = {
		location: { match: { params: {} } }
	};

	componentDidMount() {
		this.context.clearError();
		this.context.clearFilters();

		SessionApiService.getSchedule()
			.then(this.context.setScheduleList)
			.catch(this.context.setError);
	}

	renderSchedule() {
		const { scheduleList = [] } = this.context;

		// apply search filters: filterDay and filterTrack
		return scheduleList
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
		const { error, scheduleList } = this.context;

		console.log('SCHEDULE LIST PAGE location = ', this.props.location);
		return (
			<section>
				{error ? (
					<p className="error">
						There was an error, try again <br />
						{error}
					</p>
				) : scheduleList.length === 0 ? (
					<p>You haven't added any sessions to your schedule yet.</p>
				) : (
					<ul className="sessions-list">{this.renderSchedule()}</ul>
				)}
			</section>
		);
	}
}
