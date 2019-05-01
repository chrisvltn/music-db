import styled from 'styled-jss'
import { HTMLProps } from 'react';

const SectionTitle: React.ComponentType<HTMLProps<HTMLHeadingElement>> = styled('h2')({
	display: 'block',
	color: '#ecf0f1',
	fontWeight: 'bold',
	fontSize: 16,
	lineHeight: '44px',
	padding: 0,
	margin: {
		top: 0,
		bottom: 5,
		left: 0,
		right: 0,
	},
})

export default SectionTitle
