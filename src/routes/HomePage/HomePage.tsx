/* React */
import React, { Component } from 'react';
import { withRouter, RouteComponentProps } from 'react-router';

/* Libs */
import withStyles from 'react-jss'

/* Providers */
import recentlyViewed, { RecentlyViewed } from '../../providers/recentlyViewed';
import TheAudioDB from '../../providers/TheAudioDB';

/* Custom components */
import SectionTitle from '../../components/UI/SectionTitle/SectionTitle';
import Wrapper from '../../components/UI/Wrapper/Wrapper';
import Spinner from '../../components/UI/Spinner/Spinner';
import MobileHorizontalScroll from '../../components/UI/MobileHorizontalScroll/MobileHorizontalScroll';
import Container from '../../components/UI/Container/Container';
import AlbumList from '../../components/Album/AlbumList/AlbumList';
import SearchBar from '../../components/SearchBar/SearchBar';
import ThumbItem from '../../components/ThumbItem/ThumbItem';
import ErrorMessage from '../../components/UI/ErrorMessage/ErrorMessage';
import withRandomArtistThumbnail, { WithRandomArtistThumbnail } from '../../hoc/withRandomArtistThumbnail/withRandomArtistThumbnail';

class HomePage extends Component<Props, State> {
	state: State = {
		recentlyViewed: {
			list: [],
			isLoading: true,
		},
		trendingAlbums: {
			list: [],
			isLoading: true,
			error: null,
		},
		trendingSingles: {
			list: [],
			isLoading: true,
			error: null,
		},
	}

	componentDidMount() {
		this.getTrendingAlbums()
		this.getTrendingSingles()
		this.getRecentlyViewed()
	}

	async getTrendingAlbums() {
		this.setState({
			trendingAlbums: {
				...this.state.trendingAlbums,
				list: [],
				isLoading: true,
			}
		})

		let error = null
		let trendingAlbums: Album[] = []

		try {
			trendingAlbums = await TheAudioDB.getTrendingAlbums()
		} catch {
			error = `Sorry, we couldn't get the trending albums, please try again later.`
		}

		this.setState({
			trendingAlbums: {
				...this.state.trendingAlbums,
				error,
				isLoading: false,
				list: trendingAlbums,
			}
		})
	}

	async getTrendingSingles() {
		this.setState({
			trendingSingles: {
				...this.state.trendingSingles,
				list: [],
				isLoading: true,
			}
		})

		let error = null
		let trendingSingles: Album[] = []

		try {
			trendingSingles = await TheAudioDB.getTrendingSingles()
		} catch {
			error = `Sorry, we couldn't get the trending singles, please try again later.`
		}

		this.setState({
			trendingSingles: {
				...this.state.trendingSingles,
				error,
				isLoading: false,
				list: trendingSingles,
			}
		})
	}

	async getRecentlyViewed() {
		this.setState({
			recentlyViewed: {
				list: [],
				isLoading: true,
			}
		})

		const list = await recentlyViewed.list()

		this.setState({
			recentlyViewed: {
				list,
				isLoading: false,
			}
		})
	}

	render() {
		const { recentlyViewed } = this.state
		const albums = this.state.trendingAlbums
		const singles = this.state.trendingSingles

		const {
			thumb,
			classes,
		} = this.props

		return (
			<Wrapper backgroundImage={thumb}>
				<Container>
					<div className={classes.home}>
						<SearchBar onSubmit={query => this.props.history.push(`/artist/${query}`)} />

						{recentlyViewed.list.length ?
							<>
								<SectionTitle>
									Recently Viewed
								</SectionTitle>

								<MobileHorizontalScroll>
									{
										recentlyViewed.list.map(item =>
											<ThumbItem
												key={item.data.id}
												link={item.type === 'album' ? `/artist/${item.data.artist.name}/album/${item.data.title}` : `/artist/${item.data.name}`}
												title={item.type === 'album' ? item.data.title : item.data.name}
												image={item.data.images.thumb}
											/>
										)
									}
								</MobileHorizontalScroll>
							</>
							: null
						}

						<SectionTitle>
							Trending albums
						</SectionTitle>
						<Spinner show={albums.isLoading} />
						<AlbumList horizontal list={albums.list} />
						<ErrorMessage show={!!albums.error && !albums.isLoading}>
							{albums.error}
						</ErrorMessage>

						<SectionTitle>
							Trending singles
						</SectionTitle>
						<Spinner show={singles.isLoading} />
						<AlbumList horizontal list={singles.list} />
						<ErrorMessage show={!!singles.error && !singles.isLoading}>
							{singles.error}
						</ErrorMessage>
					</div>
				</Container>
			</Wrapper>
		)
	}
}

const styles = {
	home: {
		paddingTop: 60,
		'&': `
			padding-top: calc(env(safe-area-inset-top) + 60px);
		`
	},
}

type Props = StyledComponentProps<typeof styles> & RouteComponentProps & WithRandomArtistThumbnail

type State = {
	recentlyViewed: {
		list: RecentlyViewed
		isLoading: boolean
	}
	trendingAlbums: {
		list: Album[]
		isLoading: boolean
		error: string | null
	}
	trendingSingles: {
		list: Album[]
		isLoading: boolean
		error: string | null
	}
}

export default withStyles(styles)(withRouter(withRandomArtistThumbnail(HomePage)))
