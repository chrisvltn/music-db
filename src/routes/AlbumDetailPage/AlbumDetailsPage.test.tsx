import React from 'react';
import { Router, Route } from 'react-router';
import { createBrowserHistory } from 'history';

import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import TheAudioDB from '../../providers/TheAudioDB';
import AlbumBigPicture from '../../components/Album/AlbumBigPicture/AlbumBigPicture';
import AlbumDetailPage from './AlbumDetailPage';

configure({ adapter: new Adapter() });

it('should get album data', async () => {
	const history = createBrowserHistory()
	history.push('/artist/Red Hot Chili Peppers/album/Stadium Arcadium')

	TheAudioDB.getAlbumByArtistNameAndAlbumTitle = jest.fn(TheAudioDB.getAlbumByArtistNameAndAlbumTitle)

	mount(
		<Router history={history}>
			<Route exact path="/artist/:artistName/album/:albumName">
				<AlbumDetailPage />
			</Route>
		</Router>
	);

	expect(TheAudioDB.getAlbumByArtistNameAndAlbumTitle).toBeCalled()
})

it('should render album data', async () => {
	const history = createBrowserHistory()
	const name = 'Red Hot Chili Peppers'
	const album = 'Stadium Arcadium'
	history.push(`/artist/${name}/album/${album}`)

	TheAudioDB.getAlbumByArtistNameAndAlbumTitle = () => ({
		title: album,
		images: {
			thumb: '',
			cover: {
				front: '',
			},
		},
		artist: {
			name,
		},
	}) as any

	const wrapper = mount(
		<Router history={history}>
			<Route exact path="/artist/:artistName/album/:albumName">
				<AlbumDetailPage />
			</Route>
		</Router>
	);

	/* As the album is searched asynchronously, it should wait asynchronously here as well */
	await new Promise(resolve => {
		setTimeout(() => {
			const nameElement = wrapper.find(AlbumBigPicture).find('h3')
			expect(nameElement.text()).toEqual(album)
			resolve()
		})
	})
})

it('should redirect to 404', async () => {
	const history = createBrowserHistory()
	history.push('/artist/Red Hot Chili Peppers/album/Random Album')

	TheAudioDB.getAlbumByArtistNameAndAlbumTitle = () => null as any

	new Promise(resolve => {
		history.listen(location => {
			expect(location.pathname).toEqual('/404')
			resolve()
		})
	})

	mount(
		<Router history={history}>
			<Route exact path="/artist/:artistName/album/:albumName">
				<AlbumDetailPage />
			</Route>
		</Router>
	);
})

it('should redirect to 500', async () => {
	const history = createBrowserHistory()
	history.push('/artist/Red Hot Chili Peppers/album/Random Album')

	TheAudioDB.getAlbumByArtistNameAndAlbumTitle = () => { throw new Error() }

	new Promise(resolve => {
		history.listen(location => {
			expect(location.pathname).toEqual('/500')
			resolve()
		})
	})

	mount(
		<Router history={history}>
			<Route exact path="/artist/:artistName/album/:albumName">
				<AlbumDetailPage />
			</Route>
		</Router>
	);
})
