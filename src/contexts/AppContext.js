import React, { Component } from 'react';

const AppContext = React.createContext({
	setLoginUserId: () => {},
	loginUserId: '',
	sessionList: [],
	scheduleList: [],
	error: null,
	setError: () => {},
	clearError: () => {},
	setSessionList: () => {},
	setScheduleList: () => {},
	setFilterDay: () => {},
	setFilterTrack: () => {},
	clearFilters: () => {},
	setToggleId: () => {},
	toggleExpandAll: () => {},
	session: [],
	comments: [],
	setSession: () => {},
	setComments: () => {},
	clearSession: () => {},
	addComment: () => {},
	editComment: () => {},
	deleteComment: () => {},
	addScheduleItem: () => {},
	removeScheduleItem: () => {}
});
export default AppContext;

export class AppProvider extends Component {
	state = {
		loginUserId: '',
		sessionList: [],
		scheduleList: [],
		error: null,
		filterDay: '',
		filterTrack: '',
		toggleId: '',
		expandAll: false,
		session: [],
		comments: []
	};

	setLoginUserId = id => {
		this.setState({ loginUserId: id });
	};

	setError = error => {
		// TBD How to get the value of the error!???
		// How do I set error in the API so I can get the message via error.message?
		console.table(error);

		// {
		// 	Object.values(error)[0].message;
		// }
		// {
		// 	console.log('Object.values =', Object.values(error)[0].message);
		// }

		this.setState({ error });

		// this.setState({ error: Object.values(error)[0].message });
	};

	clearError = () => {
		this.setState({ error: null });
	};

	setSessionList = sessionList => {
		this.setState({ sessionList });
	};

	setScheduleList = scheduleList => {
		this.setState({ scheduleList });
	};

	setFilterDay = day => {
		this.setState({
			filterDay: day
		});
	};

	setFilterTrack = track => {
		this.setState({
			filterTrack: track
		});
	};

	clearFilters = e => {
		this.setState({ filterDay: '' });
		this.setState({ filterTrack: '' });
	};

	toggleExpandAll = () => {
		this.setState({
			expandAll: !this.state.expandAll
		});
	};

	setToggleId = id => {
		if (this.state.toggleId === id) {
			this.setState({
				toggleId: ''
			});
		} else {
			this.setState({
				toggleId: id
			});
		}
	};

	setSession = session => {
		this.setState({ session });
	};

	setComments = comments => {
		this.setState({ comments });
	};

	clearSession = () => {
		this.setSession([]);
		this.setComments([]);
	};

	addComment = comment => {
		this.setComments([...this.state.comments, comment]);
	};

	editComment = updatedComment => {
		const newComments = this.state.comments.map(comment =>
			comment.id !== updatedComment.id ? comment : updatedComment
		);

		this.setComments(newComments);
	};

	deleteComment = commentId => {
		const newComments = this.state.comments.filter(
			comment => comment.id !== commentId
		);

		this.setComments(newComments);
	};

	addScheduleItem = item => {
		this.setScheduleList([...this.state.scheduleList, item]);
	};

	removeScheduleItem = scheduleId => {
		const newScheduleList = this.state.scheduleList.filter(
			schedule => schedule.id !== scheduleId
		);
		this.setScheduleList(newScheduleList);
	};

	render() {
		const value = {
			setLoginUserId: this.setLoginUserId,
			loginUserId: this.state.loginUserId,
			error: this.state.error,
			setError: this.setError,
			clearError: this.clearError,
			sessionList: this.state.sessionList,
			scheduleList: this.state.scheduleList,
			setSessionList: this.setSessionList,
			setScheduleList: this.setScheduleList,
			setFilterDay: this.setFilterDay,
			setFilterTrack: this.setFilterTrack,
			filterDay: this.state.filterDay,
			filterTrack: this.state.filterTrack,
			clearFilters: this.clearFilters,
			setToggleId: this.setToggleId,
			toggleId: this.state.toggleId,
			toggleExpandAll: this.toggleExpandAll,
			expandAll: this.state.expandAll,
			session: this.state.session,
			comments: this.state.comments,
			setSession: this.setSession,
			setComments: this.setComments,
			clearSession: this.clearSession,
			addComment: this.addComment,
			editComment: this.editComment,
			deleteComment: this.deleteComment,
			addScheduleItem: this.addScheduleItem,
			removeScheduleItem: this.removeScheduleItem
		};
		return (
			<AppContext.Provider value={value}>
				{this.props.children}
			</AppContext.Provider>
		);
	}
}
