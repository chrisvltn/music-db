import { HTMLProps } from 'react';
import styled from 'styled-jss'

const Container: React.ComponentType<Props> = styled('div')({
	width: '100%',
	maxWidth: 900,
	margin: [0, 'auto'],
})

type Props = HTMLProps<HTMLDivElement>

export default Container
