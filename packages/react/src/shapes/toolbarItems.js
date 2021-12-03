// Module imports
import PropTypes from 'prop-types'





export const toolbarItemsShape = PropTypes.arrayOf(
	PropTypes.oneOfType([
		PropTypes.node,
		PropTypes.string,
		PropTypes.arrayOf(function (propValue, index, componentName, location, propFullName) {
			const errorStringPrefix = `Invalid prop \`${propFullName}\` supplied to \`${componentName}\`.`

			if (typeof propValue[0] !== 'string') {
				return new Error(`${errorStringPrefix} First argument must be a string. Validation failed.`)
			}

			if (propValue[1] && ((typeof propValue[1] !== 'object') || Array.isArray(propValue[1]))) {
				return new Error(`${errorStringPrefix} Second argument must be an options object. Validation failed.`)
			}

			if (propValue.length > 2) {
				return new Error(`${errorStringPrefix} Arrays may only include 2 items. Validation failed.`)
			}
		}),
	])
)
