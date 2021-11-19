// Local imports
import aliases from '../aliases.mjs'





// Constants
const DEFAULT_OPTIONS = { devModeEnabled: false }





export class GrammarManager {
	grammars = {}
	loadingGrammars = {}

	constructor(options = DEFAULT_OPTIONS) {
		this.options = options
	}

	getLanguageName(languageName) {
		const languageNameFromAlias = aliases[languageName]

		if (languageNameFromAlias) {
			return languageNameFromAlias
		}

		return languageName
	}

	loadGrammar = async languageAlias => {
		if (this.devModeEnabled) {
			console.log(`Attempting to load '${languageAlias}' grammar...`)
		}

		const languageName = this.getLanguageName(languageAlias)

		if (this.loadingGrammars[languageName]) {
			if (this.devModeEnabled) {
				console.log(`'${languageAlias}' grammar has already been loaded! Skipping.`)
			}
			return
		}

		this.loadingGrammars[languageAlias] = true
		this.loadingGrammars[languageName] = true

		// this.emit('Load grammar', {
		// 	alias: languageAlias,
		// 	language: languageName,
		// })

		let grammar = undefined

		try {
			({ [languageName]: grammar } = await import(`../grammars/${languageName}`))
		} catch (error) {
			if (this.devModeEnabled) {
				console.log(`Failed to load '${languageAlias}' grammar!`)
			}
			return
		}

		this.grammars[languageAlias] = grammar
		this.loadingGrammars[languageAlias] = false
		this.grammars[languageName] = grammar
		this.loadingGrammars[languageName] = false

		if (this.devModeEnabled) {
			console.log(`Successfully loaded '${languageAlias}' grammar:`, grammar)
		}

		// this.emit('Grammar loaded', {
		// 	grammar,
		// 	alias: languageAlias,
		// 	language: languageName,
		// })

		return grammar
	}

	loadGrammars = async languageAliases => {
		let parsedLanguageAliases = languageAliases

		if (!Array.isArray(parsedLanguageAliases)) {
			parsedLanguageAliases = [parsedLanguageAliases]
		}

		await Promise.all(parsedLanguageAliases.map(this.loadGrammar))

		return parsedLanguageAliases.reduce((accumulator, alias) => {
			accumulator[alias] = this.grammars[alias]

			return accumulator
		}, {})
	}

	get devModeEnabled() {
		return this.options.devModeEnabled
	}
}
