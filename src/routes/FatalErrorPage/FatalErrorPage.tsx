/* React */
import React from 'react'

/* Custom components */
import ErrorPage from '../../components/ErrorPage/ErrorPage';

const FatalErrorPage: React.FC = () =>
	<ErrorPage message="Something happened! Please, try to access this page again later." />

export default FatalErrorPage
