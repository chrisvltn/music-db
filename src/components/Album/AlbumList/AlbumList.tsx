import React from 'react'
import jss from '../../../lib/jss';

import AlbumItem from '../AlbumItem/AlbumItem';
import HorizontalScroll from '../../UI/HorizontalScroll/HorizontalScroll';

const AlbumList: React.FC<Props> = ({
	list,
	horizontal,
}) => {
	const elements = list.map(album =>
		<AlbumItem
			key={album.id}
			link={`/artist/${album.artist.name}/album/${album.title}`}
			title={album.title}
			image={album.images.thumb}
		/>
	)

	return horizontal ?
		<HorizontalScroll>
			{elements}
		</HorizontalScroll> :
		<div className={classes.wrapper}>
			{elements}
		</div>
}

const { classes } = jss.createStyleSheet({
	wrapper: {
		textAlign: 'center',
	},
}).attach()

type Props = {
	list: Album[]
	horizontal?: boolean
}

export default AlbumList