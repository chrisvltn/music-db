import React from 'react'
import { Link } from 'react-router-dom';
import withStyles from 'react-jss'

import logo from '../../assets/images/logo.png'

const Header: React.FC<Props> = ({
	classes,
}) =>
	<div className={classes.header}>
		<Link to="/">
			<img className={classes.image} src={logo} alt="Music DB Logo" />
		</Link>
	</div>

const styles = {
	header: {
		position: 'absolute',
		top: 0,
		left: 0,
		right: 0,
		zIndex: 99,
		display: 'flex',
		padding: [5, 15] as any,
		justifyContent: 'center',
		'&': `
			padding-top: calc(env(safe-area-inset-top) + 5px);
		`
	},
	image: {
		width: 50,
		height: 50,
	},
}

type Props = StyledComponentProps<typeof styles>

export default withStyles(styles)(Header)
