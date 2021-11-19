// Module imports
import { Token } from '@prismoid/core'
import { useMemo } from 'react'
import PropTypes from 'prop-types'





// Local imports
import { Toolbar } from './Toolbar.js'
import { usePrismoid } from './usePrismoid.js'





function mapTokens(token, index) {
	if ((typeof token === 'object') && (token instanceof Token)) {
		return (
			<span
				className={`token ${token.type}`}
				key={index}>
				{token.content}
			</span>
		)
	}

	return token
}

export function PrismoidRenderer(props) {
	const {
		className,
		firstLineNumber,
		language,
		showLineNumbers,
		toolbarItems,
		trimFinalNewlines,
		insertFinalNewline,
	} = props

	const children = useMemo(() => {
		let processedChildren = props.children

		if (trimFinalNewlines) {
			processedChildren = processedChildren.replace(/\n+$/gu, '')
		}

		if (insertFinalNewline) {
			processedChildren = processedChildren.replace(/\n*$/, '\n')
		}

		return processedChildren
	}, [
		insertFinalNewline,
		props.children,
		trimFinalNewlines,
	])

	const classes = useMemo(() => {
		return {
			pre: `${className || ''} language-${language} ${showLineNumbers ? 'line-numbers' : ''}`,
			code: `language-${language}`,
		}
	}, [
		className,
		language,
		showLineNumbers,
	])

	const { tokenizeWithLanguage } = usePrismoid({
		languages: [language],
	})

	const tokens = useMemo(() => {
		return tokenizeWithLanguage(children, language)
	}, [
		children,
		language,
		tokenizeWithLanguage,
	])

	const mappedTokens = useMemo(() => {
		return tokens.map(mapTokens)
	}, [
		mapTokens,
		tokens,
	])

	const codeBlock = useMemo(() => {
		let lineNumbers = null

		if (showLineNumbers) {
			const lineCount = children.split('\n').length
			const lineNumberRows = []

			while (lineNumberRows.length < lineCount) {
				lineNumberRows.push((
					<span key={lineNumberRows.length} />
				))
			}

			lineNumbers = (
				<span
					aria-hidden
					className="line-numbers-rows">
					{lineNumberRows}
				</span>
			)
		}

		const mainCodeBlock = (
			<pre
				className={classes.pre}
				style={{ counterReset: `linenumber ${firstLineNumber}` }}>
				<code className={classes.code}>
					{mappedTokens}

					{lineNumbers}
				</code>
			</pre>
		)

		if (toolbarItems.length) {
			return (
				<div className="code-toolbar">
					{mainCodeBlock}

					<Toolbar
						code={children}
						language={language}
						items={toolbarItems} />
				</div>
			)
		}

		return mainCodeBlock
	}, [
		children,
		classes,
		firstLineNumber,
		mappedTokens,
		showLineNumbers,
		toolbarItems,
	])

	return codeBlock
}

PrismoidRenderer.propTypes = {
	firstLineNumber: 1,
	insertFinalNewline: false,
	language: '',
	showLineNumbers: false,
	toolbarItems: [],
	trimFinalNewlines: false,
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
	toolbarItems: PropTypes.arrayOf(PropTypes.string),
	trimFinalNewlines: PropTypes.bool,
}
