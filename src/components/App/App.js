import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Nav from '../Nav/Nav';
import Header from '../Header/Header';
import PrivateRoute from '../Utils/PrivateRoute';
import PublicOnlyRoute from '../Utils/PublicOnlyRoute';
import SessionListPage from '../../routes/SessionListPage/SessionListPage';
import SessionPage from '../../routes/SessionPage/SessionPage';
import ScheduleListPage from '../../routes/ScheduleListPage/ScheduleListPage';

import EditCommentPage from '../../routes/EditCommentPage/EditCommentPage';

import SearchBar from '../SearchBar/SearchBar';

import LoginPage from '../../routes/LoginPage/LoginPage';
import RegistrationPage from '../../routes/RegistrationPage/RegistrationPage';
import NotFoundPage from '../../routes/NotFoundPage/NotFoundPage';
import './App.css';

import TokenService from '../../services/token-service';
import AppContext from '../../contexts/AppContext';

class App extends Component {
	static contextType = AppContext;

	state = { hasError: false };

	static getDerivedStateFromError(error) {
		console.error(error);
		return { hasError: true };
	}

	componentDidMount() {
		this.updateLoginUserId();
	}

	updateLoginUserId = () => {
		let token = TokenService.getAuthToken();
		if (token) {
			let parsed = TokenService.parseJwt(token);
			let loginUserId = parsed.user_id;
			console.log('--------- App result = ', token);
			console.log('--------- App parseJwt = ', parsed);
			console.log('--------- App loginUserId = ', loginUserId);
			this.context.setLoginUserId(loginUserId);
		}
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

						<PrivateRoute path={'/schedule'} component={ScheduleListPage} />

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
