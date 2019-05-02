import { createInstance } from 'localforage'

const localforage = createInstance({ name: 'music-db' })

export default localforage
