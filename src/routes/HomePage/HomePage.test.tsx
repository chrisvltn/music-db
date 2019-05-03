import React from 'react';
import { MemoryRouter } from 'react-router';

import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import recentlyViewed from '../../providers/recentlyViewed';

import HomePage from './HomePage';
import ThumbItem from '../../components/ThumbItem/ThumbItem';

configure({ adapter: new Adapter() });

it('should render recently viewed', async () => {
	recentlyViewed.list = () => [
		{ data: { id: 1, images: { thumb: '' } }, type: 'artist' },
		{ data: { id: 2, images: { thumb: '' } }, type: 'artist' },
		{ data: { id: 3, images: { thumb: '' } }, type: 'artist' },
	] as any

	const wrapper = mount(
		<MemoryRouter>
			<HomePage />
		</MemoryRouter>
	);

	await recentlyViewed.list()
	wrapper.update()

	expect(wrapper.find(ThumbItem)).toHaveLength((await recentlyViewed.list()).length)
})
