// Module imports
import PropTypes from 'prop-types'





export function ToolbarItem(props) {
	const { children } = props

	return (
		<div className="toolbar-item">
			{children}
		</div>
	)
}

ToolbarItem.defaultProps = {
	children: null,
}

ToolbarItem.propTypes = {
	children: PropTypes.node,
}
