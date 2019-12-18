import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import TokenService from '../../services/token-service';
import '../../index.css';

// to get props in Header
import { withRouter } from 'react-router';

class Header extends Component {
	renderMessage() {
		switch (this.props.location.pathname) {
			case '/':
				return (
					<>
						<p>
							Search for{' '}
							<a
								href="http://www.filemaker.com"
								target="_blank"
								rel="noopener noreferrer"
							>
								<u>2019 FileMaker Developer Conference</u>
							</a>{' '}
							sessions, click on stars to add/remove sessions to/from your
							schedule, comment on sessions, and see comments made by others.
						</p>

						<p>
							You need to register to add conference sessions to your schedule
							and comment on sessions.
						</p>

						<p>
							Demo Username: testUser
							<br />
							Demo Password: testUser123@
						</p>
					</>
				);
			default:
				return null;
		}
	}
	render() {
		return (
			<header className="hero">
				<h1>
					<Link to={`/`}>SessionHero</Link>
				</h1>

				{/* check localStorage for login auth */}
				{TokenService.hasAuthToken() ? null : this.renderMessage()}
			</header>
		);
	}
}

export default withRouter(Header);
