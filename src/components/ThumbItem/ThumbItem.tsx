import React from 'react'
import { Link } from 'react-router-dom';
import withStyles from 'react-jss'

import placeholder from '../../assets/images/thumb-placeholder.png'

const ThumbItem: React.FC<Props> = ({
	classes,
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

const styles = {
	card: {
		display: 'inline-block',
		padding: [0, 5] as any,
		minWidth: 150,
		width: 150,
		verticalAlign: 'top',
		cursor: 'pointer',
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
}

type Props = StyledComponentProps<typeof styles> & {
	title: string
	image: string
	link: string
}

export default withStyles(styles)(ThumbItem)
