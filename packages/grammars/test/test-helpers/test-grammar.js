// Local imports
import { expect } from 'chai'
import * as languages from '../../index.mjs'







function toArray(value) {
	if (Array.isArray(value)) {
		return value
	} else if (value === undefined) {
		return []
	}
	return [value]
}

for (const language in languages) {
	if (language === 'meta') {
		continue
	}

	const grammar = languages[language]

	describe(language, () => {
		if (grammar.aliasTitles) {
			describe('aliases', () => {
				let aliases = null

				before(() => {
					aliases = new Set(toArray(grammar.alias))
				})

				after(() => {
					aliases = undefined
				})

				Object.keys(grammar.aliasTitles).forEach(id => {
					it(`${JSON.stringify(grammar.aliasTitles[id])} is registered as an alias`, () => {
						expect(aliases.has(id)).to.be.true
					})
				})
			})
		}
	})
}
