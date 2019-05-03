import styled from 'styled-jss'
import { HTMLProps } from 'react';

const ColoredBackground: React.ComponentType<Props> = styled('div')({
	position: 'absolute',
	top: 0,
	left: 0,
	right: 0,
	bottom: 0,
	zIndex: -2,
	'&:before': {
		content: '""',
		position: 'fixed',
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		zIndex: -1,
		backgroundSize: 'cover',
		backgroundPosition: 'center',
		backgroundImage: ({ image }: Props) => `url('${image}')`,
	},
	'&:after': {
		content: '""',
		position: 'absolute',
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		zIndex: 0,
		backgroundColor: ({ color }: Props) => color
	},
})

type Props = {
	color: string
	image: string
	className?: string
} & HTMLProps<HTMLDivElement>

export default ColoredBackground
