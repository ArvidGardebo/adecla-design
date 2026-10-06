# Changelog

Versionerna följer [semver](https://semver.org/lang/sv/). Före 1.0.0 betyder en ny
minor-version att något kan behöva ändras i apparna.

## 0.2.0

### Tillagt

- `adecla-design/fonts`: Inter och Bricolage Grotesque, självhostade via Fontsource.
- Stilar för TextField, Select, Menu, Dialog, Alert och Tooltip. `info` pekar på `primary`.
- Chip i varianten `outlined`, och färgen `info`.
- Showcase-sida: `npm run showcase`.
- Diagram i `@mui/x-charts` får dataserierna `data-1` … `data-4` från temat
  (`MuiChartsDataProvider`), utan att varje graf anger färger.

## 0.1.0

### Tillagt

- Tokens (`color`, `space`, `radius`, `shadow`, `fontFamily`, `typeStyle`, `dataColors`)
  som TS och som CSS-variabler i `adecla-design/tokens.css`.
- MUI-theme med `cssVariables: true`, byggt från prototypens variant B.
- Kontrasttest mot WCAG 2.1 AA.

### Ändrat mot prototypen

- `data-2` `#3e9e64`, `data-3` `#b8850e`, `data-4` `#a679d8` och `line-control` `#878da0`,
  så att de klarar 3:1 mot kort-, sid- och hoverbakgrund.
