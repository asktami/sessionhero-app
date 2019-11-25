import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import SessionListItem from './SessionListItem';

describe(`SessionListItem component`, () => {
	const props = {
		pathname: '',
		session: {
			user_id: 1,
			track: 'Business',
			day: 'tue',
			date: '8/6/2019',
			time_start: '14:45:00',
			time_end: '15:15:00',
			location: 'Osceola 1 - 3',
			id: 'BUS04',
			name: 'FileMaker in Action  Custom Apps for Manufacturing and Warehouses',
			description:
				"In this session, we'll cover topics that relate well to the manufacturing/warehouse space. First, two approaches to inventory; one easy-to-implement solution with unstored calcs, and a more complex solution using static fields with scripted amount updates. Next, we'll go over the creation of labels for the warehouse and how we've used automation to save a LOT of time, including taking a 60 or 90 minute process per shipment down to 30 to 60 seconds. Optionally, as time permits in the session, we will cover some of the practicalities of using FileMaker in a warehouse space.",
			background:
				'Attendees should have a basic understanding of one to many relationships, calculation fields, and global fields.',
			objective_1: 'An easy approach to inventory using calculation fields',
			objective_2:
				'A more complex approach to inventory using script updates to static fields',
			objective_3:
				'Label creation within FileMaker to save a lot of time (looping is key)',
			objective_4: 'Practicalities of FileMaker in a warehouse space',
			speaker: 'Bradley Boggs (Chameleon Like, Inc.)'
		}
	};

	it('renders a SessionListItem by default', () => {
		const wrapper = shallow(<SessionListItem {...props} />);
		expect(toJson(wrapper)).toMatchSnapshot();
	});

	it('renders the SessionListItem given props', () => {
		const wrapper = shallow(<SessionListItem {...props} />);
		expect(toJson(wrapper)).toMatchSnapshot();
	});
});
