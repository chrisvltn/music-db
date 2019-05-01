import React from 'react'
import TrackItem from '../TrackItem/TrackItem';

const TrackList: React.FC<Props> = ({
	tracks,
}) =>
	<div>
		{tracks.map(track =>
			<TrackItem
				key={track.id}
				number={track.number}
				title={track.title}
				duration={track.duration}
			/>
		)}
	</div>

type Props = {
	tracks: Track[]
}

export default TrackList
