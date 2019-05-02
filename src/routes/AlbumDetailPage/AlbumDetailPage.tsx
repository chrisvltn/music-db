/* React */
import React, { Component } from 'react';
import { withRouter, RouteComponentProps } from 'react-router';

/* Libs */
import axios from '../../lib/axios';

/* Custom components */
import Container from '../../components/UI/Container/Container';
import Spinner from '../../components/UI/Spinner/Spinner';
import ErrorMessage from '../../components/UI/ErrorMessage/ErrorMessage';
import TrackList from '../../components/Tracks/TrackList/TrackList';
import AlbumBigPicture from '../../components/Album/AlbumBigPicure/AlbumBigPicure';
import recentlyViewed from '../../providers/recentlyViewed';

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
			list: [],
		},
	}

	componentDidMount() {
		/* These props come from the URL */
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

		const { data } = await axios.get<AlbumRequest>(`/searchalbum.php`, {
			params: {
				s: artistName,
				a: albumTitle,
			}
		})

		/* Album is `null` if there is no album found */
		if (!data.album)
			return this.props.history.push('/404')

		const album: Album = {
			id: data.album[0].idAlbum,
			title: data.album[0].strAlbum,
			year: data.album[0].intYearReleased,
			images: {
				thumb: data.album[0].strAlbumThumb,
				cover: {
					front: data.album[0].strAlbumThumbHQ || data.album[0].strAlbumThumb,
					back: data.album[0].strAlbumThumbBack,
					spine: data.album[0].strAlbumSpine,
				},
			},
			artist: {
				...this.state.album.artist,
				id: data.album[0].idArtist,
				name: data.album[0].strArtist,
				style: data.album[0].strStyle,
			},
		}

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

		const { data } = await axios.get<TracksRequest>('/track.php', {
			params: {
				m: albumId,
			},
		})

		const tracks = (data.track || [])
			.filter((item, index) => data.track.findIndex(track => track.idTrack === item.idTrack) === index)
			.map(item => ({
				id: item.idTrack,
				title: item.strTrack,
				duration: parseInt(item.intDuration),
				number: parseInt(item.intTrackNumber),
				youtubeLink: item.strMusicVid,
				album: {
					id: item.idAlbum,
					title: item.strAlbum,
					images: {
						thumb: item.strTrackThumb,
						cover: {
							front: item.strTrackThumb,
						},
					},
					artist: {
						id: item.idArtist,
						name: item.strArtist,
						style: item.strStyle,
					},
				},
			} as Track))

		this.setState({
			tracks: {
				...this.state.tracks,
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

				<Container>
					<TrackList tracks={tracks.list} />
					<Spinner show={tracks.isLoading} />
					<ErrorMessage show={tracks.list.length === 0 && !tracks.isLoading}>
						There is no track available
					</ErrorMessage>
				</Container>
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
		list: Track[]
	}
}

export default withRouter(AlbumDetailPage)
