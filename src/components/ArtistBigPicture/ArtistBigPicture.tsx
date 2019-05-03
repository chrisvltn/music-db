import React from 'react'
import withStyles from 'react-jss'

import ColoredBackground from '../UI/ColoredBackground/ColoredBackground';
import Container from '../UI/Container/Container';

const ArtistBigPicture: React.FC<Props> = ({
	classes,
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
			<Container>
				<h3 className={classes.name}>{name}</h3>
				<p className={classes.detail}>{year}</p>
				<p className={classes.detail}>{style}</p>
			</Container>
		</div>
	</div>

const styles = {
	artist: {
		position: 'relative',
	},
	pictureThumb: {
		position: 'absolute',
		width: '100%',
		height: '100vw',
		top: 0,
		left: 0,
		zIndex: 0,
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
		textShadow: {
			x: 4,
			y: 4,
			blur: 10,
			color: 'rgba(0, 0, 0, 0.6)',
		},
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
		margin: { bottom: 5 },
		'@media (min-width: 650px)': {
			fontSize: 34,
		},
		'@media (min-width: 980px)': {
			fontSize: 54,
		},
	},
	detail: {
		fontSize: 14,
		color: '#ecf0f1',
		margin: { bottom: 5 },
		'&:last-child': {
			margin: 0,
		}
	},
}

type Props = StyledComponentProps<typeof styles> & {
	name: string
	imageThumb: string
	imageWide: string
	year: string
	style: string
}

export default withStyles(styles)(ArtistBigPicture)
