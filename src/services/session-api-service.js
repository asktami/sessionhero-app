import config from '../config';
import TokenService from './token-service';

const SessionApiService = {
	getSessions() {
		// unprotected endpoint
		// will work even when not logged in
		// pass AuthToken so can use loginUserId when logged in to join sessions + schedule records

		console.log('session-api-service Check AUTH TOKEN');

		if (TokenService.hasAuthToken()) {
			console.log('session-api-service HAS AUTH TOKEN');

			return fetch(`${config.API_ENDPOINT}/sessions/`, {
				headers: {
					'content-type': 'application/json',
					authorization: `bearer ${TokenService.getAuthToken()}`
				}
			}).then(res =>
				!res.ok ? res.json().then(e => Promise.reject(e)) : res.json()
			);
		} else {
			console.log('session-api-service NO AUTH TOKEN');

			return fetch(`${config.API_ENDPOINT}/sessions/`, {
				headers: {
					'content-type': 'application/json',
					authorization: `none`
				}
			}).then(res =>
				!res.ok ? res.json().then(e => Promise.reject(e)) : res.json()
			);
		}
	},
	getSchedule() {
		// protected endpoint

		// only get schedule if have loginUserId

		// loginUserId is retrieved by API when it processes the AuthToken, via jwt-auth.js, which finds the user record using the username stored in the AuthToken and then adds the user record to the req object (i.e req.user = user)
		// so can get loginUserId via req.user.id

		// this will ALWAYS send the loginUserId BECAUSE of the authoriztion header, which has the AuthToken, which is set at time of 1st login with the user record id
		// see auth-api-service

		// only getSchedule IF logged in
		if (TokenService.getAuthToken()) {
			return fetch(`${config.API_ENDPOINT}/schedule`, {
				headers: {
					'content-type': 'application/json',
					authorization: `bearer ${TokenService.getAuthToken()}`
				}
			}).then(res =>
				!res.ok ? res.json().then(e => Promise.reject(e)) : res.json()
			);
		}
	},
	getSession(session_id) {
		// protected endpoint

		console.log('session-api-service session_id = ', session_id);

		return fetch(`${config.API_ENDPOINT}/sessions/${session_id}`, {
			headers: {
				'content-type': 'application/json',
				authorization: `bearer ${TokenService.getAuthToken()}`
			}
		}).then(res =>
			!res.ok ? res.json().then(e => Promise.reject(e)) : res.json()
		);
	},
	getSessionComments(session_id) {
		// protected endpoint
		return fetch(`${config.API_ENDPOINT}/sessions/${session_id}/comments`, {
			headers: {
				'content-type': 'application/json',
				authorization: `bearer ${TokenService.getAuthToken()}`
			}
		}).then(res =>
			!res.ok ? res.json().then(e => Promise.reject(e)) : res.json()
		);
	},
	getComment(comment_id) {
		// protected endpoint
		return fetch(`${config.API_ENDPOINT}/comments/${comment_id}`, {
			headers: {
				'content-type': 'application/json',
				authorization: `bearer ${TokenService.getAuthToken()}`
			}
		}).then(res =>
			!res.ok ? res.json().then(e => Promise.reject(e)) : res.json()
		);
	},

	deleteComment(comment_id) {
		// protected endpoint
		return fetch(`${config.API_ENDPOINT}/comments/${comment_id}`, {
			method: 'DELETE',
			headers: {
				'content-type': 'application/json',
				authorization: `bearer ${TokenService.getAuthToken()}`
			}
		}).then(
			res => (!res.ok ? res.json().then(e => Promise.reject(e)) : null)

			// WAS - SyntaxError: Unexpected end of JSON input
			// .then(res =>
			// 	!res.ok ? res.json().then(e => Promise.reject(e)) : res.json()
		);
	},
	editComment(comment) {
		// protected endpoint
		return fetch(`${config.API_ENDPOINT}/comments/${comment.id}`, {
			method: 'PATCH',
			headers: {
				'content-type': 'application/json',
				authorization: `bearer ${TokenService.getAuthToken()}`
			},
			body: JSON.stringify(comment)
		}).then(
			res => (!res.ok ? res.json().then(e => Promise.reject(e)) : null)

			// WAS - SyntaxError: Unexpected end of JSON input
			// .then(res =>
			// 	!res.ok ? res.json().then(e => Promise.reject(e)) : res.json()
		);
	},
	postComment(session_id, comment, rating) {
		// protected endpoint
		return fetch(`${config.API_ENDPOINT}/comments`, {
			method: 'POST',
			headers: {
				'content-type': 'application/json',
				authorization: `bearer ${TokenService.getAuthToken()}`
			},
			body: JSON.stringify({
				session_id,
				comment,
				rating
			})
		}).then(res =>
			!res.ok ? res.json().then(e => Promise.reject(e)) : res.json()
		);
	},

	addScheduleItem(session_id) {
		// protected endpoint
		return fetch(`${config.API_ENDPOINT}/schedule/${session_id}`, {
			method: 'POST',
			headers: {
				'content-type': 'application/json',
				authorization: `bearer ${TokenService.getAuthToken()}`
			},
			body: JSON.stringify({
				session_id
			})
		}).then(
			res => (!res.ok ? res.json().then(e => Promise.reject(e)) : null)

			// WAS - SyntaxError: Unexpected end of JSON input
			// .then(res =>
			// 	!res.ok ? res.json().then(e => Promise.reject(e)) : res.json()
		);
	},

	deleteScheduleItem(schedule_id) {
		// protected endpoint
		return fetch(`${config.API_ENDPOINT}/schedule/${schedule_id}`, {
			method: 'DELETE',
			headers: {
				'content-type': 'application/json',
				authorization: `bearer ${TokenService.getAuthToken()}`
			}
		}).then(
			res => (!res.ok ? res.json().then(e => Promise.reject(e)) : null)

			// WAS - SyntaxError: Unexpected end of JSON input
			// .then(res =>
			// 	!res.ok ? res.json().then(e => Promise.reject(e)) : res.json()
		);
	}
};

export default SessionApiService;
