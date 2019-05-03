/* React */
import React, { Component } from 'react';
import { withRouter, RouteComponentProps } from 'react-router';

/* Libs */
import withStyles from 'react-jss'
import TheAudioDB from '../../providers/TheAudioDB';

/* Providers */
import recentlyViewed, { RecentlyViewed } from '../../providers/recentlyViewed';

/* Custom components */
import SectionTitle from '../../components/UI/SectionTitle/SectionTitle';
import Wrapper from '../../components/UI/Wrapper/Wrapper';
import Spinner from '../../components/UI/Spinner/Spinner';
import MobileHorizontalScroll from '../../components/UI/MobileHorizontalScroll/MobileHorizontalScroll';
import Container from '../../components/UI/Container/Container';
import AlbumList from '../../components/Album/AlbumList/AlbumList';
import SearchBar from '../../components/SearchBar/SearchBar';
import ThumbItem from '../../components/ThumbItem/ThumbItem';

class HomePage extends Component<Props, State> {
	state: State = {
		recentlyViewed: {
			list: [],
			isLoading: true,
		},
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
		this.getRecentlyViewed()
	}

	async getTrendingAlbums() {
		this.setState({
			trendingAlbums: {
				list: [],
				isLoading: true,
			}
		})

		const trendingAlbums = await TheAudioDB.getTrendingAlbums()

		this.setState({
			trendingAlbums: {
				isLoading: false,
				list: trendingAlbums,
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

		const trendingSingles = await TheAudioDB.getTrendingSingles()

		this.setState({
			trendingSingles: {
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

		const { classes } = this.props

		return (
			<Wrapper>
				<Container className={classes.home}>
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

					<SectionTitle>
						Trending singles
					</SectionTitle>
					<Spinner show={singles.isLoading} />
					<AlbumList horizontal list={singles.list} />
				</Container>
			</Wrapper>
		)
	}
}

const styles = {
	home: {
		padding: { top: 60 },
	},
}

type Props = StyledComponentProps<typeof styles> & RouteComponentProps

type State = {
	recentlyViewed: {
		list: RecentlyViewed
		isLoading: boolean
	}
	trendingAlbums: {
		list: Album[]
		isLoading: boolean
	}
	trendingSingles: {
		list: Album[]
		isLoading: boolean
	}
}

export default withStyles(styles)(withRouter(HomePage))
