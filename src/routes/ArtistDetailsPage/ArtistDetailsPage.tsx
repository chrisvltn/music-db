/* React */
import React, { Component } from 'react';
import { withRouter, RouteComponentProps } from 'react-router';

/* Providers */
import recentlyViewed from '../../providers/recentlyViewed';
import TheAudioDB from '../../providers/TheAudioDB';

/* Custom components */
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
import SectionTitle from '../../components/UI/SectionTitle/SectionTitle';
import Wrapper from '../../components/UI/Wrapper/Wrapper';
import Container from '../../components/UI/Container/Container';
import ErrorMessage from '../../components/UI/ErrorMessage/ErrorMessage';
import ArtistBigPicture from '../../components/ArtistBigPicture/ArtistBigPicture';
import TrackList from '../../components/Tracks/TrackList/TrackList';
import AlbumList from '../../components/Album/AlbumList/AlbumList';

class ArtistDetailsPage extends Component<Props, State> {
	state: State = {
		artist: {
			isLoading: true,
			name: '',
			id: '',
			formedYear: '',
			style: '',
			images: {
				thumb: '',
				wide: '',
			},
		},
		topTracks: {
			isShowingMore: false,
			isLoading: true,
			error: null,
			list: [],
		},
		album: {
			isLoading: true,
			error: null,
			list: [],
		}
	}

	componentDidMount() {
		const artistName = this.props.match.params.artistName
		this.getArtistInfo(artistName)
		this.getArtistAlbums(artistName)
		this.getTopTracks(artistName)
	}

	async getArtistInfo(artistName: string) {
		let artist: Artist | null = null

		try {
			artist = await TheAudioDB.getArtistByArtistName(artistName)
		} catch {
			return this.props.history.push('/505')
		}

		if (!artist)
			return this.props.history.push('/404')

		this.saveRecentlyViewed(artist)

		this.setState({
			artist: {
				...this.state.artist,
				...artist,
				isLoading: false,
			}
		})
	}

	async getArtistAlbums(artistName: string) {
		this.setState({
			album: {
				...this.state.album,
				list: [],
				isLoading: true,
			}
		})

		let albums: Album[] = []
		let error = null

		try {
			albums = await TheAudioDB.getArtistAlbumsByArtistName(artistName)
		} catch {
			error = `Sorry, we couldn't get the albums, please try again later.`
		}

		this.setState({
			album: {
				error,
				isLoading: false,
				list: albums,
			}
		})
	}

	async getTopTracks(artistName: string) {
		this.setState({
			topTracks: {
				...this.state.topTracks,
				list: [],
				isLoading: true,
			}
		})

		let tracks: Track[] = []
		let error = null

		try {
			tracks = await TheAudioDB.getArtistTopTracksByArtistName(artistName)
		} catch {
			error = `Sorry, we couldn't get the tracks, please try again later.`
		}

		this.setState({
			topTracks: {
				...this.state.topTracks,
				error,
				isLoading: false,
				list: tracks,
			}
		})
	}

	async saveRecentlyViewed(artist: Artist) {
		recentlyViewed.add(artist, 'artist')
	}

	showMoreTracks() {
		this.setState({
			topTracks: {
				...this.state.topTracks,
				isShowingMore: true,
			}
		})
	}

	render() {
		const {
			artist,
			album,
			topTracks,
		} = this.state

		return (
			<>
				<ArtistBigPicture
					name={artist.name}
					imageThumb={artist.images.thumb}
					imageWide={artist.images.wide}
					year={artist.formedYear}
					style={artist.style}
				/>

				<Wrapper>
					<Container>
						<SectionTitle>
							Top tracks
						</SectionTitle>

						<Spinner show={topTracks.isLoading} />

						<TrackList tracks={topTracks.isShowingMore ? topTracks.list : topTracks.list.slice(0, 3)} />
						<Button
							show={topTracks.list.length > 3 && !topTracks.isShowingMore}
							onClick={this.showMoreTracks.bind(this)}
						>
							Show more
						</Button>
						<ErrorMessage show={topTracks.list.length === 0 && !topTracks.isLoading && !topTracks.error}>
							There is no top track available
						</ErrorMessage>
						<ErrorMessage show={!!topTracks.error && !topTracks.isLoading}>
							{topTracks.error}
						</ErrorMessage>


						<SectionTitle>
							Albums
						</SectionTitle>
						<Spinner show={album.isLoading} />
						<AlbumList list={album.list} />
						<ErrorMessage show={album.list.length === 0 && !album.isLoading && !album.error}>
							There is no album available
						</ErrorMessage>
						<ErrorMessage show={!!album.error && !album.isLoading}>
							{album.error}
						</ErrorMessage>
					</Container>
				</Wrapper>
			</>
		)
	}
}

type Props = RouteComponentProps<{ artistName: string }>
type State = {
	artist: Artist & { isLoading: boolean }
	topTracks: {
		list: Track[]
		isLoading: boolean
		isShowingMore: boolean
		error: string | null
	}
	album: {
		list: Album[]
		isLoading: boolean
		error: string | null
	}
}

export default withRouter(ArtistDetailsPage)
