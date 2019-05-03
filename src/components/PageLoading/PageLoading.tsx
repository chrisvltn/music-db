/* React */
import React from 'react'
import { LoadingComponentProps } from 'react-loadable';
import { Link } from 'react-router-dom';

/* Libs */
import withStyles from 'react-jss'

/* Custom components */
import Wrapper from '../UI/Wrapper/Wrapper';
import Container from '../UI/Container/Container';
import Spinner from '../UI/Spinner/Spinner';
import withRandomArtistThumbnail, { WithRandomArtistThumbnail } from '../../hoc/withRandomArtistThumbnail/withRandomArtistThumbnail';

const PageLoading: React.FC<Props> = ({
	classes,
	thumb,
	isLoading,
	error,
}) => {
	const element = isLoading ?
		<div className={classes.spinner}>
			<Spinner />
		</div> :
		error ?
			<>
				<h2 className={classes.title}>Error :(</h2>
				<h3 className={classes.details}>The page couldn't be loaded</h3>
				<Link to="/" className={classes.link}>Go back home</Link>
			</>
			: null

	return (
		<Wrapper backgroundImage={thumb}>
			<Container className={classes.wrapper}>
				{element}
			</Container>
		</Wrapper>
	)
}

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
	spinner: {
		fontSize: 27,
	}
}

type Props = StyledComponentProps<typeof styles> & LoadingComponentProps & WithRandomArtistThumbnail

export default withStyles(styles)(withRandomArtistThumbnail(PageLoading))
