import config from '../config';
import TokenService from './token-service';

const SessionApiService = {
	getSessions() {
		return fetch(`${config.API_ENDPOINT}/sessions`, {
			headers: {
				'content-type': 'application/json',
				authorization: `bearer ${TokenService.getAuthToken()}`
			}
		}).then(res =>
			!res.ok ? res.json().then(e => Promise.reject(e)) : res.json()
		);
	},
	getSchedule(loginUserId) {
		// only get schedule if have loginUserId
		if (loginUserId) {
			return fetch(`${config.API_ENDPOINT}/schedule/users/${loginUserId}`, {
				headers: {
					'content-type': 'application/json',
					authorization: `bearer ${TokenService.getAuthToken()}`
				}
			}).then(res =>
				!res.ok ? res.json().then(e => Promise.reject(e)) : res.json()
			);
		} else {
			// not logged in
			return [];
		}
	},
	getSession(session_id) {
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
