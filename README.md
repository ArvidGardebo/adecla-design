# adecla-design

Adeclas tokens och MUI-theme. Front-apparna (`finansportalen-v2`, `fondportalen`)
installerar paketet i stället för att definiera egna färger, typsnitt och avstånd.

Bakgrund och avgränsning: [adecla-context#37](https://github.com/ArvidGardebo/adecla-context/issues/37).

## Använda

Varje release bär det byggda paketet. Installera det via URL tills ett register är
valt (adecla-context#41):

```bash
pnpm add https://github.com/ArvidGardebo/adecla-design/releases/download/v0.2.0/adecla-design-0.2.0.tgz
```

Kräver `@mui/material`, `@emotion/react`, `@emotion/styled` och `react`.

```tsx
import 'adecla-design/fonts'
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { theme } from 'adecla-design'

<ThemeProvider theme={theme}>
  <CssBaseline />
  <App />
</ThemeProvider>
```

Tokens utanför MUI, till exempel i ett diagrambibliotek:

```ts
import { dataColors, color, space } from 'adecla-design'
```

Samma värden som CSS-variabler (`--ad-primary`, `--ad-space-4`, …) och textklasser
(`.ad-h1`, `.ad-table`, …):

```ts
import 'adecla-design/tokens.css'
```

`adecla-design/fonts` laddar typsnitten självhostade via Fontsource: Inter (400, 500,
600, 700) och Bricolage Grotesque (600). Importera den en gång, i appens ingång.

## Showcase

Den levande referensen: tokens och MUI-komponenterna med temat, i alla varianter.

```bash
npm run showcase
```

Öppna http://localhost:5190.

## Ändra

- `src/tokens.json` är den enda källan till värden. Inga hex-värden någon annanstans.
- `src/theme.ts` läser tokens och sätter komponentstilarna via `theme.components`.
- En ny komponentstil visas i `showcase/App.tsx`.
- Ett nytt färgpar i temat läggs till i `test/contrast.test.ts`. WCAG 2.1 AA är ett krav.

```bash
npm test
npm run build
```

## Släppa en version

1. Höj `version` i `package.json` och skriv ett avsnitt i `CHANGELOG.md`, i samma PR.
2. Efter merge: `git tag vX.Y.Z && git push origin vX.Y.Z`.
3. CI kontrollerar att taggen matchar `package.json` och skapar en GitHub-release med
   changelog-avsnittet och det byggda paketet (`adecla-design-X.Y.Z.tgz`).
