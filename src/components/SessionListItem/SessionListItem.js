import React, { Component } from 'react';
import AppContext from '../../contexts/AppContext';

import TokenService from '../../services/token-service';

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

export default class SessionListItem extends Component {
	static contextType = AppContext;

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
							<span>
								<Link to={`/sessions/${session.id}`}>
									<span className="simple title">{session.name}</span>
								</Link>
							</span>
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
								onClick={() => setToggleId(session.id)}
							>
								{toggleId === session.id ? (
									<FontAwesomeIcon icon="chevron-up" size="2x" />
								) : (
									<FontAwesomeIcon icon="chevron-down" size="2x" />
								)}
							</button>
						) : null}

						{/* need to be loggedIn AND session.user_id === loggedIn user_id */}

						{loginUserId && session.user_id === loginUserId ? (
							<button
								className="btn-remove-from-schedule"
								aria-label="add-session-to-schedule-button"
								onClick={() => this.removeFromSchedule(session.id)}
							>
								FILLED user_id = {session.user_id}, has token ={' '}
								{TokenService.hasAuthToken()} <br />
								<FontAwesomeIcon icon={['fas', 'star']} size="2x" />
							</button>
						) : null}

						{loginUserId && session.user_id !== loginUserId ? (
							<button
								className="btn-add-to-schedule"
								aria-label="add-session-to-schedule-button"
								onClick={() => this.addToSchedule(session.id)}
							>
								user_id = {session.user_id}, has token ={' '}
								{TokenService.hasAuthToken()} <br />
								<br />
								<FontAwesomeIcon icon={['far', 'star']} size="2x" />
							</button>
						) : null}
					</div>
				</div>

				<div
					className={
						'flex-footer-row toggle-content ' +
						(expandAll ||
						toggleId === session.id ||
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
