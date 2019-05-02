import { HTMLProps } from 'react';
import styled from 'styled-jss'

const Wrapper: React.ComponentType<Props> = styled('div')({
	position: 'relative',
	display: 'block',
	padding: [0, 10],
	flexGrow: 1,
	backgroundImage: ({ backgroundImage }: Props) => backgroundImage ? `url('${backgroundImage}')` : '',
	backgroundSize: 'cover',
	backgroundPosition: 'center',
	backgroundAttachment: 'fixed',
	zIndex: 0,
	'&:before': `
		content: '';
		display: block;
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		z-index: -1;
		background: rgba(37,39,62,0.95);
		background: -moz-linear-gradient(top, rgba(37,39,62,0.95) 0%, rgba(28,29,50,0.95) 100%);
		background: -webkit-gradient(left top, left bottom, color-stop(0%, rgba(37,39,62,0.95)), color-stop(100%, rgba(28,29,50,0.95)));
		background: -webkit-linear-gradient(top, rgba(37,39,62,0.95) 0%, rgba(28,29,50,0.95) 100%);
		background: -o-linear-gradient(top, rgba(37,39,62,0.95) 0%, rgba(28,29,50,0.95) 100%);
		background: -ms-linear-gradient(top, rgba(37,39,62,0.95) 0%, rgba(28,29,50,0.95) 100%);
		background: linear-gradient(to bottom, rgba(37,39,62,0.95) 0%, rgba(28,29,50,0.95) 100%);
		filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#25273e', endColorstr='#1c1d32', GradientType=0 );
	`
})

type Props = HTMLProps<HTMLDivElement> & {
	backgroundImage?: string
}

export default Wrapper
