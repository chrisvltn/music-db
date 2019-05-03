import React from 'react'
import { Link } from 'react-router-dom';
import withStyles from 'react-jss'

import Cover3D from '../../Cover3D/Cover3D';
import ColoredBackground from '../../UI/ColoredBackground/ColoredBackground';

const AlbumBigPicture: React.FC<Props> = ({
	classes,
	title,
	year,
	frontCover,
	spineCover,
	backCover,
	artistName,
}) =>
	<div className={classes.album}>
		<ColoredBackground color="rgba(0, 0, 0, .75)" image={frontCover} />
		<Cover3D
			front={frontCover}
			spine={spineCover}
			back={backCover}
		/>
		<h3 className={classes.title}>{title}</h3>
		<p className={classes.year}>{year}</p>
		<p className={classes.artist}>
			by <Link to={"/artist/" + artistName} className={classes.link}>{artistName}</Link>
		</p>
	</div>

const styles = {
	album: {
		position: 'relative',
		textAlign: 'center',
		padding: [20, 0] as any,
	},
	title: {
		fontSize: 20,
		lineHeight: 1,
		margin: {
			top: 20,
			bottom: 10,
		},
	},
	year: {
		fontSize: 14,
		lineHeight: 1,
		margin: { bottom: 5 },
		color: '#BDBDBD',
	},
	artist: {
		fontSize: 16,
		lineHeight: 1,
		margin: 0,
		color: '#BDBDBD',
	},
	link: {
		'&, &:focus': {
			textDecoration: 'none',
			color: '#ecf0f1',
		}
	},
}

type Props = StyledComponentProps<typeof styles> & {
	title: string
	year: string
	frontCover: string
	spineCover: string
	backCover: string
	artistName: string
}

export default withStyles(styles)(AlbumBigPicture)
