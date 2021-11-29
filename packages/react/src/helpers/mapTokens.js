// Module imports
import { Fragment } from 'react'
import { Token } from '@prismoid/core'





// Local imports
import { TokenRenderer } from '../TokenRenderer'





export function mapTokens(token, index) {
	let renderedToken = token

	if ((typeof token === 'object') && (token instanceof Token)) {
		renderedToken = (
			<TokenRenderer {...token} />
		)
	}

	return (
		<Fragment key={index}>
			{renderedToken}
		</Fragment>
	)
}
