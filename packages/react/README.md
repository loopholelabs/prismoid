```js
import {
  Prismoid,
  PrismoidCopyButton,
  PrismoidRenderer,
  PrismoidToolbar,
} from '@react/prismoid'

const source = `
let foo = 'bar'
console.log('Foo:', foo)
`

export function Thingy() {
  return (
    <Prismoid
      language={'js'}
      source={source}>
      <PrismoidToolbar>
        <PrismoidTabs />

        <PrismoidLanguage />
        <PrismoidCopyButton />
      </PrismoidToolbar>

      <PrismoidRenderer />
    </Prismoid>
  )
}
```
