import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export function SessionStarRating({ rating }) {
	const stars = [
		{ filled: false },
		{ filled: false },
		{ filled: false },
		{ filled: false },
		{ filled: false }
	];

	for (let i = 0; i < rating; i++) {
		stars[i].filled = true;
	}

	return (
		<span className="SessionStarRating">
			{stars.map((star, index) => (
				<Star key={index} filled={star.filled} />
			))}
		</span>
	);
}

function Star({ filled }) {
	const library = filled ? 'fas' : 'far';
	return <FontAwesomeIcon icon={[library, 'star']} />;
}
