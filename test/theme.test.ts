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
