// Module imports
import {
	Children,
	cloneElement,
	useMemo,
} from 'react'
import PropTypes from 'prop-types'





export function PrismoidToolbar(props) {
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

PrismoidToolbar.defaultProps = {
	children: null,
}

PrismoidToolbar.propTypes = {
	children: PropTypes.node,
}
