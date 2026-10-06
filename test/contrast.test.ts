/*
 * WCAG 2.1 AA för de par som temat faktiskt sätter ihop.
 * Text kräver 4,5:1 (1.4.3). Kontrollkanter, fokusring och diagramserier kräver 3:1 (1.4.11).
 * Ett nytt par i temat hör hemma här.
 */
import { describe, expect, it } from 'vitest'
import { color, type ColorName } from '../src/tokens.js'

function luminance(hex: string) {
  const n = parseInt(hex.slice(1), 16)
  const [r, g, b] = [n >> 16, (n >> 8) & 255, n & 255].map((c) => {
    const s = c / 255
    return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4
  })
  return 0.2126 * r + 0.7152 * g + 0.0722 * b
}

function contrast(a: string, b: string) {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x)
  return (hi + 0.05) / (lo + 0.05)
}

type Pair = [fg: ColorName, bg: ColorName]
const surfaces: ColorName[] = ['surface-card', 'surface-page', 'surface-hover']
const on = (fgs: ColorName[], bgs: ColorName[]): Pair[] => fgs.flatMap((fg) => bgs.map((bg): Pair => [fg, bg]))

const text: Pair[] = [
  ...on(['ink', 'ink-muted', 'primary', 'link', 'positive', 'negative', 'warning'], surfaces),
  ...on(['ink', 'ink-muted', 'primary'], ['primary-soft']),
  ...on(['ink', 'ink-muted'], ['surface-sunken']),
  ...on(['on-primary'], ['primary', 'primary-hover', 'primary-pressed', 'alert']),
  ['positive', 'positive-soft'],
  ['negative', 'negative-soft'],
  ['warning', 'warning-soft'],
]

const graphics: Pair[] = on(['line-control', 'focus', 'data-1', 'data-2', 'data-3', 'data-4'], surfaces)

describe('text, 4,5:1', () => {
  it.each(text)('%s på %s', (fg, bg) => {
    expect(contrast(color[fg], color[bg])).toBeGreaterThanOrEqual(4.5)
  })
})

describe('grafik och kontroller, 3:1', () => {
  it.each(graphics)('%s på %s', (fg, bg) => {
    expect(contrast(color[fg], color[bg])).toBeGreaterThanOrEqual(3)
  })
})
