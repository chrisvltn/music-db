import React from 'react';
import { Router, Route } from 'react-router';
import { createBrowserHistory } from 'history';

import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import ArtistDetailsPage from './ArtistDetailsPage';
import TheAudioDB from '../../providers/TheAudioDB';
import ArtistBigPicture from '../../components/ArtistBigPicture/ArtistBigPicture';

configure({ adapter: new Adapter() });

it('should get artist data', async () => {
	const history = createBrowserHistory()
	history.push('/artist/Coldplay')

	TheAudioDB.getArtistByArtistName = jest.fn(TheAudioDB.getArtistByArtistName)

	mount(
		<Router history={history}>
			<Route path="/artist/:artistName">
				<ArtistDetailsPage />
			</Route>
		</Router>
	);

	expect(TheAudioDB.getArtistByArtistName).toBeCalled()
})

it('should render artist data', async () => {
	const history = createBrowserHistory()
	const name = 'Red Hot Chili Peppers'
	history.push('/artist/' + name)

	TheAudioDB.getArtistByArtistName = () => ({ name }) as any

	const wrapper = mount(
		<Router history={history}>
			<Route path="/artist/:artistName">
				<ArtistDetailsPage />
			</Route>
		</Router>
	);

	/* As the artist is searched asynchronously, it should wait asynchronously here as well */
	await new Promise(resolve => {
		setTimeout(() => {
			const nameElement = wrapper.find(ArtistBigPicture).find('h3')
			expect(nameElement.text()).toEqual(name)
			resolve()
		})
	})
})

it('should redirect to 404', async () => {
	const history = createBrowserHistory()
	history.push('/artist/Coldpray')

	TheAudioDB.getArtistByArtistName = () => null as any

	new Promise(resolve => {
		history.listen(location => {
			expect(location.pathname).toEqual('/404')
			resolve()
		})
	})

	mount(
		<Router history={history}>
			<Route path="/artist/:artistName">
				<ArtistDetailsPage />
			</Route>
		</Router>
	);
})

it('should redirect to 500', async () => {
	const history = createBrowserHistory()
	history.push('/artist/Coldpray')

	TheAudioDB.getArtistByArtistName = () => { throw new Error() }

	new Promise(resolve => {
		history.listen(location => {
			expect(location.pathname).toEqual('/500')
			resolve()
		})
	})

	mount(
		<Router history={history}>
			<Route path="/artist/:artistName">
				<ArtistDetailsPage />
			</Route>
		</Router>
	);
})
