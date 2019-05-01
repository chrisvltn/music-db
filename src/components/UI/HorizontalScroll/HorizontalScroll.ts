import styled from 'styled-jss'
import { HTMLProps } from 'react';

const HorizontalScroll: React.ComponentType<HTMLProps<HTMLDivElement>> = styled('div')({
	display: 'flex',
	whiteSpace: 'nowrap',
	overflowX: 'auto',
})

export default HorizontalScroll
