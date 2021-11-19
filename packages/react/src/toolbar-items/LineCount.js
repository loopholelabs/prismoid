// Module imports
import PropTypes from 'prop-types'





// Local imports
import { ToolbarItem } from './ToolbarItem.js'





export function LineCount(props) {
	const {
		code,
		options,
	} = props

	return (
		<ToolbarItem>
			{code.split('\n').length}
		</ToolbarItem>
	)
}

LineCount.defaultProps = {
	options: {},
}

LineCount.propTypes = {
	code: PropTypes.string.isRequired,
	options: PropTypes.shape({}),
}
