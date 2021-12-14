// Module imports
import {
	useCallback,
	useMemo,
} from 'react'
import PropTypes from 'prop-types'





export function CopyButton(props) {
	const {
		content,
		options,
	} = props

	const className = useMemo(() => {
		const possibleClassNames = [
			props.className,
			options.className,
		]

		return possibleClassNames.reduce((accumulator, value) => {
			if (value) {
				accumulator.push(value)
			}
			return accumulator
		}, []).join(' ')
	}, [
		options.className,
		props.className,
	])

	const fallbackCopyTextToClipboard = useCallback(() => {
		const textArea = document.createElement('textarea')
		textArea.value = content

		// Avoid scrolling to bottom
		textArea.style.top = '0'
		textArea.style.left = '0'
		textArea.style.position = 'fixed'

		document.body.appendChild(textArea)
		textArea.focus()
		textArea.select()

		try {
			const isSuccessful = document.execCommand('copy')
			setTimeout(() => {
				if (isSuccessful) {
					options.onCopySuccess?.()
				} else {
					options.onCopyFail?.()
				}
			}, 1)
		} catch (error) {
			setTimeout(() => {
				options.onCopyFail?.(error)
			}, 1)
		}

		document.body.removeChild(textArea)
	}, [
		content,
		options.onCopyFail,
		options.onCopySuccess,
	])

	const copyTextToClipboard = useCallback(async () => {
		if (navigator.clipboard) {
			try {
				await navigator.clipboard.writeText(content)
				options.onCopySuccess()
			} catch(error) {
				fallbackCopyTextToClipboard()
			}
		} else {
			fallbackCopyTextToClipboard()
		}
	}, [
		content,
		fallbackCopyTextToClipboard,
		options.onCopySuccess,
	])

	return (
		<button
			className={className}
			onClick={copyTextToClipboard}
			type="button">
			{options.label || 'Copy'}
		</button>
	)
}

CopyButton.defaultProps = {
	className: '',
	content: null,
	options: {},
}

CopyButton.propTypes = {
	className: PropTypes.string,
	content: PropTypes.node.isRequired,
	options: PropTypes.shape({
		label: PropTypes.node,
		onCopyFail: PropTypes.func,
		onCopySuccess: PropTypes.func,
	}),
}
