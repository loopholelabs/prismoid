// Module imports
import { useMemo } from 'react'
import PropTypes from 'prop-types'





// Local imports
import { LANGUAGE_NAMES } from './helpers/languageNames.js'
import { usePrismoidContext } from './helpers/usePrismoidContext.js'





export function PrismoidLanguage(props) {
	const { forcedLanguage } = props
	const { language } = usePrismoidContext()

	const displayLanguage = useMemo(() => {
		return LANGUAGE_NAMES[forcedLanguage]
			|| forcedLanguage
			|| language
	}, [
		forcedLanguage,
		language,
	])

	if (!displayLanguage) {
		return null
	}

	return (
		<div>
			{displayLanguage}
		</div>
	)
}

PrismoidLanguage.defaultProps = {
	language: '',
}

PrismoidLanguage.propTypes = {
	language: PropTypes.string,
}
