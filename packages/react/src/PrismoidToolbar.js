// Module imports
import {
	Children,
	cloneElement,
	useMemo,
} from 'react'
import PropTypes from 'prop-types'





export function Toolbar(props) {
	const { children } = props

	const toolbarItems = useMemo(() => {
		return Children.map(children, child => {
			const childClassName = ['toolbar-item']

			if (child.props.className) {
				childClassName.push(child.props.className)
			}

			return cloneElement(child, {
				...child.props,
				className: childClassName,
			})
		})
	}, [children])

	return (
		<div className={'toolbar'}>
			{toolbarItems}
		</div>
	)
}

Toolbar.defaultProps = {
	children: null,
}

Toolbar.propTypes = {
	children: PropTypes.node,
}
