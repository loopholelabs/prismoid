// Module imports
import PropTypes from 'prop-types'





export function LineRenderer(props) {
	const {
		children,
		includeNewLine,
	} = props

	return (
		<>
			<span className="line-item">
				{children}
			</span>
			{includeNewLine && '\n'}
		</>
	)
}

LineRenderer.defaultProps = {
	children: '',
	includeNewLine: true,
}

LineRenderer.propTypes = {
	children: PropTypes.node,
	includeNewLine: PropTypes.bool,
}
