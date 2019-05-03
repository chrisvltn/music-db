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
		const artist = await TheAudioDB.getArtistByArtistName(artistName)

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
				list: [],
				isLoading: true,
			}
		})

		const albums = await TheAudioDB.getArtistAlbumsByArtistName(artistName)

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

		const tracks = await TheAudioDB.getArtistTopTracksByArtistName(artistName)

		this.setState({
			topTracks: {
				...this.state.topTracks,
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
	}
	album: {
		list: Album[]
		isLoading: boolean
	}
}

export default withRouter(ArtistDetailsPage)
