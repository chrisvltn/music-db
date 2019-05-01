/* React */
import React from 'react'
import { Link } from 'react-router-dom';

/* Libs */
import jss from '../../lib/jss';

/* Assets */
import background from '../../assets/images/404-background.jpg'

/* Custom components */
import Container from '../../components/UI/Container/Container';

const NotFoundPage = () =>
	<Container backgroundImage={background}>
		<div className={classes.wrapper}>
			<h2 className={classes.title}>404</h2>
			<h3 className={classes.details}>We couldn't find what you are looking for :(</h3>
			<Link to="/" className={classes.link}>Go back home</Link>
		</div>
	</Container>

const { classes } = jss.createStyleSheet({
	wrapper: {
		display: 'flex',
		justifyContent: 'center',
		flexFlow: 'column',
		textAlign: 'center',
		height: '100%',
	},
	title: {
		fontSize: 54,
		lineHeight: 1,
		margin: { bottom: 10 },
	},
	details: {
		fontSize: 16,
		color: '#BDBDBD',
		fontWeight: 'normal',
		margin: { bottom: 20 },
	},
	link: {
		fontSize: 18,
		lineHeight: 1,
		color: '#ecf0f1',
	},
}).attach()

export default NotFoundPage