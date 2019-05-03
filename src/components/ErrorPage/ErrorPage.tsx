/* React */
import React from 'react'
import { Link } from 'react-router-dom';

/* Libs */
import withStyles from 'react-jss'

/* Custom components */
import Wrapper from '../UI/Wrapper/Wrapper';
import withRandomArtistThumbnail, { WithRandomArtistThumbnail } from '../../hoc/withRandomArtistThumbnail/withRandomArtistThumbnail';
import Container from '../UI/Container/Container';

const ErrorPage: React.FC<Props> = ({
	classes,
	thumb: background,
	message,
}) =>
	<Wrapper backgroundImage={background}>
		<Container className={classes.wrapper}>
			<h2 className={classes.title}>Oops!</h2>
			<h3 className={classes.details}>{message}</h3>
			<Link to="/" className={classes.link}>Go back home</Link>
		</Container>
	</Wrapper>

const styles = {
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
}

type Props = StyledComponentProps<typeof styles> & WithRandomArtistThumbnail & {
	message: string
}

export default withStyles(styles)(withRandomArtistThumbnail(ErrorPage))
