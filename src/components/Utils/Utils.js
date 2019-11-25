import React from 'react';

export function Pipe() {
	return <span className="pipe">{' | '}</span>;
}

export function Required({ className, ...props }) {
	return (
		<span className={['required', className].join(' ')} {...props}>
			&#42;
		</span>
	);
}

// to convert session.track to color
export function getColor(str) {
	return str
		.split(' ')
		.join('-')
		.toLowerCase();
}

// to convert time to 12 hour format
export function getTime(dateStr, timeStr, locale = 'en-US') {
	let time = new Date(dateStr + ' ' + timeStr);
	return time.toLocaleString(locale, {
		hour: 'numeric',
		minute: 'numeric',
		hour12: true
	});
}

// convert date from YYYY-MM-DD to MM-DD-YYYY
export function convertDate(dateStr) {
	return Intl.DateTimeFormat('en-US').format(new Date(dateStr));
}

// to get dayNumber
export function getDayNumber(dateStr, locale = 'en-US') {
	var date = new Date(dateStr);
	return date.toLocaleDateString(locale, { day: 'numeric' });
}

// to get 3 character dayName
export function getDayName(dateStr, locale = 'en-US') {
	var date = new Date(dateStr);
	return date.toLocaleDateString(locale, { weekday: 'short' });
}
