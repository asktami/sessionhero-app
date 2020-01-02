import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Nav from '../Nav/Nav';
import Header from '../Header/Header';
import PrivateRoute from '../Utils/PrivateRoute';
import PublicOnlyRoute from '../Utils/PublicOnlyRoute';
import SessionListPage from '../../routes/SessionListPage/SessionListPage';
import SessionPage from '../../routes/SessionPage/SessionPage';

import EditCommentPage from '../../routes/EditCommentPage/EditCommentPage';

import SearchBar from '../SearchBar/SearchBar';

import LoginPage from '../../routes/LoginPage/LoginPage';
import RegistrationPage from '../../routes/RegistrationPage/RegistrationPage';
import NotFoundPage from '../../routes/NotFoundPage/NotFoundPage';
import './App.css';

import TokenService from '../../services/token-service';
import AuthApiService from '../../services/auth-api-service';
import IdleService from '../../services/idle-service';

import AppContext from '../../contexts/AppContext';

class App extends Component {
	static contextType = AppContext;

	state = { hasError: false };

	static getDerivedStateFromError(error) {
		// console.error(error);
		return { hasError: true };
	}

	updateLoginUserId = () => {
		let token = TokenService.getAuthToken();
		if (token) {
			let parsed = TokenService.parseJwt(token);
			let loginUserId = parsed.user_id;
			this.context.setLoginUserId(loginUserId);
		}
	};

	componentDidMount() {
		this.updateLoginUserId();
		/*
		  set the function (callback) to call when a user goes idle
		  we'll set this to logout a user when they're idle
		*/
		IdleService.setIdleCallback(this.logoutFromIdle);

		/* if a user is logged in */
		if (TokenService.hasAuthToken()) {
			/*
			tell the idle service to register event listeners
			the event listeners are fired when a user does something, e.g. move their mouse
			if the user doesn't trigger one of these event listeners,
			  the idleCallback (logout) will be invoked
		  */
			IdleService.registerIdleTimerResets();

			/*
			Tell the token service to read the JWT, looking at the exp value
			and queue a timeout just before the token expires
		  */
			TokenService.queueCallbackBeforeExpiry(() => {
				/* the timeout will call this callback just before the token expires */
				AuthApiService.postRefreshToken();
			});
		}
	}

	componentWillUnmount() {
		/*
		  when the app un-mounts,
		  stop the event listeners that auto logout (clear the token from storage)
		*/
		IdleService.unRegisterIdleResets();
		/*
		  and remove the refresh endpoint request
		*/
		TokenService.clearCallbackBeforeExpiry();
	}

	logoutFromIdle = () => {
		/* remove the token from localStorage */
		TokenService.clearAuthToken();
		/* remove any queued calls to the refresh endpoint */
		TokenService.clearCallbackBeforeExpiry();
		/* remove the timeouts that auto logout when idle */
		IdleService.unRegisterIdleResets();
		/*
		  react won't know the token has been removed from local storage,
		  so we need to tell React to re-render
		*/
		this.forceUpdate();
	};

	render() {
		return (
			<>
				<Nav />
				<Header />
				<SearchBar />

				<main className="wrapper">
					{this.state.hasError && (
						<p className="error">There was an error! Oh no!</p>
					)}
					<Switch>
						<Route exact path={'/'} component={SessionListPage} />

						<PublicOnlyRoute path={'/login'} component={LoginPage} />

						<PublicOnlyRoute path={'/register'} component={RegistrationPage} />

						<PrivateRoute
							path={'/sessions/:session_id'}
							component={SessionPage}
						/>

						<PrivateRoute path={'/schedule'} component={SessionListPage} />

						<PrivateRoute
							path={'/comments/:comment_id'}
							component={EditCommentPage}
						/>

						<Route component={NotFoundPage} />
					</Switch>
				</main>
			</>
		);
	}
}

export default App;
