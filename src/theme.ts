/*
 * Adecla som MUI-theme, byggt ur tokens.
 * Inga färg-, storleks- eller skuggvärden skrivs här; allt läses ur tokens.
 * Komponentstilarna läser theme.vars, så att colorSchemes.dark kan läggas till senare.
 */
import { createTheme, type CSSObject, type Theme, type TypographyStyle } from '@mui/material/styles'
import { createElement } from 'react'
import { color, fontFamily, radius, shadow, space, typeStyle as tokenTypeStyle, type TypeStyleName } from './tokens.js'

/** En textstil som MUI-typografi. */
const typeStyle = (name: TypeStyleName): TypographyStyle => tokenTypeStyle[name]

/* ---------- Typer för det som MUI inte har ---------- */

type Radii = { sm: string; md: string; lg: string; pill: string }
type DataColors = { 1: string; 2: string; 3: string; 4: string }

declare module '@mui/material/styles' {
  interface PaletteColor { pressed?: string; soft?: string; subtle?: string }
  interface SimplePaletteColorOptions { pressed?: string; soft?: string; subtle?: string }
  interface TypeBackground { hover: string; sunken: string }
  interface Palette { lineControl: string; alert: PaletteColor; data: DataColors }
  interface PaletteOptions { lineControl?: string; alert?: SimplePaletteColorOptions; data?: DataColors }
  interface Shape { radius: Radii }
  interface ShapeOptions { radius?: Radii }

  interface TypographyVariants {
    display: TypographyStyle; kpi: TypographyStyle; bodyStrong: TypographyStyle; table: TypographyStyle; tableHead: TypographyStyle
  }
  interface TypographyVariantsOptions {
    display?: TypographyStyle; kpi?: TypographyStyle; bodyStrong?: TypographyStyle; table?: TypographyStyle; tableHead?: TypographyStyle
  }
}
declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    display: true; kpi: true; bodyStrong: true; table: true; tableHead: true
  }
}
declare module '@mui/material/Chip' {
  interface ChipPropsColorOverrides { alert: true }
}

/** Bygger temat ur tokens. */
function createAdeclaTheme() {
  const buttonBorder = color['button-border']
  const buttonBorderHover = color['button-border-hover']

  const focusRing: CSSObject = { outline: `2px solid ${color['focus']}`, outlineOffset: 2 }
  const v = (theme: Theme) => theme.vars!

  /** MUI kräver 25 skuggsteg. 1–7 är kort, 8–24 svävar (menyer 8, dialoger 24). */
  const shadows = Array.from({ length: 25 }, (_, i) =>
    i === 0 ? 'none' : i < 8 ? shadow['shadow-card'] : shadow['shadow-pop'],
  ) as Theme['shadows']

  return createTheme({
    cssVariables: true,
    colorSchemes: {
      light: {
        palette: {
          primary: {
            main: color['primary'],
            dark: color['primary-hover'],
            pressed: color['primary-pressed'],
            soft: color['primary-soft'],
            subtle: color['primary-subtle'],
            contrastText: color['on-primary'],
          },
          success: { main: color['positive'], soft: color['positive-soft'], contrastText: color['on-primary'] },
          error: { main: color['negative'], soft: color['negative-soft'], contrastText: color['on-primary'] },
          warning: { main: color['warning'], soft: color['warning-soft'], contrastText: color['on-primary'] },
          alert: { main: color['alert'], contrastText: color['on-primary'] },
          background: {
            default: color['surface-page'],
            paper: color['surface-card'],
            hover: color['surface-hover'],
            sunken: color['surface-sunken'],
          },
          text: { primary: color['ink'], secondary: color['ink-muted'] },
          divider: color['line'],
          lineControl: color['line-control'],
          action: { hover: color['surface-hover'] },
          data: { 1: color['data-1'], 2: color['data-2'], 3: color['data-3'], 4: color['data-4'] },
        },
      },
    },
    spacing: parseInt(space['space-1'], 10),
    shape: {
      borderRadius: parseInt(radius['radius-md'], 10),
      radius: { sm: radius['radius-sm'], md: radius['radius-md'], lg: radius['radius-lg'], pill: radius['radius-pill'] },
    },
    shadows,
    typography: {
      fontFamily: fontFamily.sans,
      display: typeStyle('display'),
      h1: typeStyle('h1'),
      h2: typeStyle('h2'),
      kpi: typeStyle('kpi'),
      body1: typeStyle('body'),
      bodyStrong: typeStyle('body-strong'),
      table: typeStyle('table'),
      tableHead: typeStyle('table-head'),
      body2: typeStyle('small'),
      caption: typeStyle('caption'),
      /* Facit sätter font: inherit på knappar, vilket nollställer tabulära siffror. */
      button: { ...typeStyle('body'), fontWeight: 500, textTransform: 'none', fontVariantNumeric: 'normal' },
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: (theme) => ({
          /* Som facits body i bundle.css: body-stilen men utan tnum (den sätts per komponent). */
          body: { ...typeStyle('body'), fontVariantNumeric: 'normal', WebkitFontSmoothing: 'antialiased', backgroundColor: v(theme).palette.background.default },
        }),
      },
      MuiTypography: {
        defaultProps: {
          variantMapping: {
            display: 'h1', h1: 'h1', h2: 'h2', kpi: 'span', bodyStrong: 'p', table: 'span', tableHead: 'span',
          },
        },
      },

      /* Ingen ripple i designen; fokus är en ring. */
      MuiButtonBase: {
        defaultProps: { disableRipple: true },
        styleOverrides: { root: { '&.Mui-focusVisible': focusRing } },
      },
      MuiLink: {
        defaultProps: { underline: 'hover' },
        styleOverrides: { root: { fontWeight: 500, '&:focus-visible': focusRing } },
      },

      /* Button: contained = primary, outlined = secondary, text = ghost. */
      MuiButton: {
        defaultProps: { variant: 'outlined', disableElevation: true },
        styleOverrides: {
          root: ({ theme }) => ({
            minWidth: 0,
            height: 36,
            padding: `0 ${space['space-4']}`,
            gap: space['space-2'],
            border: '1px solid transparent',
            borderRadius: theme.shape.radius.pill,
            whiteSpace: 'nowrap',
            transition: 'background-color .12s, border-color .12s',
            '&.Mui-disabled': { opacity: 0.45 },
            variants: [
              {
                props: { variant: 'contained' },
                style: {
                  backgroundColor: v(theme).palette.primary.main,
                  color: v(theme).palette.primary.contrastText,
                  '&:hover': { backgroundColor: v(theme).palette.primary.dark },
                  '&:active': { backgroundColor: v(theme).palette.primary.pressed },
                  '&.Mui-disabled': { backgroundColor: v(theme).palette.primary.main, color: v(theme).palette.primary.contrastText },
                },
              },
              {
                props: { variant: 'outlined' },
                style: {
                  backgroundColor: v(theme).palette.background.paper,
                  color: v(theme).palette.text.primary,
                  borderColor: buttonBorder,
                  '&:hover': { backgroundColor: v(theme).palette.background.hover, borderColor: buttonBorderHover },
                  '&.Mui-disabled': { color: v(theme).palette.text.primary, borderColor: buttonBorder },
                },
              },
              {
                props: { variant: 'text' },
                style: {
                  color: v(theme).palette.primary.main,
                  '&:hover': { backgroundColor: v(theme).palette.primary.soft },
                  '&.Mui-disabled': { color: v(theme).palette.primary.main },
                },
              },
              {
                props: { size: 'small' },
                style: { height: 28, padding: `0 ${space['space-3']}`, fontSize: typeStyle('small').fontSize },
              },
            ],
          }),
          startIcon: { margin: 0, '& > *:nth-of-type(1)': { fontSize: 16 } },
        },
      },

      /* Badge = Chip. Standardfärgen är neutral; count = color="alert". */
      MuiChip: {
        defaultProps: { size: 'small' },
        styleOverrides: {
          root: ({ theme }) => ({
            ...typeStyle('caption'),
            fontVariantNumeric: 'normal', // facit sätter inte tnum på badges
            height: 20,
            padding: `0 ${space['space-2']}`,
            borderRadius: theme.shape.radius.sm,
            backgroundColor: v(theme).palette.background.sunken,
            color: v(theme).palette.text.secondary,
            variants: [
              ...(['primary', 'success', 'error', 'warning'] as const).map((c) => ({
                props: { color: c },
                style: { backgroundColor: v(theme).palette[c].soft, color: v(theme).palette[c].main },
              })),
              {
                props: { color: 'alert' },
                style: {
                  height: 18,
                  padding: '0 6px',
                  borderRadius: theme.shape.radius.pill,
                  backgroundColor: v(theme).palette.alert.main,
                  color: v(theme).palette.alert.contrastText,
                },
              },
            ],
          }),
          label: { padding: 0 },
        },
      },

      /* Tabs: underline-flikar, 3px indikator som täcker hårlinjen. */
      MuiTabs: {
        /* I facit väljer piltangenterna fliken, inte bara fokus. */
        defaultProps: { selectionFollowsFocus: true },
        styleOverrides: {
          root: ({ theme }) => ({ minHeight: 0, boxShadow: `inset 0 -1px 0 ${v(theme).palette.divider}` }),
          list: { gap: space['space-6'] },
          indicator: ({ theme }) => ({ height: 3, backgroundColor: v(theme).palette.primary.main }),
        },
      },
      MuiTab: {
        styleOverrides: {
          root: ({ theme }) => ({
            ...typeStyle('body'),
            fontVariantNumeric: 'normal', // facit: font: inherit
            minHeight: 0,
            minWidth: 0,
            maxWidth: 'none',
            padding: `${space['space-3']} 0 calc(${space['space-3']} + 3px)`,
            color: v(theme).palette.text.secondary,
            '&:hover': { color: v(theme).palette.text.primary },
            '&.Mui-selected': { color: v(theme).palette.text.primary, fontWeight: 600 },
          }),
        },
      },

      /* Card: vit panel, hårlinje, nästan osynlig skugga. */
      MuiCard: {
        defaultProps: { variant: 'outlined' },
        styleOverrides: {
          root: ({ theme }) => ({
            borderColor: v(theme).palette.divider,
            borderRadius: theme.shape.radius.lg,
            boxShadow: shadow['shadow-card'],
          }),
        },
      },
      MuiCardHeader: {
        defaultProps: { slotProps: { title: { variant: 'h2' } } },
        styleOverrides: {
          root: ({ theme }) => ({
            gap: space['space-4'],
            padding: space['space-4'],
            minHeight: 28,
            borderBottom: `1px solid ${v(theme).palette.divider}`,
          }),
          action: ({ theme }) => ({
            ...typeStyle('small'),
            fontVariantNumeric: 'normal', // facits .ad-card-meta har ingen tnum
            display: 'flex',
            alignItems: 'center',
            alignSelf: 'center',
            gap: space['space-4'],
            margin: 0,
            color: v(theme).palette.text.secondary,
          }),
        },
      },
      MuiCardContent: {
        styleOverrides: { root: { padding: space['space-4'], '&:last-child': { paddingBottom: space['space-4'] } } },
      },

      /* Tabell: tät, hårlinjer, tabulära siffror. */
      MuiTable: { styleOverrides: { root: typeStyle('table') } },
      MuiTableCell: {
        styleOverrides: {
          root: ({ theme }) => ({
            ...typeStyle('table'),
            padding: `${space['space-3']} ${space['space-4']}`,
            borderBottom: `1px solid ${v(theme).palette.divider}`,
            color: v(theme).palette.text.primary,
            whiteSpace: 'nowrap',
          }),
          head: ({ theme }) => ({ ...typeStyle('table-head'), color: v(theme).palette.text.secondary }),
          footer: ({ theme }) => ({ fontWeight: 600, color: v(theme).palette.text.primary, borderBottom: 0 }),
        },
      },
      MuiTableRow: {
        styleOverrides: { root: ({ theme }) => ({ '&.MuiTableRow-hover:hover': { backgroundColor: v(theme).palette.background.hover } }) },
      },
      /* Sorteringsknapp: ⇅ när kolumnen inte är sorterad, annars ▲ eller ▼. */
      MuiTableSortLabel: {
        defaultProps: { IconComponent: SortGlyph },
        styleOverrides: {
          root: ({ theme }) => ({
            flexDirection: 'row',
            verticalAlign: 'baseline', // ButtonBase har middle, facits knapp står på baslinjen
            gap: space['space-1'],
            padding: '2px 4px',
            margin: '-2px -4px',
            borderRadius: theme.shape.radius.sm,
            color: 'inherit',
            '&:hover, &.Mui-active': { color: v(theme).palette.text.primary, backgroundColor: v(theme).palette.background.sunken },
            '&:focus, &:hover, &.Mui-active': { '& .MuiTableSortLabel-icon': { opacity: 0.8, color: 'inherit' } },
            '&.Mui-active.MuiTableSortLabel-directionAsc .MuiTableSortLabel-icon::before': { content: '"▲"' },
            '&.Mui-active.MuiTableSortLabel-directionDesc .MuiTableSortLabel-icon::before': { content: '"▼"' },
          }),
          icon: {
            margin: 0,
            fontSize: 9,
            lineHeight: 1,
            opacity: 0.8,
            transform: 'none !important',
            '&::before': { content: '"⇅"' },
          },
        },
      },
    },
  })
}

export const theme = createAdeclaTheme()

function SortGlyph({ className }: { className: string }) {
  return createElement('span', { className, 'aria-hidden': true })
}
