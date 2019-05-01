type Album = {
	id: string
	artist: Artist
	title: string
	year: string
	images: {
		thumb: string
		cover: {
			front: string
			spine: string
			back: string
		}
	}
}
