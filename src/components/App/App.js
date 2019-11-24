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

class App extends Component {
	state = { hasError: false };

	static getDerivedStateFromError(error) {
		console.error(error);
		return { hasError: true };
	}

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
							path={'/sessions/:sessionId'}
							component={SessionPage}
						/>

						<PrivateRoute path={'/schedule'} component={ScheduleListPage} />

						<PrivateRoute
							path={'/comments/:commentId'}
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
