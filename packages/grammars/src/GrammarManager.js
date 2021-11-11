// Local imports
import aliases from './aliases'





export class GrammarManager {
	grammars = {}
	loadingGrammars = {}

	getLanguageName(languageName) {
		const languageNameFromAlias = aliases[languageName]

		if (languageNameFromAlias) {
			return languageNameFromAlias
		}

		return languageName
	}

	async loadGrammar(languageAlias) {
		const languageName = this.getLanguageName(languageAlias)

		if (this.loadingGrammars[languageName]) {
			return
		}

		this.loadingGrammars[languageAlias] = true
		this.loadingGrammars[languageName] = true

		// this.emit('Load grammar', {
		// 	alias: languageAlias,
		// 	language: languageName,
		// })

		const { default: grammar } = await import(`./${languageName}`)

		this.grammars[languageAlias] = grammar
		this.loadingGrammars[languageAlias] = false
		this.grammars[languageName] = grammar
		this.loadingGrammars[languageName] = false

		// this.emit('Grammar loaded', {
		// 	grammar,
		// 	alias: languageAlias,
		// 	language: languageName,
		// })

		return grammar
	}

	async loadGrammars(languageAliases) {
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
}
