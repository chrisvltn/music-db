/* React */
import React, { Component } from 'react';
import { withRouter, RouteComponentProps } from 'react-router';

/* Providers */
import TheAudioDB from '../../providers/TheAudioDB';
import recentlyViewed from '../../providers/recentlyViewed';

/* Custom components */
import Wrapper from '../../components/UI/Wrapper/Wrapper';
import Container from '../../components/UI/Container/Container';
import Spinner from '../../components/UI/Spinner/Spinner';
import ErrorMessage from '../../components/UI/ErrorMessage/ErrorMessage';
import TrackList from '../../components/Tracks/TrackList/TrackList';
import AlbumBigPicture from '../../components/Album/AlbumBigPicure/AlbumBigPicure';

class AlbumDetailPage extends Component<Props, State> {
	state: State = {
		album: {
			isLoading: true,
			id: '',
			images: {
				thumb: '',
				cover: {
					back: '',
					front: '',
					spine: '',
				},
			},
			title: '',
			year: '',
			artist: {
				id: '',
				name: '',
				style: '',
				formedYear: '',
				images: {
					thumb: '',
					wide: '',
				},
			},
		},
		tracks: {
			isLoading: true,
			error: null,
			list: [],
		},
	}

	componentDidMount() {
		/* These props come from the URL parameters set in App.ts */
		const artistName = this.props.match.params.artistName
		const albumTitle = this.props.match.params.albumTitle

		this.getAlbumInfo(artistName, albumTitle)
	}

	async getAlbumInfo(artistName: string, albumTitle: string) {
		this.setState({
			album: {
				...this.state.album,
				isLoading: true,
			},
		})

		let album: Album | null = null

		try {
			album = await TheAudioDB.getAlbumByArtistNameAndAlbumTitle(artistName, albumTitle)
		} catch {
			return this.props.history.push('/500')
		}

		/* Album is `null` if there is no album found */
		if (!album)
			return this.props.history.push('/404')

		this.getTrackList(album.id)
		this.saveRecentlyViewed(album)

		this.setState({
			album: {
				...this.state.album,
				...album,
				isLoading: false,
			},
		})
	}

	async getTrackList(albumId: string) {
		this.setState({
			tracks: {
				...this.state.tracks,
				list: [],
				isLoading: true,
			}
		})

		let tracks: Track[] = []
		let error = null

		try {
			tracks = await TheAudioDB.getAlbumTracksByAlbumId(albumId)
		} catch {
			error = `We couldn't get the tracks, please try again in a few seconds`
		}

		this.setState({
			tracks: {
				...this.state.tracks,
				error,
				isLoading: false,
				list: tracks,
			}
		})
	}

	async saveRecentlyViewed(album: Album) {
		recentlyViewed.add(album, 'album')
	}

	render() {
		const {
			album,
			tracks,
		} = this.state

		if (!album.isLoading && !album.id) {
			this.props.history.push('/404')
			return null
		}

		return (
			<>
				<AlbumBigPicture
					title={album.title}
					year={album.year}
					frontCover={album.images.cover.front}
					spineCover={album.images.cover.spine}
					backCover={album.images.cover.back}
					artistName={album.artist.name}
				/>

				<Wrapper>
					<Container>
						<TrackList tracks={tracks.list} />
						<Spinner show={tracks.isLoading} />
						<ErrorMessage show={tracks.list.length === 0 && !tracks.isLoading && !tracks.error}>
							There is no track available
						</ErrorMessage>
						<ErrorMessage show={!!tracks.error && !tracks.isLoading}>
							{tracks.error}
						</ErrorMessage>
					</Container>
				</Wrapper>
			</>
		)
	}
}

type Props = RouteComponentProps<{
	artistName: string
	albumTitle: string
}>

type State = {
	album: { isLoading: boolean } & Album
	tracks: {
		isLoading: boolean
		error: string | null
		list: Track[]
	}
}

export default withRouter(AlbumDetailPage)
