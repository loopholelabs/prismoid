// Module imports
import { useMemo } from 'react'
import PropTypes from 'prop-types'





// Local imports
import { CopyButton } from './toolbar-items/CopyButton.js'
import { LineCount } from './toolbar-items/LineCount.js'
import { ShowLanguage } from './toolbar-items/ShowLanguage.js'
import { Spacer } from './toolbar-items/Spacer.js'





export function Toolbar(props) {
	const {
		code,
		language,
		items,
	} = props

	const toolbarComponents = useMemo(() => {
		const components = []

		items.forEach((item, itemIndex) => {
			let itemType = item
			let itemOptions = {}
			let component = null

			if (Array.isArray(item)) {
				itemType = item[0]
				itemOptions = item[1] || {}
			}

			switch(itemType.toLowerCase()) {
				case 'language':
					component = (
						<ShowLanguage
							key="language"
							language={language}
							options={itemOptions} />
					)
					break

				case 'line-count':
					component = (
						<LineCount
							key="line-count"
							options={itemOptions} />
					)
					break

				case 'spacer':
					component = (
						<Spacer key={itemIndex} />
					)
					break

				case 'copy-button':
					component = (
						<CopyButton
							key="copy-button"
							className="toolbar-item"
							options={itemOptions}
							content={code} />
					)
					break
			}

			components.push(component)
		})

		return components
	}, [items])

	return (
		<div className="toolbar">
			{toolbarComponents}
		</div>
	)
}

Toolbar.propTypes = {
	code: PropTypes.string.isRequired,
	language: PropTypes.string.isRequired,
	items: PropTypes.arrayOf(PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.arrayOf(function (propValue, index, componentName, location, propFullName) {
			switch (index) {
				case '0':
					if (typeof propValue !== 'string') {
						return new Error(`Invalid prop \`${propFullName}\` supplied to \`${componentName}\`. First argument must be a string. Validation failed.`)
					}
					break

				case '1':
					if (propValue && ((typeof propValue !== 'object') || Array.isArray(propValue))) {
						return new Error(`Invalid prop \`${propFullName}\` supplied to \`${componentName}\`. Second argument must be an options object. Validation failed.`)
					}
					break
			}
		}),
	])).isRequired,
}
