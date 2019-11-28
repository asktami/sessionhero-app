import React, { Component } from 'react';
import AppContext from '../../contexts/AppContext';
import { Link } from 'react-router-dom';
import { SessionStarRating } from '../../components/SessionStarRating/SessionStarRating';

export default class SessionContents extends Component {
	static contextType = AppContext;

	render() {
		const { loginUserId, session, comments, deleteComment } = this.context;

		return (
			<ul className="comment-list">
				{(comments || []).map(comment => (
					<li key={comment.id} className="comment-item">
						<div className="comment-text">
							{comment.text}
							<br />

							<div className="flex-row comment-footer ">
								<div>
									<SessionStarRating rating={comment.rating} />
									<br />
									<span className="comment-user sponsor">
										{JSON.stringify(comment)}
										<br />
										username: {comment.user.username}
										<br />
										user_id: {comment.user_id}
										<br />
										loginUserId: {loginUserId}
										<br />
										fullname: {comment.user.fullname}
									</span>
								</div>
								{comment.user_id === loginUserId ? (
									<div className="flex-row comment-btns">
										<div>
											<Link
												to={`/comments/${comment.id}?session=${session.name}`}
											>
												<button className="btn-edit-comment">Edit</button>
											</Link>
										</div>
										<div>
											<button
												className="btn-delete-comment"
												onClick={() => deleteComment(comment.id)}
											>
												Delete
											</button>
										</div>
									</div>
								) : null}
							</div>
						</div>
					</li>
				))}
			</ul>
		);
	}
}
