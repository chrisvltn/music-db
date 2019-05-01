import React from 'react'

interface WithShowProps {
	show?: boolean
}

/**
 * Adds `show` property to set if the component is being showed or not
 * @param WrappedComponent
 */
const withShow = <P extends object>(WrappedComponent: React.ComponentType<P>): React.FC<P & WithShowProps> =>
	({ show, ...props }) =>
		show ? <WrappedComponent {...props as P} /> : null

export default withShow
