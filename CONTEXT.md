# adecla-design

Adeclas visuella grund: tokens och ett MUI-theme som front-apparna delar. Paketet
beskriver hur saker ser ut, aldrig vad de betyder i domänen.

## Språk

**Token**:
Ett namngivet designvärde i `src/tokens.json`: en färg, ett avstånd, en radie, en skugga
eller en textstil. Namnet säger vad värdet används till (`surface-card`, `ink-muted`),
inte hur det ser ut.
_Undvik_: variabel, konstant, färgkod

**Theme**:
MUI-temat byggt ur tokens. Det sätter komponenternas utseende via `theme.components`.
_Undvik_: stilmall, skin

**Yta** (`surface-*`):
En bakgrund som innehåll ligger på: sida, kort, hover, nedsänkt.

**Bläck** (`ink`, `ink-muted`):
Textfärg. `ink` för innehåll, `ink-muted` för etiketter och metadata.

**Dataserie** (`data-1` … `data-4`):
En färg för en serie i ett diagram, i fast ordning. Serie 1 är alltid eget innehav.
_Undvik_: diagramfärg 1, chart color

**Kontrastpar**:
En förgrund och en bakgrund som temat sätter ihop. Varje par testas mot WCAG 2.1 AA:
4,5:1 för text, 3:1 för kontrollkanter, fokusring och dataserier.

## Utanför paketet

- Egna komponenter (`KeyFigure`, `DataTable`, …), Storybook och mörkt läge.
- Fondbolagens egna färger. Finansportalen hanterar dem.
- Typsnittsfilerna. Appen laddar dem.
