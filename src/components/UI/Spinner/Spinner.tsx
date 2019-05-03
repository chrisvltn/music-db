import React from 'react'
import styles from './Spinner.module.scss'
import withShow from '../../../hoc/withShow/withShow';

/**
 * @see https://projects.lukehaas.me/css-loaders/
 */
const Spinner: React.FC = () =>
	<div className={styles.loader}>
		Loading...
	</div>

export default withShow(Spinner)
