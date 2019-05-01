/* React */
import React, { Component } from 'react';
import { withRouter, RouteComponentProps } from 'react-router';

/* Libs */
import axios from '../../lib/axios';

/* Custom components */
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
import SectionTitle from '../../components/UI/SectionTitle/SectionTitle';
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
			list: [],
		},
		album: {
			isLoading: true,
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
		const { data } = await axios.get<ArtistRequest>('/search.php?s=' + artistName)

		if (!data.artists)
			return this.props.history.push('/404')

		const artist = data.artists[0]

		this.setState({
			artist: {
				...this.state.artist,
				isLoading: false,
				name: artist.strArtist,
				id: artist.idArtist,
				formedYear: artist.intFormedYear || artist.intBornYear,
				style: artist.strStyle || artist.strGenre,
				images: {
					thumb: artist.strArtistThumb,
					wide: artist.strArtistWideThumb || artist.strArtistBanner || artist.strArtistClearart || artist.strArtistFanart || artist.strArtistFanart2 || artist.strArtistFanart3,
				},
			}
		})
	}

	async getArtistAlbums(artistName: string) {
		this.setState({
			album: {
				list: [],
				isLoading: true,
			}
		})

		const { data } = await axios.get<AlbumRequest>('/searchalbum.php?s=' + artistName)
		const albums = (data.album || [])
			.filter((item, index) => data.album.findIndex(album => album.idAlbum === item.idAlbum) === index)
			.map(item => ({
				id: item.idAlbum,
				title: item.strAlbum,
				year: item.intYearReleased,
				images: {
					thumb: item.strAlbumThumb,
					cover: {
						front: item.strAlbumThumbHQ || item.strAlbumThumb,
						back: item.strAlbumThumbBack,
						spine: item.strAlbumSpine,
					},
				},
				artist: {
					id: item.idArtist,
					name: item.strArtist,
					style: item.strStyle,
				},
			} as Album))

		this.setState({
			album: {
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

		const { data } = await axios.get<TracksRequest>('/track-top10.php?s=' + artistName)
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
			topTracks: {
				...this.state.topTracks,
				isLoading: false,
				list: tracks,
			}
		})
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
					<ErrorMessage show={topTracks.list.length === 0 && !topTracks.isLoading}>
						There is no top track available
					</ErrorMessage>


					<SectionTitle>
						Albums
					</SectionTitle>
					<Spinner show={album.isLoading} />
					<AlbumList list={album.list} />
					<ErrorMessage show={album.list.length === 0 && !album.isLoading}>
						There is no album available
					</ErrorMessage>
				</Container>
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
	}
	album: {
		list: Album[]
		isLoading: boolean
	}
}

export default withRouter(ArtistDetailsPage)