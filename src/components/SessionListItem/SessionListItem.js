import React, { Component } from 'react';
import AppContext from '../../contexts/AppContext';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	getColor,
	getTime,
	convertDate,
	getDayNumber,
	getDayName
} from '../../components/Utils/Utils';
import './SessionListItem.css';

import SessionApiService from '../../services/session-api-service';

export default class SessionListItem extends Component {
	static contextType = AppContext;

	state = { wasClicked: null };

	// NOTE: I use document.body.style.cursor and state 'wasClicked' because of page render timing issues, to give feedback to user so that they see the app is adding to schedule/removing from schedule messages when the network is slow and that process is taking a while to complete; without it users complained that it looked like nothing was happening

	// a schedule record has both the session_id ANDD logged in user's user_id

	addToSchedule = session_id => {
		// add session to schedule
		// AND add user_id on that session record in sessionList

		this.context.addScheduleItem({
			session_id: session_id,
			user_id: this.context.loginUserId
		});

		// change cursor
		document.body.style.cursor = 'wait';

		// start timer named "starsAdd"
		// console.time('starsAdd');

		SessionApiService.addScheduleItem(session_id)
			.then(() => {
				SessionApiService.getSchedule().then(scheduleResult => {
					SessionApiService.getSessions().then(sessionResult => {
						this.context.setScheduleList(scheduleResult);
						this.context.setSessionList(sessionResult);

						// change cursor back
						document.body.style.cursor = 'default';

						this.setState({ wasClicked: null });

						// end timer named "starsAdd"
						// console.timeEnd('starsAdd');
					});
				});
			})
			.catch(this.context.setError);
	};

	removeFromSchedule = schedule_id => {
		// remove session from schedule
		// AND clear user_id on that session record in sessionList

		this.context.removeScheduleItem(schedule_id);

		// change cursor
		document.body.style.cursor = 'wait';

		SessionApiService.deleteScheduleItem(schedule_id)
			.then(() => {
				SessionApiService.getSchedule().then(scheduleResult => {
					SessionApiService.getSessions().then(sessionResult => {
						// this.context.setScheduleList(scheduleResult);
						this.context.setSessionList(sessionResult);

						// change cursor back
						document.body.style.cursor = 'default';

						this.setState({ wasClicked: null });
					});
				});
			})
			.catch(this.context.setError);
	};

	render() {
		const { loginUserId, setToggleId, toggleId, expandAll } = this.context;
		const { session, pathname } = this.props;

		return (
			<>
				<div className="flex-item-header-row">
					<div>
						<span className="day-name">{getDayName(session.date)}</span>{' '}
						<span className="day-of-week">{getDayNumber(session.date)}</span>
					</div>
					<div className={'track ' + getColor(session.track)}>
						{session.track}
					</div>
				</div>

				<div className="flex-row">
					<div className="flex-col-then-row cell-fixed-width-50">
						<div
							className={
								'cell-fixed-width-25 hide day-right-border border-' +
								getColor(session.track)
							}
						>
							<span className="day-name">{getDayName(session.date)}</span>&nbsp;
							<span className="day-of-week">{getDayNumber(session.date)}</span>
						</div>

						<div
							className={
								'cell-fixed-width-25 time time-right-border border-' +
								getColor(session.track)
							}
						>
							<div>
								{getTime(convertDate(session.date), session.time_start)}
								<br />
								{getTime(convertDate(session.date), session.time_end)}
							</div>
						</div>

						<div className="description">
							{this.props.pathname.includes('/sessions') ? (
								<span className="simple title">{session.name}</span>
							) : (
								<span>
									<Link to={`/sessions/${session.session_id}`}>
										<span className="simple title">{session.name}</span>
									</Link>

									{/* <br />
								session.session_id = {session.session_id}
								<br />
								session.user_id = {session.user_id} */}
								</span>
							)}
							<br />
							<span className="location">{session.location}</span>
						</div>
					</div>

					<div
						className={
							'flex-col-then-row hide track ' + getColor(session.track)
						}
					>
						<div className="track-text">{session.track}</div>
					</div>

					<div className="flex-col">
						{!expandAll && !pathname.includes('/sessions/') ? (
							<button
								className="btn-expand-item"
								aria-expanded="false"
								aria-label="show-session-details-button"
								onClick={() => setToggleId(session.session_id)}
							>
								{toggleId === session.session_id ? (
									<FontAwesomeIcon icon="chevron-up" size="2x" />
								) : (
									<FontAwesomeIcon icon="chevron-down" size="2x" />
								)}
							</button>
						) : null}
						<br />
						{loginUserId &&
						session.user_id === loginUserId &&
						this.props.hideStars === false ? (
							<>
								{session.session_id === this.state.wasClicked ? (
									<span className="processing">
										Removing
										<br />
										from
										<br />
										schedule
									</span>
								) : (
									<button
										className="btn-remove-from-schedule"
										aria-label="add-session-to-schedule-button"
										onClick={() => {
											this.removeFromSchedule(session.schedule_id);
											this.setState({ wasClicked: session.session_id });
										}}
									>
										<FontAwesomeIcon icon={['fas', 'star']} size="2x" />
									</button>
								)}
							</>
						) : null}
						{loginUserId &&
						session.user_id !== loginUserId &&
						this.props.hideStars === false ? (
							<>
								{session.session_id === this.state.wasClicked ? (
									<span className="processing">
										Adding
										<br />
										to
										<br />
										schedule
									</span>
								) : (
									<button
										className="btn-add-to-schedule"
										aria-label="add-session-to-schedule-button"
										onClick={() => {
											this.addToSchedule(session.session_id);
											this.setState({ wasClicked: session.session_id });
										}}
									>
										<FontAwesomeIcon icon={['far', 'star']} size="2x" />
									</button>
								)}
							</>
						) : null}
					</div>
				</div>

				<div
					className={
						'flex-footer-row toggle-content ' +
						(expandAll ||
						toggleId === session.session_id ||
						pathname.includes('/sessions/')
							? 'is-visible'
							: null)
					}
				>
					<div>
						<p className={'simple ' + getColor(session.track)}>
							{session.speaker}
						</p>

						<p className="simple title">Session Description</p>
						<p className="simple">{session.description}</p>

						{session.objective_1 ? (
							<>
								<p className="simple title">Session Objectives</p>

								<ul className="simple objective-list">
									{session.objective_1 ? <li>{session.objective_1}</li> : null}

									{session.objective_2 ? <li>{session.objective_2}</li> : null}

									{session.objective_3 ? <li>{session.objective_3}</li> : null}

									{session.objective_4 ? <li>{session.objective_4}</li> : null}
								</ul>
							</>
						) : null}

						{session.background ? (
							<>
								<p className="simple title">Recommended Background</p>
								<p className="simple">{session.background}</p>
							</>
						) : null}
					</div>
				</div>
			</>
		);
	}
}
