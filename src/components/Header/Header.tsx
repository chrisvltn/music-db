import React from 'react'
import { NavLink, Link } from 'react-router-dom';
import { withRouter, RouteComponentProps } from 'react-router';
import jss from '../../lib/jss';

import logo from '../../assets/images/logo.png'

const Header: React.FC<RouteComponentProps> = () =>
	<div className={classes.header}>
		<Link to="/">
			<img className={classes.image} src={logo} alt="Music DB Logo" />
		</Link>
	</div>

const { classes } = jss.createStyleSheet({
	header: {
		position: 'absolute',
		top: 0,
		left: 0,
		right: 0,
		zIndex: 99,
		display: 'flex',
		padding: [5, 15],
		justifyContent: 'center',
	},
	image: {
		width: 50,
		height: 50,
	},
}).attach()

export default withRouter(Header)
