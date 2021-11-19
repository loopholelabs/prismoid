// Module imports
import {
	useCallback,
	useEffect,
	useMemo,
	useReducer,
} from 'react'
import { GrammarManager } from '@prismoid/grammars'
import { tokenize } from '@prismoid/core'





// Constants
const ACTION_TYPES = {
	GRAMMARS_LOADED: 'Grammars loaded',
	LOAD_GRAMMARS: 'Load grammars',
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
    case ACTION_TYPES.GRAMMARS_LOADED:
			newState.grammars = {
				...newState.grammars,
				...payload.grammars,
			}

			payload.languages.forEach(language => {
				delete newState.isLoadingGrammars[language]
			})

			if (Object.keys(newState.isLoadingGrammars).length === 0) {
				newState.isLoadingGrammars = false
			} else {
				newState.isLoadingGrammars = { ...newState.isLoadingGrammars }
			}

			return newState

    case ACTION_TYPES.LOAD_GRAMMARS:
			if (!newState.isLoadingGrammars) {
				newState.isLoadingGrammars = {}
			}

			payload.languages.forEach(language => {
				newState.isLoadingGrammars[language] = true
			})

      return newState

		default:
			console.warn(`Received unrecognized action type: ${type} with payload:`, payload)
			return state
  }
}

export function usePrismoid(options) {
	const { languages } = options

	const [state, dispatch] = useReducer(reducer, INITIAL_STATE)

	// const loadGrammar = useCallback(async language => {
	// 	// dispatch({
	// 	// 	type: ACTION_TYPES.LOAD_GRAMMAR,
	// 	// 	payload: { language },
	// 	// })

	// 	const grammar = await grammarManager.loadGrammar(language)

	// 	// dispatch({
	// 	// 	type: ACTION_TYPES.GRAMMAR_LOADED,
	// 	// 	payload: {
	// 	// 		grammar,
	// 	// 		language,
	// 	// 	},
	// 	// })
	// }, [dispatch])

	const loadGrammars = useCallback(async languages => {
		dispatch({
			type: ACTION_TYPES.LOAD_GRAMMARS,
			payload: { languages },
		})

		const grammars = await grammarManager.loadGrammars(languages)

		dispatch({
			type: ACTION_TYPES.GRAMMARS_LOADED,
			payload: {
				grammars,
				languages,
			},
		})
	}, [
		dispatch,
		grammarManager,
	])

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
		loadGrammars,
		tokenize,
		tokenizeWithLanguage,
	}
}
