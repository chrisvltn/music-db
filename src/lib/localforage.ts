import { createInstance } from 'localforage'

/* LocalForage comes with a default database name, which could conflict with othe libraries */
const localforage = createInstance({ name: 'music-db' })

export default localforage
