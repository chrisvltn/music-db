import React from 'react'
import jss from '../../../lib/jss';

const TrackItem: React.FC<Props> = ({
	number,
	title: name,
	duration,
}) => {
	// Calculates time string in mm:ss format
	let time = '--:--'

	if (duration) {
		const minutes = Math.floor(duration / (1000 * 60))
		const seconds = Math.round((duration / 1000) - (minutes * 60))
		time = minutes.toString().padStart(2, '0') + ':' + seconds.toString().padStart(2, '0')
	}

	return (
		<div className={classes.item}>
			<span className={classes.smallText}>{number}</span>
			<span className={classes.name}>{name}</span>
			<span className={classes.smallText}>{time}</span>
		</div>
	)
}

const { classes } = jss.createStyleSheet({
	item: {
		position: 'relative',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		color: '#ecf0f1',
		'&:after': {
			content: '""',
			display: 'block',
			position: 'absolute',
			left: 50,
			right: 0,
			bottom: 0,
			height: 1,
			backgroundColor: 'rgba(255, 255, 255, 0.2)',
		},
		'&:last-child:after': {
			content: 'none',
		},
		'&:first-child:last-child:after': {
			content: '""',
		},
	},
	text: {
		padding: [10, 0],
		verticalAlign: 'middle',
	},
	smallText: {
		extend: 'text',
		width: 50,
		fontSize: 12,
		color: '#BDBDBD',
		textAlign: 'center',
	},
	name: {
		extend: 'text',
		flex: '1',
		textAlign: 'left',
		fontSize: 16,
	},
}).attach()

type Props = {
	number: number
	title: string
	duration: number
}

export default TrackItem
