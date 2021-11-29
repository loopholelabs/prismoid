// Module imports
import PropTypes from 'prop-types'





export function TokenRenderer(props) {
	const {
		content,
		type,
	} = props

	return (
		<span className={`token ${type}`}>
			{content}
		</span>
	)
}

TokenRenderer.propTypes = {
	content: '',
	type: 'plain-text',
}

TokenRenderer.propTypes = {
	content: PropTypes.string,
	type: PropTypes.string,
}
