import localforage from "../lib/localforage";

/**
 * Manage recently viewed artists and albuns
 * Currently, it is using the browser database, but in the future it could use a server as well
 */
const recentlyViewed = {
	key: 'recently-viewed',
	limit: 15,
	list: async () => ((await localforage.getItem<RecentlyViewed>(recentlyViewed.key)) || []).slice(0, recentlyViewed.limit),
	add: async (data: Album | Artist, type: 'artist' | 'album'): Promise<void> => {
		const list = await recentlyViewed.list()

		localforage.setItem(recentlyViewed.key, [
			{ type, data },
			...list.filter(item => !(item.type === type && item.data.id === data.id)).slice(0, recentlyViewed.limit - 1),
		])

		return
	},
}

export type RecentlyViewed = ({
	type: 'artist'
	data: Artist
} | {
	type: 'album'
	data: Album
})[]

export default recentlyViewed
