import styled from 'styled-jss'
import { HTMLProps } from 'react';

const ColoredBackground: React.ComponentType<Props> = styled('div')({
	position: 'absolute',
	top: 0,
	left: 0,
	right: 0,
	bottom: 0,
	zIndex: -999,
	'&:before': {
		content: '""',
		position: 'absolute',
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		zIndex: -997,
		backgroundColor: ({ color }: Props) => color
	},
	'&:after': {
		content: '""',
		position: 'fixed',
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		zIndex: -998,
		backgroundSize: 'cover',
		backgroundPosition: 'center',
		backgroundImage: ({ image }: Props) => `url('${image}')`,
	},
})

type Props = {
	color: string
	image: string
	className?: string
} & HTMLProps<HTMLDivElement>

export default ColoredBackground
