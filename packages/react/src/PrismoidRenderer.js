// Module imports
import { Token } from '@prismoid/core'
import { useMemo } from 'react'
import PropTypes from 'prop-types'





// Local imports
import { usePrismoid } from './usePrismoid.js'





function mapTokens(token) {
	if ((typeof token === 'object') && (token instanceof Token)) {
		return (
			<span className={`token ${token.type}`}>
				{token.content}
			</span>
		)
	}

	return token
}

export function PrismoidRenderer(props) {
	const {
		children,
		className,
		codeToolbar,
		language,
		lineNumbers,
	} = props

	const classes = useMemo(() => {
		return {
			pre: `${className} language-${language} ${lineNumbers ? 'line-numbers' : ''}`,
			code: `language-${language}`,
		}
	}, [
		className,
		language,
		lineNumbers,
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
		const mainCodeBlock = (
			<pre className={classes.pre}>
				<code className={classes.code}>
					{mappedTokens}
				</code>
			</pre>
		)

		if (codeToolbar) {
			return (
				<div className="code-toolbar">
					{codeBlock}
					<div className="toolbar" />
				</div>
			)
		}

		return mainCodeBlock
	}, [
		classes,
		codeToolbar,
		mappedTokens,
	])

	return codeBlock
}

PrismoidRenderer.propTypes = {
	codeToolbar: false,
	lineNumbers: false,
	language: '',
}

PrismoidRenderer.propTypes = {
	codeToolbar: PropTypes.bool,
	language: PropTypes.string,
	lineNumbers: PropTypes.bool,
	children: PropTypes.string.isRequired,
}
