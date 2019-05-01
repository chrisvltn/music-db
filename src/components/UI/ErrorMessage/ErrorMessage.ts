import React, { HTMLProps } from 'react'
import styled from 'styled-jss'
import withShow from '../../../hoc/withShow/withShow';

const ErrorMessage: React.ComponentType<HTMLProps<HTMLParagraphElement>> = styled('p')({
	display: 'block',
	textAlign: 'center',
	fontSize: 14,
	color: '#BDBDBD',
	lineHeight: 1,
})

export default withShow(ErrorMessage)
