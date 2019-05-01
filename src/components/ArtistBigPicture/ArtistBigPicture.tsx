import React from 'react'
import jss from '../../lib/jss';

import ColoredBackground from '../UI/ColoredBackground/ColoredBackground';

const ArtistBigPicture: React.FC<Props> = ({
	name,
	imageThumb,
	imageWide,
	year,
	style,
}) =>
	<div className={classes.artist}>
		<div style={{ backgroundImage: `url('${imageThumb}')` }} className={classes.pictureThumb} />
		<div style={{ backgroundImage: `url('${imageWide}')` }} className={classes.pictureWide} />
		<ColoredBackground color="rgba(0, 0, 0, 0)" image={imageThumb} />

		<div className={classes.overlay}>
			<h3 className={classes.name}>{name}</h3>
			<p className={classes.detail}>{year}</p>
			<p className={classes.detail}>{style}</p>
		</div>
	</div>

const { classes } = jss.createStyleSheet({
	artist: {
		position: 'relative',
	},
	pictureThumb: {
		position: 'absolute',
		width: '100%',
		height: '100vw',
		top: 0,
		left: 0,
		zIndex: -1,
		backgroundSize: 'cover',
		'@media (min-width: 650px)': {
			display: 'none',
		},
	},
	pictureWide: {
		position: 'absolute',
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		backgroundSize: 'cover',
		backgroundPosition: 'top center',
		zIndex: 1,
		display: 'none',
		'@media (min-width: 650px)': {
			display: 'block',
		},
	},
	overlay: {
		position: 'relative',
		display: 'flex',
		justifyContent: 'flex-end',
		flexFlow: 'column',
		padding: 10,
		width: '100%',
		height: '100vw',
		backgroundColor: 'rgba(0, 0, 0, .22)',
		zIndex: 1,
		boxShadow: {
			inset: 'inset',
			x: 0,
			y: -120,
			blur: 40,
			color: 'rgba(0, 0, 0, 0.22)',
		},
		'@media (min-width: 650px)': {
			maxHeight: 300,
		},
	},
	name: {
		fontSize: 22,
		color: '#ecf0f1',
		margin: {
			top: 0,
			left: 0,
			right: 0,
			bottom: 5,
		},
	},
	detail: {
		fontSize: 14,
		color: '#ecf0f1',
		margin: {
			top: 0,
			left: 0,
			right: 0,
			bottom: 5,
		},
		'&:last-child': {
			margin: 0,
		}
	},
}).attach()

type Props = {
	name: string
	imageThumb: string
	imageWide: string
	year: string
	style: string
}

export default ArtistBigPicture
