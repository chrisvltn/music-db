import React from 'react'
import withStyles from 'react-jss'

import MobileHorizontalScroll from '../../UI/MobileHorizontalScroll/MobileHorizontalScroll';
import ThumbItem from '../../ThumbItem/ThumbItem';

const AlbumList: React.FC<Props> = ({
	classes,
	list,
	horizontal,
}) => {
	const elements = list.map(album =>
		<ThumbItem
			key={album.id}
			link={`/artist/${album.artist.name}/album/${album.title}`}
			title={album.title}
			image={album.images.thumb}
		/>
	)

	return horizontal ?
		<MobileHorizontalScroll>
			{elements}
		</MobileHorizontalScroll> :
		<div className={classes.wrapper}>
			{elements}
		</div>
}

const styles = {
	wrapper: {
		textAlign: 'center',
	},
}

type Props = StyledComponentProps<typeof styles> & {
	list: Album[]
	horizontal?: boolean
}

export default withStyles(styles)(AlbumList)
