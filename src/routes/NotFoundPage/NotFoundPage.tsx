/* React */
import React from 'react'

/* Custom components */
import ErrorPage from '../../components/ErrorPage/ErrorPage';

const NotFoundPage: React.FC = () =>
	<ErrorPage message="We couldn't find what you are looking for :(" />

export default NotFoundPage
