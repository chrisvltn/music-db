import React, { Component, ComponentClass } from 'react'

import recentlyViewed from '../../providers/recentlyViewed';

import defaultImage from '../../assets/images/404-background.jpg'

/**
 * Adds a thumbnail image from an recently viewed artist
 * @param WrappedComponent
 */
const withRandomArtistThumbnail = <P extends WithRandomArtistThumbnail>(WrappedComponent: React.ComponentType<P>, defaultValue: boolean = true): ComponentClass<P> =>
	class extends Component<P, State> {
		state = {
			image: ''
		}

		async componentDidMount() {
			const list = await recentlyViewed.list()
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

		render() {
			return <WrappedComponent thumb={this.state.image} {...this.props} />
		}
	}

export type WithRandomArtistThumbnail = {
	thumb?: string
}

type State = {
	image: string
}

export default withRandomArtistThumbnail
