// Module imports
import { useMemo } from 'react'
import PropTypes from 'prop-types'





// Local imports
import { Toolbar } from './Toolbar.js'
import { toolbarItemsShape } from './shapes/toolbarItems.js'
import { useMemoizedChildren } from './helpers/useMemoizedChildren.js'
import { useMemoizedClassNames } from './helpers/useMemoizedClassNames.js'
import { useMemoizedStyle } from './helpers/useMemoizedStyle.js'
import { useMemoizedTokens } from './helpers/useMemoizedTokens.js'





export function PrismoidRenderer(props) {
	const {
		language,
		toolbarItems,
	} = props

	const children = useMemoizedChildren(props)
	const classNames = useMemoizedClassNames(props)
	const tokens = useMemoizedTokens(props)

	const style = useMemoizedStyle(props)

	const preformattedCodeBlock = (
		<pre
			className={classNames.pre}
			style={style}>
			<code className={classNames.code}>
				{tokens}
			</code>
		</pre>
	)

	if (toolbarItems.length) {
		return (
			<div className="code-toolbar">
				{preformattedCodeBlock}

				<Toolbar
					code={children}
					language={language}
					items={toolbarItems} />
			</div>
		)
	}

	return preformattedCodeBlock
}

PrismoidRenderer.propTypes = {
	firstLineNumber: 1,
	insertFinalNewline: false,
	language: '',
	showLineNumbers: false,
	toolbarItems: [],
	trimFinalNewlines: false,
	wrapLines: false,
}

PrismoidRenderer.propTypes = {
	children: PropTypes.string.isRequired,
	firstLineNumber: PropTypes.oneOfType([
		PropTypes.number,
		PropTypes.string,
	]),
	insertFinalNewline: PropTypes.bool,
	language: PropTypes.string,
	showLineNumbers: PropTypes.bool,
	toolbarItems: toolbarItemsShape,
	trimFinalNewlines: PropTypes.bool,
	wrapLines: PropTypes.bool,
}
