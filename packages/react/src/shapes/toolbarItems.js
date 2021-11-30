// Module imports
import PropTypes from 'prop-types'





export const toolbarItemsShape = PropTypes.arrayOf(
	PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.arrayOf(function (propValue, index, componentName, location, propFullName) {
			const errorStringPrefix = `Invalid prop \`${propFullName}\` supplied to \`${componentName}\`.`

			switch (index) {
				case '0':
					if (typeof propValue !== 'string') {
						return new Error(`${errorStringPrefix} First argument must be a string. Validation failed.`)
					}
					break

				case '1':
					if (propValue && ((typeof propValue !== 'object') || Array.isArray(propValue))) {
						return new Error(`${errorStringPrefix} Second argument must be an options object. Validation failed.`)
					}
					break

				default:
					return new Error(`${errorStringPrefix} Arrays may only include 2 items. Validation failed.`)
			}
		}),
	])
)
