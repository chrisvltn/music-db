import styled from 'styled-jss'
import withShow from '../../../hoc/withShow/withShow';
import { HTMLProps } from 'react';

const Button: React.ComponentType<HTMLProps<HTMLButtonElement>> = styled('button')({
	display: 'block',
	backgroundColor: '#ff3a63',
	borderRadius: 50,
	border: 0,
	lineHeight: '40px',
	height: 40,
	color: '#ecf0f1',
	textAlign: 'center',
	fontWeigth: 'bold',
	textTransform: 'uppercase',
	width: 230,
	margin: [20, 'auto'],
})

export default withShow(Button)
