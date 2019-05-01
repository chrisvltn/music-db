import React from 'react'
import { Link } from 'react-router-dom';
import jss from '../../../lib/jss';

import placeholder from '../../../assets/images/thumb-placeholder.png'

const AlbumItem: React.FC<Props> = ({
	title,
	image,
	link,
}) => {
	const displayedImage = !image || image.indexOf('upload_icon') > -1 ? placeholder : image

	return (
		<Link className={classes.card} to={link}>
			<img className={classes.image} src={displayedImage} alt={title} />
			<h3 className={classes.title}>{title}</h3>
		</Link>
	)
}

const { classes } = jss.createStyleSheet({
	card: {
		display: 'inline-block',
		padding: [0, 5],
		minWidth: 150,
		width: 150,
		verticalAlign: 'top',
	},
	image: {
		display: 'block',
		width: 'auto',
		height: 'auto',
		minHeight: 150,
		maxHeight: 150,
		maxWidth: '100%',
		margin: { bottom: 10 },
	},
	title: {
		textAlign: 'center',
		fontSize: 14,
		color: '#ecf0f1',
		whiteSpace: 'normal',
	},
}).attach()

type Props = {
	title: string
	image: string
	link: string
}

export default AlbumItem
