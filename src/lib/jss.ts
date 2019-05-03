import { create } from 'jss'
import preset from 'jss-preset-default'

/* JSS doesn't come with the preset set */
const jss = create(preset())

export default jss
