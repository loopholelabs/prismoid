// Local imports
import { useMemoizedClassNames } from './helpers/useMemoizedClassNames.js'
import { useMemoizedStyle } from './helpers/useMemoizedStyle.js'
import { useMemoizedTokens } from './helpers/useMemoizedTokens.js'
import { usePrismoidContext } from './helpers/usePrismoidContext.js'





export function PrismoidRenderer() {
	const {
		className,
		firstLineNumber,
		language,
		showLineNumbers,
		source,
		wrapLines,
	} = usePrismoidContext()

	const classNames = useMemoizedClassNames({
		className,
		language,
		showLineNumbers,
	})
	const tokens = useMemoizedTokens({
		language,
		wrapLines,
		source,
	})
	const style = useMemoizedStyle({ firstLineNumber })

	return (
		<pre
			className={classNames.pre}
			style={style}>
			<code className={classNames.code}>
				{tokens}
			</code>
		</pre>
	)
}
