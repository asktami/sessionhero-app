import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import SessionComments from './SessionComments';

describe(`SessionComments component`, () => {
	const props = {
		match: {
			params: {
				sessionId: 'BUS04'
			}
		},
		comments: [
			{
				id: 1,
				text: 'This thing is amazing.',
				rating: 4,
				date_created: '2019-10-31 23:14:12.649275',
				sessionId: 'BUS04',
				userId: 1
			},
			{
				id: 2,
				text: 'Put a bird on it!',
				rating: 4,
				date_created: '2019-10-31 23:14:12.649275',
				sessionId: 'BUS04',
				userId: 1
			}
		]
	};

	it('renders a SessionComments by default', () => {
		const wrapper = shallow(<SessionComments {...props} />);
		expect(toJson(wrapper)).toMatchSnapshot();
	});

	it('renders the SessionComments given props', () => {
		const wrapper = shallow(<SessionComments {...props} />);
		expect(toJson(wrapper)).toMatchSnapshot();
	});
});
