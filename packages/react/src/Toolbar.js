// Module imports
import {
	Fragment,
	isValidElement,
	useMemo,
} from 'react'
import PropTypes from 'prop-types'





// Local imports
import { CopyButton } from './toolbar-items/CopyButton.js'
import { LineCount } from './toolbar-items/LineCount.js'
import { ShowLanguage } from './toolbar-items/ShowLanguage.js'
import { Spacer } from './toolbar-items/Spacer.js'
import { toolbarItemsShape } from './shapes/toolbarItems.js'





export function Toolbar(props) {
	const {
		code,
		language,
		items,
	} = props

	const toolbarComponents = useMemo(() => {
		return items.map((item, itemIndex) => {
			let itemType = item
			let itemOptions = {}

			if (Array.isArray(item)) {
				itemType = item[0]
				itemOptions = item[1] || {}
			}

			if (typeof itemType === 'string') {
				switch(itemType.toLowerCase()) {
					case 'language':
						return (
							<ShowLanguage
								key={itemIndex}
								language={language}
								options={itemOptions} />
						)

					case 'line-count':
						return (
							<LineCount
								key={itemIndex}
								options={itemOptions} />
						)

					case 'spacer':
						return (
							<Spacer key={itemIndex} />
						)

					case 'copy-button':
						return (
							<CopyButton
								key={itemIndex}
								className="toolbar-item"
								options={itemOptions}
								content={code} />
						)

					default:
						console.warn(`${itemType} is not a recognized toolbar item`)
						return itemType
				}
			}

			if (isValidElement(item)) {
				return (
					<Fragment key={itemIndex}>
						{item}
					</Fragment>
				)
			}

			return item
		})
	}, [
		code,
		items,
		language,
	])

	return (
		<div className="toolbar">
			{toolbarComponents}
		</div>
	)
}

Toolbar.propTypes = {
	code: PropTypes.string.isRequired,
	language: PropTypes.string.isRequired,
	items: toolbarItemsShape.isRequired,
}
