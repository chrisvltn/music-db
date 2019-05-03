import Axios from "axios";

const TheAudioDB = {
	axios: Axios.create(),

	getArtistByArtistName: async (artistName: string): Promise<Artist | null> => {
		const { data } = await TheAudioDB.axios.get<ArtistRequest>('/search.php', {
			params: {
				s: artistName,
			},
		})

		if (!data.artists)
			return null

		return TheAudioDB.apiArtistToArtist(data.artists[0])
	},

	getArtistAlbumsByArtistName: async (artistName: string): Promise<Album[]> => {
		const { data } = await TheAudioDB.axios.get<AlbumRequest>('/searchalbum.php', {
			params: {
				s: artistName,
			},
		})

		/* Converts API album to application album type */
		return (data.album || [])
			.filter((item, index) => data.album.findIndex(album => album.idAlbum === item.idAlbum) === index)
			.map(TheAudioDB.apiAlbumToAlbum)
			.sort((a, b) => a.year < b.year ? 1 : a.year > b.year ? -1 : 0) // Orders by `year` desc
	},

	getArtistTopTracksByArtistName: async (artistName: string): Promise<Track[]> => {
		const { data } = await TheAudioDB.axios.get<TracksRequest>('/track-top10.php', {
			params: {
				s: artistName,
			},
		})

		/* Converts API tracks to application track type */
		return (data.track || [])
			.filter((item, index) => data.track.findIndex(track => track.idTrack === item.idTrack) === index)
			.map(TheAudioDB.apiTracktoTrack)
	},

	getTrendingAlbums: async (): Promise<Album[]> => {
		const { data } = await TheAudioDB.axios.get<TrendingRequest>('/trending.php', {
			params: {
				country: 'us',
				type: 'itunes',
				format: 'albums',
			},
		})

		return (data.trending || [])
			.filter((item, index) => data.trending.findIndex(trending => trending.idAlbum === item.idAlbum) === index)
			.map(TheAudioDB.apiTrendingToAlbum)
	},

	getTrendingSingles: async (): Promise<Album[]> => {
		const { data } = await TheAudioDB.axios.get<TrendingRequest>('/trending.php', {
			params: {
				country: 'us',
				type: 'itunes',
				format: 'singles',
			},
		})

		return (data.trending || [])
			.filter((item, index) => data.trending.findIndex(trending => trending.idTrack === item.idTrack) === index)
			.map(TheAudioDB.apiTrendingToAlbum)
	},

	getAlbumTracksByAlbumId: async (albumId: string): Promise<Track[]> => {
		const { data } = await TheAudioDB.axios.get<TracksRequest>('/track.php', {
			params: {
				m: albumId,
			},
		})

		/* Converts API tracks to application track type */
		return (data.track || [])
			.filter((item, index) => data.track.findIndex(track => track.idTrack === item.idTrack) === index)
			.sort((a, b) => (parseInt(a.intTrackNumber) || 0) - (parseInt(b.intTrackNumber)) || 0)
			.sort((a, b) => (parseInt(a.intCD) || 0) - (parseInt(b.intCD)) || 0) // Some albums have more than one CD. Example: Red Hot Chili Peppers - Stadium Arcadium (2 CDs)
			.map(TheAudioDB.apiTracktoTrack)
	},

	getAlbumByArtistNameAndAlbumTitle: async (artistName: string, albumTitle: string): Promise<Album | null> => {
		const { data } = await TheAudioDB.axios.get<AlbumRequest>(`/searchalbum.php`, {
			params: {
				s: artistName,
				a: albumTitle,
			}
		})

		/* Album is `null` if there is no album found */
		if (!data.album)
			return null

		/* Converts API album to application album type */
		return TheAudioDB.apiAlbumToAlbum(data.album[0])
	},

	apiTrendingToAlbum(trendingItem: TrendingRequest['trending'][0]): Album {
		return {
			id: trendingItem.idAlbum,
			title: trendingItem.strAlbum,
			year: '',
			images: {
				thumb: trendingItem.strAlbumThumb,
				cover: {
					front: trendingItem.strAlbumThumb,
					back: '',
					spine: '',
				},
			},
			artist: {
				id: trendingItem.idArtist,
				name: trendingItem.strArtist,
				formedYear: '',
				style: '',
				images: {
					thumb: trendingItem.strArtistThumb,
					wide: '',
				},
			},
		}
	},

	apiTracktoTrack(trackItem: TracksRequest['track'][0]): Track {
		return {
			id: trackItem.idTrack,
			title: trackItem.strTrack,
			duration: parseInt(trackItem.intDuration),
			number: parseInt(trackItem.intTrackNumber),
			youtubeLink: trackItem.strMusicVid,
			album: {
				id: trackItem.idAlbum,
				title: trackItem.strAlbum,
				year: '',
				images: {
					thumb: trackItem.strTrackThumb,
					cover: {
						front: trackItem.strTrackThumb,
						back: '',
						spine: '',
					},
				},
				artist: {
					id: trackItem.idArtist,
					name: trackItem.strArtist,
					style: trackItem.strStyle,
					formedYear: '',
					images: {
						thumb: '',
						wide: '',
					},
				},
			},
		}
	},

	apiAlbumToAlbum(albumItem: AlbumRequest['album'][0]): Album {
		return {
			id: albumItem.idAlbum,
			title: albumItem.strAlbum,
			year: albumItem.intYearReleased,
			images: {
				thumb: albumItem.strAlbumThumb,
				cover: {
					front: albumItem.strAlbumThumbHQ || albumItem.strAlbumThumb,
					back: albumItem.strAlbumThumbBack,
					spine: albumItem.strAlbumSpine,
				},
			},
			artist: {
				id: albumItem.idArtist,
				name: albumItem.strArtist,
				style: albumItem.strStyle,
				formedYear: '',
				images: {
					thumb: '',
					wide: '',
				}
			},
		}
	},

	apiArtistToArtist(artistItem: ArtistRequest['artists'][0]): Artist {
		return {
			name: artistItem.strArtist,
			id: artistItem.idArtist,
			formedYear: artistItem.intFormedYear || artistItem.intBornYear,
			style: artistItem.strStyle || artistItem.strGenre,
			images: {
				thumb: artistItem.strArtistThumb,
				wide: artistItem.strArtistWideThumb || artistItem.strArtistBanner || artistItem.strArtistClearart || artistItem.strArtistFanart || artistItem.strArtistFanart2 || artistItem.strArtistFanart3,
			},
		}
	},
}

TheAudioDB.axios.defaults.baseURL = 'https://theaudiodb.com/api/v1/json/195003/'
TheAudioDB.axios.defaults.paramsSerializer = (params = {}) =>
	Object.entries(params)
		.map(([key, value]) => [encodeURIComponent(key), encodeURIComponent((value || '').toString())].join('='))
		.join('&')

export default TheAudioDB
