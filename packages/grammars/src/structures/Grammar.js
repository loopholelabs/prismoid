function deleteToken(token, rules) {
	const modifiedRules = { ...rules }
	delete modifiedRules[token]
	return modifiedRules
}

function insertBefore(indexToken, newRules, rules) {
	return Object.entries(rules).reduce((accumulator, [token, rule]) => {
		if (token === indexToken) {
			Object.entries(newRules).forEach(([newToken, newRule]) => {
				accumulator[newToken] = newRule
			})
		}

		if (!newRules[token]) {
			accumulator[token] = rule
		}

		return accumulator
	}, {})
}

export class Grammar {
	#modifications = []
	#originalRules = null
	#parentGrammar = null
	#parentRules = null
	#rules = null

	name = null

	#compileRules() {
		let compiledRules = {
			...(this.#parentRules || {}),
			...this.#originalRules,
		}

		this.#modifications.forEach(modification => {
			switch (modification.type) {
				case 'delete':
					compiledRules = deleteToken(...modification.args, compiledRules)
					break

				case 'insert':
					compiledRules = insertBefore(...modification.args, compiledRules)
					break
			}
		})

		return compiledRules
	}

	constructor(name, rules, parentGrammar) {
		if (parentGrammar) {
			if (!(parentGrammar instanceof Grammar)) {
				throw new Error('if providing a base grammar, it must be an instance of the Grammar class')
			}

			this.parentGrammar = parentGrammar
		}

		this.name = name
		this.rules = rules
	}

	deleteToken(token) {
		// Save this delete in case we need to recompile the ruleset later
		this.#modifications.push({
			args: [token],
			type: 'delete',
		})

		deleteToken(token, this.rules)
	}

	insertBefore(indexToken, newRules) {
		// Save this insert in case we need to recompile the ruleset later
		this.#modifications.push({
			args: [indexToken, newRules],
			type: 'insert',
		})

		this.rules = insertBefore(indexToken, newRules, this.rules)
	}

	get parentGrammar() {
		return this.#parentGrammar
	}

	get rules() {
		if (this.#parentGrammar && (this.#parentRules !== this.#parentGrammar.rules)) {
			this.#parentRules = this.#parentGrammar.rules
			this.#rules = this.#compileRules()
		}

		return this.#rules
	}

	set parentGrammar(value) {
		this.#parentRules = value.rules
		this.#parentGrammar = value
	}

	set rules(value) {
		this.#originalRules = value
		this.#rules = this.#compileRules()
	}
}
