import React, { Component, ComponentClass } from 'react'

import recentlyViewed, { RecentlyViewed } from '../../providers/recentlyViewed';

import defaultImage from '../../assets/images/404-background.jpg'

/**
 * Adds a thumbnail image from an recently viewed artist
 * @param WrappedComponent
 */
const withRandomArtistThumbnail = <P extends WithRandomArtistThumbnail>(WrappedComponent: React.ComponentType<P>, defaultValue: boolean = true): ComponentClass<P> =>
	class extends Component<P, State> {
		state: State = {
			image: '',
			stopLoading: null,
		}

		async componentDidMount() {
			const list = await new Promise<RecentlyViewed>((resolve, reject) => {
				this.setState({ stopLoading: reject })
				recentlyViewed.list().then(resolve)
			}).catch(() => {/* This promise is only reject by the `componentWillUnmount` method */ })

			if (!list) return // It happens when the promise is rejected

			const artists = list.filter(item => item.type === 'artist')

			if (!artists.length) {
				this.setState({
					image: defaultImage,
				})
				return
			}

			const index = Math.min(artists.length - 1, Math.round(Math.random() * Math.pow(10, artists.length.toString().length)) % artists.length)
			const image = artists[index].data.images.thumb
			this.setState({ image })
		}

		componentWillUnmount() {
			const { stopLoading } = this.state
			if (stopLoading)
				stopLoading()
		}

		render() {
			return <WrappedComponent thumb={this.state.image} {...this.props} />
		}
	}

export type WithRandomArtistThumbnail = {
	thumb?: string
}

type State = {
	image: string
	stopLoading: Function | null
}

export default withRandomArtistThumbnail
