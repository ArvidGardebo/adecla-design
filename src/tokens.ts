/*
 * Adeclas tokens, lösta ur tokens.json. tokens.json är den enda källan till värden;
 * den här filen ger dem namn och typer.
 *
 * Färgnamnen är semantiska (surface-card, ink, positive), inte nyanser. Ett mörkt läge
 * ger samma namn nya värden och lägger till ett schema i colorSchemes, utan att byta namn.
 */
import source from './tokens.json' with { type: 'json' }

type Named = { name: string; value: string }
type TypeStyleSource = { name: string; fontSize: string; lineHeight: string; fontWeight: number; letterSpacing?: string }

export type ColorName = (typeof source.color.tokens)[number]['name']
export type SpaceName = (typeof source.spacing.tokens)[number]['name']
export type RadiusName = (typeof source.radius.tokens)[number]['name']
export type ShadowName = (typeof source.shadow.tokens)[number]['name']
export type FontFamilyName = keyof typeof source.type.families

export type TypeStyle = {
  fontFamily: string
  fontSize: string
  lineHeight: string
  fontWeight: number
  letterSpacing?: string
  /** Inter-stilarna har tabulära siffror, så att siffror står rakt i kolumn. */
  fontVariantNumeric?: 'tabular-nums'
}

const byName = <N extends string>(list: Named[]) =>
  Object.fromEntries(list.map((t) => [t.name, t.value])) as Record<N, string>

/** Löser alias som "{primary}" till sitt värde. */
function resolveColors(list: Named[]): Record<ColorName, string> {
  const raw = byName<ColorName>(list)
  const resolve = (name: string, seen: string[] = []): string => {
    const value = raw[name as ColorName]
    if (value === undefined) throw new Error(`Okänd färgtoken: ${name}`)
    if (seen.includes(name)) throw new Error(`Alias i cirkel: ${[...seen, name].join(' → ')}`)
    const alias = /^\{(.+)\}$/.exec(value)
    return alias ? resolve(alias[1], [...seen, name]) : value
  }
  return Object.fromEntries(Object.keys(raw).map((n) => [n, resolve(n)])) as Record<ColorName, string>
}

function resolveTypeStyles() {
  const styles: Record<string, TypeStyle> = {}
  for (const group of source.type.groups) {
    const family = group.family as FontFamilyName
    for (const s of group.styles as TypeStyleSource[]) {
      styles[s.name] = {
        fontFamily: source.type.families[family],
        fontSize: s.fontSize,
        lineHeight: s.lineHeight,
        fontWeight: s.fontWeight,
        ...(s.letterSpacing ? { letterSpacing: s.letterSpacing } : {}),
        ...(family === 'sans' ? { fontVariantNumeric: 'tabular-nums' as const } : {}),
      }
    }
  }
  return styles as Record<TypeStyleName, TypeStyle>
}
export type TypeStyleName = (typeof source.type.groups)[number]['styles'][number]['name']

export const color = resolveColors(source.color.tokens)
export const space = byName<SpaceName>(source.spacing.tokens)
export const radius = byName<RadiusName>(source.radius.tokens)
export const shadow = byName<ShadowName>(source.shadow.tokens)
export const fontFamily = source.type.families
export const typeStyle = resolveTypeStyles()

/** Diagramserierna i ordning. Serie 1 är alltid eget innehav. */
export const dataColors = [color['data-1'], color['data-2'], color['data-3'], color['data-4']] as const

export const tokens = { color, space, radius, shadow, fontFamily, typeStyle, dataColors }
export type Tokens = typeof tokens
