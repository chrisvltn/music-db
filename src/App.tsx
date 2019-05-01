/* React */
import React from 'react';
import Loadable from 'react-loadable'
import { Switch, Route, Redirect } from 'react-router';

/* Custom components */
import Header from './components/Header/Header';
import PageLoading from './components/PageLoading/PageLoading';

/* Route Components */
const AsyncHomePage = Loadable({
	loader: () => import('./routes/HomePage/HomePage'),
	loading: PageLoading,
})
const AsyncArtistDetailsPage = Loadable({
	loader: () => import('./routes/ArtistDetailsPage/ArtistDetailsPage'),
	loading: PageLoading,
})
const AsyncAlbumDetailPage = Loadable({
	loader: () => import('./routes/AlbumDetailPage/AlbumDetailPage'),
	loading: PageLoading,
})
const AsyncNotFoundPage = Loadable({
	loader: () => import('./routes/NotFoundPage/NotFoundPage'),
	loading: PageLoading,
})

const App: React.FC = () =>
	<>
		<Header />

		<Switch>
			<Route exact path="/artist/:artistName/album/:albumTitle" component={AsyncAlbumDetailPage} />
			<Route exact path="/artist/:artistName" component={AsyncArtistDetailsPage} />
			<Route exact path="/dashboard" component={AsyncHomePage} />
			<Route exact path="/404" component={AsyncNotFoundPage} />
			<Redirect from="/" to="/dashboard" exact />
			<Redirect from="/" to="/404" />
		</Switch>
	</>

export default App
