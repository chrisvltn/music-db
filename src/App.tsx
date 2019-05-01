/* React */
import React from 'react';
import { Switch, Route, Redirect } from 'react-router';

/* Custom components */
import Header from './components/Header/Header';

/* Route Components */
import HomePage from './routes/HomePage/HomePage';
import ArtistDetailsPage from './routes/ArtistDetailsPage/ArtistDetailsPage';
import AlbumDetailPage from './routes/AlbumDetailPage/AlbumDetailPage';
import NotFoundPage from './routes/NotFoundPage/NotFoundPage';

const App: React.FC = () =>
	<>
		<Header />

		<Switch>
			<Route exact path="/artist/:artistName/album/:albumTitle" component={AlbumDetailPage} />
			<Route exact path="/artist/:artistName" component={ArtistDetailsPage} />
			<Route exact path="/dashboard" component={HomePage} />
			<Route exact path="/404" component={NotFoundPage} />
			<Redirect from="/" to="/dashboard" exact />
			<Redirect from="/" to="/404" />
		</Switch>
	</>

export default App
