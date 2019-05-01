/* React */
import React, { Component } from 'react';
import { withRouter, RouteComponentProps } from 'react-router';

/* Libs */
import jss from '../../lib/jss';
import axios from '../../lib/axios';

/* Custom components */
import SectionTitle from '../../components/UI/SectionTitle/SectionTitle';
import Container from '../../components/UI/Container/Container';
import Spinner from '../../components/UI/Spinner/Spinner';
import AlbumList from '../../components/Album/AlbumList/AlbumList';
import SearchBar from '../../components/SearchBar/SearchBar';

class HomePage extends Component<Props, State> {
	state: State = {
		recentlyViewedArtistsList: [],
		trendingAlbums: {
			list: [],
			isLoading: true,
		},
		trendingSingles: {
			list: [],
			isLoading: true,
		},
	}

	componentDidMount() {
		this.getTrendingAlbums()
		this.getTrendingSingles()
	}

	async getTrendingAlbums() {
		this.setState({
			trendingAlbums: {
				list: [],
				isLoading: true,
			}
		})

		const { data } = await axios.get<TrendingRequest>('/trending.php?country=us&type=itunes&format=albums')

		this.setState({
			trendingAlbums: {
				isLoading: false,
				list: data.trending
					.filter((item, index) => data.trending.findIndex(trending => trending.idAlbum === item.idAlbum) === index)
					.map(item => ({
						id: item.idAlbum,
						title: item.strAlbum,
						images: {
							thumb: item.strAlbumThumb,
							cover: {
								front: item.strAlbumThumb,
							},
						},
						artist: {
							id: item.idArtist,
							name: item.strArtist,
							images: {
								thumb: item.strArtistThumb,
							},
						},
					} as Album)),
			}
		})
	}

	async getTrendingSingles() {
		this.setState({
			trendingSingles: {
				list: [],
				isLoading: true,
			}
		})

		const { data } = await axios.get<TrendingRequest>('/trending.php?country=us&type=itunes&format=singles')

		this.setState({
			trendingSingles: {
				isLoading: false,
				list: data.trending
					.filter((item, index) => data.trending.findIndex(trending => trending.idTrack === item.idTrack) === index)
					.map(item => ({
						id: item.idTrack,
						title: item.strTrack,
						images: {
							thumb: item.strTrackThumb || item.strAlbumThumb,
							cover: {
								front: item.strTrackThumb || item.strAlbumThumb,
							},
						},
						artist: {
							id: item.idArtist,
							name: item.strArtist,
							images: {
								thumb: item.strArtistThumb,
							},
						},
					} as Album)),
			}
		})
	}

	render() {
		const albums = this.state.trendingAlbums
		const singles = this.state.trendingSingles

		return (
			<Container>
				<div className={classes.home}>
					<SearchBar onSubmit={query => this.props.history.push(`/artist/${query}`)} />

					<SectionTitle>
						Trending albums
					</SectionTitle>
					<Spinner show={albums.isLoading} />
					<AlbumList horizontal list={albums.list} />

					<SectionTitle>
						Trending singles
					</SectionTitle>
					<Spinner show={singles.isLoading} />
					<AlbumList horizontal list={singles.list} />
				</div>
			</Container>
		)
	}
}

const { classes } = jss.createStyleSheet({
	home: {
		padding: { top: 60 },
	},
}).attach()

type Props = RouteComponentProps

type State = {
	recentlyViewedArtistsList: Artist[]
	trendingAlbums: {
		list: Album[]
		isLoading: boolean
	}
	trendingSingles: {
		list: Album[]
		isLoading: boolean
	}
}

export default withRouter(HomePage)
