// Module imports
import PropTypes from 'prop-types'
import { useCallback } from 'react'





// Local imports
import { usePrismoidContext } from './helpers/usePrismoidContext.js'





export function PrismoidCopyButton(props) {
	const { source } = usePrismoidContext()
	const {
		className,
		onCopyFail,
		onCopySuccess,
		label,
	} = props

	const fallbackCopyTextToClipboard = useCallback(() => {
		const textArea = document.createElement('textarea')
		textArea.value = source

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
					onCopySuccess()
				} else {
					onCopyFail()
				}
			}, 1)
		} catch (error) {
			setTimeout(() => {
				onCopyFail(error)
			}, 1)
		}

		document.body.removeChild(textArea)
	}, [
		onCopyFail,
		onCopySuccess,
		source,
	])

	const copyTextToClipboard = useCallback(async () => {
		if (navigator.clipboard) {
			try {
				await navigator.clipboard.writeText(source)
				onCopySuccess()
			} catch(error) {
				fallbackCopyTextToClipboard()
			}
		} else {
			fallbackCopyTextToClipboard()
		}
	}, [
		source,
		fallbackCopyTextToClipboard,
		onCopySuccess,
	])

	return (
		<button
			className={className}
			onClick={copyTextToClipboard}
			type={'button'}>
			{label}
		</button>
	)
}

PrismoidCopyButton.defaultProps = {
	className: '',
	content: null,
	label: 'Copy',
	onCopyFail: () => {},
	onCopySuccess: () => {},
	options: {},
}

PrismoidCopyButton.propTypes = {
	className: PropTypes.string,
	content: PropTypes.node.isRequired,
	label: PropTypes.node,
	onCopyFail: PropTypes.func,
	onCopySuccess: PropTypes.func,
}
