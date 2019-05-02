import styled from 'styled-jss'
import { HTMLProps } from 'react';

const MobileHorizontalScroll: React.ComponentType<HTMLProps<HTMLDivElement>> = styled('div')({
	'@media (max-width: 650px)': {
		display: 'flex',
		whiteSpace: 'nowrap',
		overflowX: 'auto',
	},
})

export default MobileHorizontalScroll
