/*
 * Tokenfilens namn är inte typade som literaler (JSON-importer blir string), så ett
 * felstavat namn i theme.ts ger undefined i stället för ett typfel. Det här fångar det.
 */
import { describe, expect, it } from 'vitest'
import { theme } from '../src/theme.js'
import { dataColors } from '../src/tokens.js'

function undefinedPaths(value: unknown, path = ''): string[] {
  if (value === undefined) return [path]
  if (value === null || typeof value !== 'object') return []
  return Object.entries(value).flatMap(([k, v]) => undefinedPaths(v, `${path}.${k}`))
}

describe('theme', () => {
  it('har inga odefinierade värden i palett, typografi eller form', () => {
    const { palette, typography, shape, shadows } = theme
    expect(undefinedPaths({ palette, typography, shape, shadows })).toEqual([])
  })

  it('har diagramfärgerna i paletten', () => {
    expect(Object.keys(theme.palette.data)).toEqual(['1', '2', '3', '4'])
  })
})

describe('diagram', () => {
  it('ger @mui/x-charts dataserierna i ordning', () => {
    const provider = (theme.components as Record<string, { defaultProps?: { colors?: string[] } }>).MuiChartsDataProvider
    expect(provider.defaultProps?.colors).toEqual([...dataColors])
  })
})

/* Läser en styleOverride som MUI gör: anropar den med temat. */
type Styles = Record<string, unknown>
const override = (component: string, slot: string): Styles => {
  const c = (theme.components as Record<string, { styleOverrides?: Record<string, unknown> }>)[component]
  const s = c?.styleOverrides?.[slot]
  return (typeof s === 'function' ? s({ theme }) : s) as Styles
}

type DefaultProps = Record<string, unknown>
const defaults = (component: string): DefaultProps =>
  ((theme.components as Record<string, { defaultProps?: DefaultProps }>)[component]?.defaultProps ?? {})

describe('knapp', () => {
  it('har radius-md, inte pill', () => {
    expect(override('MuiButton', 'root').borderRadius).toBe(theme.shape.radius.md)
  })
})

describe('etikett', () => {
  it('står fast ovanför fältet', () => {
    expect(defaults('MuiInputLabel')).toMatchObject({ shrink: true })
    expect(override('MuiInputLabel', 'root')).toMatchObject({ position: 'static', transform: 'none' })
  })

  it('ger ramen inget hack', () => {
    expect(defaults('MuiOutlinedInput')).toMatchObject({ notched: false })
  })
})

describe('fält i fokus', () => {
  it('visar fokus med ramen, inte med en outline', () => {
    const root = override('MuiOutlinedInput', 'root')
    expect(root['&.Mui-focused']).toMatchObject({ outline: 'none' })
    expect(root['&.Mui-focused .MuiOutlinedInput-notchedOutline']).toMatchObject({ borderWidth: 2 })
  })
})

describe('meny', () => {
  it('markerar valt alternativ med en bock', () => {
    const item = override('MuiMenuItem', 'root')
    expect(item['&.Mui-selected::after']).toMatchObject({ content: '""' })
  })
})

describe('Autocomplete', () => {
  it('har samma panel som Select-menyn', () => {
    expect(override('MuiAutocomplete', 'paper')).toEqual(override('MuiMenu', 'paper'))
  })

  it('markerar valt alternativ med en bock, som menyn', () => {
    const option = override('MuiAutocomplete', 'listbox')['& .MuiAutocomplete-option'] as Styles
    expect(option['&[aria-selected="true"]::after']).toEqual(override('MuiMenuItem', 'root')['&.Mui-selected::after'])
  })
})
