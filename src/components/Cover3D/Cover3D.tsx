import React, { Component } from 'react'
import jss from '../../lib/jss';

class Cover3D extends Component<Props, State> {
	state = {
		highlightedSide: 'none',
	}

	toggleHighlightedSide(side: string) {
		this.setState({
			highlightedSide: side === this.state.highlightedSide ? 'none' : side,
		})
	}

	render() {
		const {
			front,
			spine,
			back,
		} = this.props

		if (!front && !spine && !back)
			return <div className={classes.wrapper} />

		const hasAllImages = front && spine && back

		const coverClasses = hasAllImages ? [classes.cover] : []

		if (this.state.highlightedSide === 'front')
			coverClasses.push(classes.coverFrontHighlight)

		if (this.state.highlightedSide === 'back')
			coverClasses.push(classes.coverBackHighlight)

		return (
			<div className={classes.wrapper}>
				<div className={coverClasses.join(' ')}>
					{
						hasAllImages ?
							<>
								<img src={front} alt="Front cover" tabIndex={-1} className={classes.front} onClick={() => this.toggleHighlightedSide('front')} />
								<img src={spine} alt="Cover spine" tabIndex={-1} className={classes.spine} />
								<img src={back} alt="Back cover" tabIndex={-1} className={classes.back} onClick={() => this.toggleHighlightedSide('back')} />
							</> :
							<img src={front} alt="Front cover" tabIndex={-1} className={classes.frontOnly} />
					}
				</div>
			</div>
		)
	}
}

const imagesStyle = {
	image: {
		position: 'absolute',
		display: 'inline-block',
		height: 200,
		width: 'auto',
	},
	cover: {
		cursor: 'pointer',
		width: 200,
		transition: [
			{
				property: 'opacity',
				duration: '.2s',
				timingFunction: 'ease',
			}
		],
		'&:hover': {
			opacity: 0.8,
		},
		'&:focus': {
			outline: 'none',
			opacity: 1,
		},
	},
}

const { classes } = jss.createStyleSheet({
	wrapper: {
		textAlign: 'center',
		perspective: 550,
		width: 300,
		height: 230,
		margin: 'auto',
	},
	cover: {
		display: 'inline-block',
		transformStyle: 'preserve-3d',
		transform: 'rotateY(90deg) translateZ(0)',
		transition: [
			{
				property: 'transform',
				duration: '.3s',
				timingFunction: 'ease',
			},
		],
	},
	coverFrontHighlight: {
		transform: 'rotateY(135deg) translateZ(0) translateX(-80px)',
	},
	coverBackHighlight: {
		transform: 'rotateY(45deg) translateZ(0) translateX(-80px)',
	},
	front: {
		extend: [imagesStyle.image, imagesStyle.cover],
		transform: 'rotateY(225deg) translateZ(115px)',
	},
	frontOnly: {
		display: 'inline-block',
		height: 200,
		width: 200,
		margin: { top: 35 },
		boxShadow: {
			x: 5,
			y: 5,
			blur: 5,
			color: 'rgba(0, 0, 0, 0.3)',
		},
	},
	spine: {
		extend: imagesStyle.image,
		width: 10,
		transform: 'rotateY(-90deg) translateZ(60px)',
	},
	back: {
		extend: [imagesStyle.image, imagesStyle.cover],
		transform: 'rotateY(-45deg) translateZ(115px)',
	},
}).attach()

type Props = {
	front: string
	spine: string
	back: string
}

type State = {
	highlightedSide: string
}

export default Cover3D
