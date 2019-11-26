import { useContext } from 'react';
import config from '../config';
import TokenService from './token-service';
import IdleService from './idle-service';

import AppContext from '../contexts/AppContext';
import SessionApiService from './session-api-service';

const AuthApiService = {
	postUser(user) {
		return fetch(`${config.API_ENDPOINT}/users`, {
			method: 'POST',
			headers: {
				'content-type': 'application/json'
			},
			body: JSON.stringify(user)
		}).then(res =>
			!res.ok ? res.json().then(e => Promise.reject(e)) : res.json()
		);
	},
	postLogin({ username, password }) {
		return fetch(`${config.API_ENDPOINT}/auth/login`, {
			method: 'POST',
			headers: {
				'content-type': 'application/json'
			},
			body: JSON.stringify({ username, password })
		})
			.then(res =>
				!res.ok ? res.json().then(e => Promise.reject(e)) : res.json()
			)
			.then(res => {
				/*
          whenever a login is performed:
          1. save the token in local storage
          2. queue auto logout when the user goes idle
          3. queue a call to the refresh endpoint based on the JWT's exp value
        */

				console.log('auth-api-service = ', res);
				TokenService.saveAuthToken(res.authToken);
				IdleService.regiserIdleTimerResets();
				TokenService.queueCallbackBeforeExpiry(() => {
					AuthApiService.postRefreshToken();
				});

				// GET SCHEDULE HERE instead of on sessionsListPage
				// TBD STOPS Login from continuing onto sessions page!!! And doesn't get the schedule!

				console.log('auth-api-service - GOT HERE 1');

				// use context inside functional component

				// IF I TURN THIS ON IT STOPS LOGIN FROM CONTINUING!!! and does NOT load the schedule!!!
				// const context = useContext(AppContext);

				// SessionApiService.getSchedule()
				// 	.then(context.setScheduleList)
				// 	.catch(context.setError);

				console.log('auth-api-service - GOT HERE 2');
				return res;
			});
	},
	postRefreshToken() {
		return fetch(`${config.API_ENDPOINT}/auth/refresh`, {
			method: 'POST',
			headers: {
				authorization: `Bearer ${TokenService.getAuthToken()}`
			}
		})
			.then(res =>
				!res.ok ? res.json().then(e => Promise.reject(e)) : res.json()
			)
			.then(res => {
				/*
          similar logic to whenever a user logs in, the only differences are:
          - we don't need to queue the idle timers again as the user is already logged in
          - we'll catch the error here as this refresh is happening behind the scenes
        */
				TokenService.saveAuthToken(res.authToken);
				TokenService.queueCallbackBeforeExpiry(() => {
					AuthApiService.postRefreshToken();
				});
				return res;
			})
			.catch(err => {
				console.log('refresh token request error');
				console.error(err);
			});
	}
};

export default AuthApiService;
