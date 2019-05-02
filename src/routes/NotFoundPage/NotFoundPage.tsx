/* React */
import React from 'react'
import { Link } from 'react-router-dom';

/* Libs */
import jss from '../../lib/jss';

/* Custom components */
import Wrapper from '../../components/UI/Wrapper/Wrapper';
import withRandomArtistThumbnail, { WithRandomArtistThumbnail } from '../../hoc/withRandomArtistThumbnail/withRandomArtistThumbnail';
import Container from '../../components/UI/Container/Container';

const NotFoundPage: React.FC<WithRandomArtistThumbnail> = ({
	thumb: background,
}) =>
	<Wrapper backgroundImage={background}>
		<Container className={classes.wrapper}>
			<h2 className={classes.title}>Oops!</h2>
			<h3 className={classes.details}>We couldn't find what you are looking for :(</h3>
			<Link to="/" className={classes.link}>Go back home</Link>
		</Container>
	</Wrapper>

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

export default withRandomArtistThumbnail(NotFoundPage)
