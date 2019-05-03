import { HTMLProps } from 'react';
import styled from 'styled-jss'

const Container: React.ComponentType<Props> = styled('div')({
	width: '100%',
	maxWidth: 900,
	margin: [0, 'auto'],
	'&': `
		padding-left: env(safe-area-inset-left);
		padding-right: env(safe-area-inset-right);
	`,
})

type Props = HTMLProps<HTMLDivElement>

export default Container
