import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import AppContext from '../../contexts/AppContext';
import TokenService from '../../services/token-service';
import { Pipe } from '../../components/Utils/Utils';
import '../../index.css';

// to get props in Nav
import { withRouter } from 'react-router';

class Nav extends Component {
	static contextType = AppContext;

	handleLogoutClick = () => {
		TokenService.clearAuthToken();
		this.context.setLoginUserId('');
	};

	renderLogoutLink() {
		return (
			<nav>
				<div>
					<Link to="/schedule">Schedule</Link>
					<Pipe />
					<Link to="/">Sessions</Link>
					<Pipe />
					<Link onClick={this.handleLogoutClick} to="/">
						Logout
					</Link>
				</div>
			</nav>
		);
	}

	renderLoginLink() {
		return (
			<div>
				<Link to="/login">Log in</Link>
				<Pipe />
				<Link to="/register">Register</Link>
			</div>
		);
	}

	render() {
		return (
			<>
				<nav>
					<div>
						<Link to="/" className="logo">
							SessionHero
						</Link>
					</div>

					{/* check localStorage for login auth */}
					{TokenService.hasAuthToken()
						? this.renderLogoutLink()
						: this.renderLoginLink()}
				</nav>
			</>
		);
	}
}

export default withRouter(Nav);
