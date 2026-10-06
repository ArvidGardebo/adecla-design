/*
 * Skriver dist/tokens.css ur de byggda tokens: samma värden som TS-exporten, som
 * CSS-variabler under :root, plus en klass per textstil. Körs efter tsc.
 */
import { writeFileSync } from 'node:fs'
import { color, space, radius, shadow, fontFamily, typeStyle } from '../dist/tokens.js'

const kebab = (s) => s.replace(/[A-Z]/g, (c) => `-${c.toLowerCase()}`)
const vars = [
  ...Object.entries(color).map(([n, v]) => `--ad-${n}: ${v};`),
  ...Object.entries(space).map(([n, v]) => `--ad-${n}: ${v};`),
  ...Object.entries(radius).map(([n, v]) => `--ad-${n}: ${v};`),
  ...Object.entries(shadow).map(([n, v]) => `--ad-${n}: ${v};`),
  ...Object.entries(fontFamily).map(([n, v]) => `--ad-font-${n}: ${v};`),
]
const classes = Object.entries(typeStyle).map(
  ([n, s]) => `.ad-${n} { ${Object.entries(s).map(([k, v]) => `${kebab(k)}: ${v};`).join(' ')} }`,
)

writeFileSync(
  new URL('../dist/tokens.css', import.meta.url),
  `/* Adecla tokens. Genererad ur src/tokens.json, redigera inte. */\n:root {\n${vars.map((l) => `  ${l}`).join('\n')}\n}\n\n${classes.join('\n')}\n`,
)
