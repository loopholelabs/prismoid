// Module imports
import {
	useCallback,
	useEffect,
	useReducer,
} from 'react'
import { GrammarManager } from '@prismoid/grammars'
import { tokenize } from '@prismoid/core'





// Constants
const ACTION_TYPES = {
	GRAMMAR_LOADED: 'Grammar loaded',
	LOAD_GRAMMAR: 'Load grammar',
}
const INITIAL_STATE = {
	grammars: {},
	isLoadingGrammars: false,
}
const grammarManager = new GrammarManager





function reducer(state, action) {
	const newState = { ...state }
	const {
		payload,
		type,
	} = action

  switch (type) {
    case ACTION_TYPES.GRAMMAR_LOADED:
			newState.grammars = {
				...state.grammars,
				[payload.language]: payload.grammar,
			}

			delete newState.isLoadingGrammars[payload.language]

			if (Object.keys(newState.isLoadingGrammars).length === 0) {
				newState.isLoadingGrammars = false
			} else {
				newState.isLoadingGrammars = { ...newState.isLoadingGrammars }
			}

			return newState

    case ACTION_TYPES.LOAD_GRAMMAR:
			if (!newState.isLoadingGrammars) {
				newState.isLoadingGrammars = {}
			}

			newState.isLoadingGrammars[payload.language] = true

      return newState

		default:
			console.warn(`Received unrecognized action type: ${type} with payload:`, payload)
			return state
  }
}

export function usePrismoid(options) {
	const { languages } = options

	const [state, dispatch] = useReducer(reducer, INITIAL_STATE)

	const loadGrammar = useCallback(async language => {
		dispatch({
			type: ACTION_TYPES.LOAD_GRAMMAR,
			payload: { language },
		})

		const grammar = await grammarManager.loadGrammar(language)

		dispatch({
			type: ACTION_TYPES.GRAMMAR_LOADED,
			payload: {
				grammar,
				language,
			},
		})
	}, [dispatch])

	const loadGrammars = useCallback(async languageAliases => {
		await grammarManager.loadGrammars(languageAliases)
	}, [grammarManager])

	const tokenizeWithLanguage = useCallback((string, languageAlias) => {
		const languageName = grammarManager.getLanguageName(languageAlias)
		const grammar = grammarManager.grammars[languageName]

		if (grammar) {
			return tokenize(string, grammar)
		}

		return [string]
	}, [
		grammarManager,
		state.grammars,
		tokenize,
	])

	useEffect(() => {
		if (languages) {
			let parsedLanguages = languages

			if (!Array.isArray(parsedLanguages)) {
				parsedLanguages = [parsedLanguages]
			}

			const grammarsToLoad = parsedLanguages.reduce((accumulator, language) => {
				if (!grammarManager.grammars[language]) {
					accumulator.push(language)
				}

				return accumulator
			}, [])

			if (grammarsToLoad.length) {
				loadGrammars(grammarsToLoad)
			}
		}
	}, [
		grammarManager,
		languages,
		loadGrammars,
	])

	return {
		...state,
		loadGrammar,
		loadGrammars,
		tokenize,
		tokenizeWithLanguage,
	}
}
