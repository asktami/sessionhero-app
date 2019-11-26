import config from '../config';
import TokenService from './token-service';

const SessionApiService = {
	getSessions() {
		if (TokenService.hasAuthToken()) {
			// unprotected endpoint
			// will work even when not logged in
			// pass AuthToken so can use loginUserId when logged in to join sessions + schedule records
			return fetch(`${config.API_ENDPOINT}/sessions`, {
				headers: {
					'content-type': 'application/json',
					authorization: `bearer ${TokenService.getAuthToken()}`
				}
			}).then(res =>
				!res.ok ? res.json().then(e => Promise.reject(e)) : res.json()
			);
		} else {
			return fetch(`${config.API_ENDPOINT}/sessions`, {
				headers: {
					'content-type': 'application/json'
				}
			}).then(res =>
				!res.ok ? res.json().then(e => Promise.reject(e)) : res.json()
			);
		}
	},
	getSchedule() {
		// protected endpoint

		// only get schedule if have loginUserId
		if (TokenService.hasAuthToken()) {
		}
		// loginUserId is retrieved by API when it processes the AuthToken, via jwt-auth.js, which finds the user record using the username stored in the AuthToken and then adds the user record to the req object (i.e req.user = user)
		// so can get loginUserId via req.user.id

		// this will ALWAYS send the loginUserId BECAUSE of the authoriztion header, which has the AuthToken, which is set at time of 1st login with the user record id
		// see auth-api-service

		console.log('CLIENT getting schedule');

		return fetch(`${config.API_ENDPOINT}/schedule`, {
			headers: {
				'content-type': 'application/json',
				authorization: `bearer ${TokenService.getAuthToken()}`
			}
		}).then(res =>
			!res.ok ? res.json().then(e => Promise.reject(e)) : res.json()
		);
	},
	getSession(session_id) {
		// protected endpoint
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
	getComment(commentId) {
		// protected endpoint
		return fetch(`${config.API_ENDPOINT}/comments/${commentId}`, {
			headers: {
				'content-type': 'application/json',
				authorization: `bearer ${TokenService.getAuthToken()}`
			}
		}).then(res =>
			!res.ok ? res.json().then(e => Promise.reject(e)) : res.json()
		);
	},

	// fetch(config.API_ENDPOINT + `/comments/${commentId}`, {
	// 	method: 'GET',
	// 	headers: {
	// 		'content-type': 'application/json',
	// 		authorization: `Bearer ${config.API_KEY}`
	// 	}
	// })
	// 	.then(res => {
	// 		if (!res.ok) return res.json().then(error => Promise.reject(error));

	// 		return res.json();
	// 	})
	// 	.then(responseData => {
	// 		this.setState({
	// 			id: responseData.id,
	// 			text: responseData.text,
	// 			rating: responseData.rating,
	// 			session_id: responseData.session_id
	// 		});
	// 	})
	// 	.catch(error => {
	// 		this.setState({ apiError: error });
	// 	});

	deleteComment(commentId) {
		// protected endpoint
		return fetch(`${config.API_ENDPOINT}/comments/${commentId}`, {
			method: 'DELETE',
			headers: {
				'content-type': 'application/json',
				authorization: `bearer ${TokenService.getAuthToken()}`
			}
		}).then(res =>
			!res.ok ? res.json().then(e => Promise.reject(e)) : res.json()
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
			body: JSON.stringify({
				comment
			})
		}).then(res =>
			!res.ok ? res.json().then(e => Promise.reject(e)) : res.json()
		);
	},
	addComment(session_id, text, rating) {
		// protected endpoint
		return fetch(`${config.API_ENDPOINT}/comments`, {
			method: 'POST',
			headers: {
				'content-type': 'application/json',
				authorization: `bearer ${TokenService.getAuthToken()}`
			},
			body: JSON.stringify({
				session_id: session_id,
				rating,
				text
			})
		}).then(res =>
			!res.ok ? res.json().then(e => Promise.reject(e)) : res.json()
		);
	},

	addScheduleItem(session_id, user_id) {
		// protected endpoint
		return fetch(`${config.API_ENDPOINT}/schedule`, {
			method: 'POST',
			headers: {
				'content-type': 'application/json',
				authorization: `bearer ${TokenService.getAuthToken()}`
			},
			body: JSON.stringify({
				session_id: session_id,
				user_id: user_id
			})
		}).then(res =>
			!res.ok ? res.json().then(e => Promise.reject(e)) : res.json()
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
		}).then(res =>
			!res.ok ? res.json().then(e => Promise.reject(e)) : res.json()
		);
	}
};

export default SessionApiService;
