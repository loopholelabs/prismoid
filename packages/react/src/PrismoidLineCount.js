// Local imports
import { usePrismoidContext } from './helpers/usePrismoidContext.js'





export function LineCount() {
	const { source } = usePrismoidContext()

	return (
		<div>
			{source.split('\n').length}
		</div>
	)
}
