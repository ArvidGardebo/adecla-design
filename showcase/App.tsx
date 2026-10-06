/*
 * Den levande referensen för hur systemet ser ut: tokens överst, sedan MUI-komponenterna
 * med temat i sina varianter. Allt läses ur paketet; sidan sätter inga egna värden utom
 * layout.
 */
import { useState, type ReactNode } from 'react'
import Alert from '@mui/material/Alert'
import AlertTitle from '@mui/material/AlertTitle'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardHeader from '@mui/material/CardHeader'
import Chip from '@mui/material/Chip'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Link from '@mui/material/Link'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import Stack from '@mui/material/Stack'
import Tab from '@mui/material/Tab'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableFooter from '@mui/material/TableFooter'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import TableSortLabel from '@mui/material/TableSortLabel'
import Tabs from '@mui/material/Tabs'
import TextField from '@mui/material/TextField'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'
import { BarChart } from '@mui/x-charts/BarChart'
import { LineChart } from '@mui/x-charts/LineChart'
import source from '../src/tokens.json' with { type: 'json' }
import { color, dataColors, radius, shadow, space, typeStyle, type ColorName, type TypeStyleName } from '../src/index.js'

const usage = (list: { name: string; usage: string }[], name: string) => list.find((t) => t.name === name)?.usage ?? ''

function Section({ id, title, note, children }: { id: string; title: string; note?: ReactNode; children: ReactNode }) {
  return (
    <Box component="section" id={id} sx={{ scrollMarginTop: 24 }}>
      <Typography variant="h1" component="h2">{title}</Typography>
      {note && <Typography variant="body2" color="text.secondary" sx={{ mt: 1, maxWidth: 720 }}>{note}</Typography>}
      <Stack sx={{ gap: 3, mt: 4 }}>{children}</Stack>
    </Box>
  )
}

function Panel({ title, meta, children, flush }: { title: string; meta?: ReactNode; children: ReactNode; flush?: boolean }) {
  return (
    <Card>
      <CardHeader title={title} action={meta} />
      {flush ? children : <CardContent>{children}</CardContent>}
    </Card>
  )
}

function Row({ children }: { children: ReactNode }) {
  return <Stack direction="row" sx={{ flexWrap: 'wrap', gap: 2, alignItems: 'center' }}>{children}</Stack>
}

function Label({ children }: { children: ReactNode }) {
  return <Typography variant="tableHead" color="text.secondary" component="div" sx={{ mb: 2 }}>{children}</Typography>
}

/* ---------- Tokens ---------- */

function Palette() {
  const names = Object.keys(color) as ColorName[]
  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 3 }}>
      {names.map((n) => (
        <Card key={n}>
          <Box sx={{ height: 64, bgcolor: color[n], borderBottom: 1, borderColor: 'divider' }} />
          <CardContent>
            <Typography variant="bodyStrong" component="div">{n}</Typography>
            <Typography variant="table" color="text.secondary" component="div">{color[n]}</Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>{usage(source.color.tokens, n)}</Typography>
          </CardContent>
        </Card>
      ))}
    </Box>
  )
}

function TypeScale() {
  const styles = source.type.groups.flatMap((g) => g.styles)
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Stil</TableCell>
          <TableCell>Exempel</TableCell>
          <TableCell>Storlek / radhöjd / vikt</TableCell>
          <TableCell>Används till</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {styles.map((s) => {
          const t = typeStyle[s.name as TypeStyleName]
          return (
            <TableRow key={s.name}>
              <TableCell>{s.name}</TableCell>
              <TableCell><Box component="span" sx={t}>{s.sample}</Box></TableCell>
              <TableCell>{t.fontSize} / {t.lineHeight} / {t.fontWeight}</TableCell>
              <TableCell sx={{ whiteSpace: 'normal' }}>{s.usage}</TableCell>
            </TableRow>
          )
        })}
      </TableBody>
    </Table>
  )
}

function Spacing() {
  return (
    <Stack sx={{ gap: 2 }}>
      {Object.entries(space).map(([n, val]) => (
        <Stack key={n} direction="row" sx={{ alignItems: 'center', gap: 4 }}>
          <Typography variant="table" sx={{ width: 96 }}>{n}</Typography>
          <Typography variant="table" color="text.secondary" sx={{ width: 48 }}>{val}</Typography>
          <Box sx={{ width: val, height: 16, bgcolor: 'primary.main', borderRadius: radius['radius-sm'] }} />
        </Stack>
      ))}
    </Stack>
  )
}

function Radii() {
  return (
    <Row>
      {Object.entries(radius).map(([n, val]) => (
        <Stack key={n} sx={{ alignItems: 'center', gap: 1 }}>
          <Box sx={{ width: 96, height: 64, border: 1, borderColor: 'lineControl', bgcolor: 'primary.soft', borderRadius: val }} />
          <Typography variant="table">{n}</Typography>
          <Typography variant="table" color="text.secondary">{val}</Typography>
        </Stack>
      ))}
    </Row>
  )
}

function Shadows() {
  return (
    <Row>
      {Object.entries(shadow).map(([n, val]) => (
        <Box key={n} sx={{ width: 200, p: 4, bgcolor: 'background.paper', borderRadius: radius['radius-lg'], boxShadow: val }}>
          <Typography variant="bodyStrong" component="div">{n}</Typography>
          <Typography variant="body2" color="text.secondary">{usage(source.shadow.tokens, n)}</Typography>
        </Box>
      ))}
    </Row>
  )
}

const months = ['jan', 'feb', 'mar', 'apr', 'maj', 'jun', 'jul', 'aug', 'sep', 'okt']
const series = [
  { label: 'Eget innehav', data: [40, 46, 44, 52, 58, 55, 63, 70, 68, 76] },
  { label: 'Jämförelseindex', data: [42, 44, 47, 46, 50, 53, 52, 56, 58, 60] },
  { label: 'Serie 3', data: [30, 28, 34, 38, 36, 41, 45, 43, 48, 52] },
  { label: 'Serie 4', data: [20, 25, 23, 27, 31, 30, 29, 35, 38, 36] },
]

function ChartColors() {
  return (
    <Stack sx={{ gap: 4 }}>
      <Row>
        {dataColors.map((c, i) => (
          <Stack key={c} direction="row" sx={{ alignItems: 'center', gap: 2, mr: 4 }}>
            <Box sx={{ width: 24, height: 24, borderRadius: radius['radius-sm'], bgcolor: c }} />
            <Box>
              <Typography variant="table" component="div">data-{i + 1}</Typography>
              <Typography variant="table" color="text.secondary" component="div">{c}</Typography>
            </Box>
          </Stack>
        ))}
      </Row>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 6 }}>
        <LineChart
          height={260}
          xAxis={[{ scaleType: 'point', data: months }]}
          series={series.map((s) => ({ ...s, showMark: false }))}
          grid={{ horizontal: true }}
        />
        <BarChart
          height={260}
          xAxis={[{ scaleType: 'band', data: months.slice(0, 5) }]}
          series={series.map((s) => ({ ...s, data: s.data.slice(0, 5) }))}
          grid={{ horizontal: true }}
        />
      </Box>
    </Stack>
  )
}

/* ---------- Komponenter ---------- */

function Buttons() {
  return (
    <Stack sx={{ gap: 4 }}>
      {(['contained', 'outlined', 'text'] as const).map((variant) => (
        <Box key={variant}>
          <Label>{variant}</Label>
          <Row>
            <Button variant={variant}>Sätt in pengar</Button>
            <Button variant={variant} size="small">Anpassa</Button>
            <Button variant={variant} disabled>Inaktiv</Button>
          </Row>
        </Box>
      ))}
    </Stack>
  )
}

function Fields() {
  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 4 }}>
      <TextField label="Belopp" defaultValue="10 000" />
      <TextField label="Meddelande" placeholder="Valfritt" />
      <TextField label="Kontonummer" helperText="Elva siffror, utan bindestreck." />
      <TextField label="Belopp" defaultValue="−50" error helperText="Beloppet måste vara större än 0 kr." />
      <TextField label="Konto" defaultValue="ISK 1234" disabled />
      <TextField label="Kommentar" multiline minRows={2} />
    </Box>
  )
}

function Selects() {
  const [account, setAccount] = useState('isk')
  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 4 }}>
      <FormControl>
        <InputLabel id="konto">Konto</InputLabel>
        <Select labelId="konto" label="Konto" value={account} onChange={(e) => setAccount(e.target.value)}>
          <MenuItem value="isk">ISK</MenuItem>
          <MenuItem value="kf">Kapitalförsäkring</MenuItem>
          <MenuItem value="af">Aktie- och fondkonto</MenuItem>
        </Select>
      </FormControl>
      <FormControl error>
        <InputLabel id="period">Period</InputLabel>
        <Select labelId="period" label="Period" defaultValue="">
          <MenuItem value="1m">1 månad</MenuItem>
          <MenuItem value="1y">1 år</MenuItem>
        </Select>
      </FormControl>
      <FormControl disabled>
        <InputLabel id="valuta">Valuta</InputLabel>
        <Select labelId="valuta" label="Valuta" defaultValue="sek">
          <MenuItem value="sek">SEK</MenuItem>
        </Select>
      </FormControl>
    </Box>
  )
}

function Chips() {
  return (
    <Stack sx={{ gap: 4 }}>
      {(['filled', 'outlined'] as const).map((variant) => (
        <Box key={variant}>
          <Label>{variant}</Label>
          <Row>
            <Chip variant={variant} label="ISK" />
            <Chip variant={variant} label="Ny" color="primary" />
            <Chip variant={variant} label="Info" color="info" />
            <Chip variant={variant} label="Utförd" color="success" />
            <Chip variant={variant} label="Väntar" color="warning" />
            <Chip variant={variant} label="Avvisad" color="error" />
            {variant === 'filled' && <Chip label="99+" color="alert" />}
          </Row>
        </Box>
      ))}
    </Stack>
  )
}

const rows = [
  { name: 'Spotify', qty: 1, change: '+2,11 %', value: '4 839 kr' },
  { name: 'Investor B', qty: 28, change: '+1,41 %', value: '11 466 kr' },
  { name: 'Volvo B', qty: 40, change: '−0,62 %', value: '10 724 kr' },
]

function Tables() {
  const [desc, setDesc] = useState(true)
  return (
    <Table aria-label="Aktieinnehav">
      <TableHead>
        <TableRow>
          <TableCell>Namn</TableCell>
          <TableCell align="right">Antal</TableCell>
          <TableCell align="right">1 dag %</TableCell>
          <TableCell align="right" sortDirection={desc ? 'desc' : 'asc'}>
            <TableSortLabel active direction={desc ? 'desc' : 'asc'} onClick={() => setDesc(!desc)}>Värde</TableSortLabel>
          </TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {rows.map((r) => (
          <TableRow key={r.name} hover>
            <TableCell><Link href="#">{r.name}</Link></TableCell>
            <TableCell align="right">{r.qty}</TableCell>
            <TableCell align="right" sx={{ color: r.change.startsWith('+') ? 'success.main' : 'error.main' }}>{r.change}</TableCell>
            <TableCell align="right">{r.value}</TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={3}>Totalt värde</TableCell>
          <TableCell align="right">27 029 kr</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  )
}

function TabsDemo() {
  const [tab, setTab] = useState('oversikt')
  return (
    <Tabs value={tab} onChange={(_, v) => setTab(v)} aria-label="Min ekonomi">
      <Tab value="oversikt" label="Översikt" />
      <Tab value="utveckling" label="Utveckling" />
      <Tab value="transaktioner" label="Transaktioner" />
      <Tab value="kontoinfo" label="Kontoinfo" disabled />
    </Tabs>
  )
}

function DialogDemo() {
  const [open, setOpen] = useState(false)
  return (
    <>
      <Box><Button variant="contained" onClick={() => setOpen(true)}>Ta ut pengar</Button></Box>
      <Dialog open={open} onClose={() => setOpen(false)} aria-labelledby="uttag-titel" maxWidth="xs" fullWidth>
        <DialogTitle id="uttag-titel">Ta ut pengar</DialogTitle>
        <DialogContent>
          <Typography sx={{ mb: 4 }}>Pengarna finns på ditt bankkonto inom två bankdagar.</Typography>
          <TextField label="Belopp" fullWidth autoFocus />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Avbryt</Button>
          <Button variant="contained" onClick={() => setOpen(false)}>Ta ut</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

const alerts = [
  { severity: 'info', title: 'Ny funktion', text: 'Du kan nu se avkastning per konto.' },
  { severity: 'success', title: 'Ordern är lagd.', text: 'Du ser den under Pågående ordrar.' },
  { severity: 'warning', title: 'Marknaden är stängd', text: 'Ordern läggs när börsen öppnar.' },
  { severity: 'error', title: 'Ordern gick inte igenom', text: 'Det finns inte tillräckligt med pengar på kontot.' },
] as const

function Alerts() {
  return (
    <Stack sx={{ gap: 4 }}>
      {(['standard', 'outlined', 'filled'] as const).map((variant) => (
        <Box key={variant}>
          <Label>{variant}</Label>
          <Stack sx={{ gap: 2 }}>
            {alerts.map((a) => (
              <Alert key={a.severity} variant={variant} severity={a.severity}>
                <AlertTitle>{a.title}</AlertTitle>
                {a.text}
              </Alert>
            ))}
          </Stack>
        </Box>
      ))}
    </Stack>
  )
}

function Tooltips() {
  return (
    <Row>
      <Tooltip title="Senast uppdaterad: 10 sek sedan"><Button>Hovra här</Button></Tooltip>
      <Tooltip title="Med pil" arrow><Button>Med pil</Button></Tooltip>
    </Row>
  )
}

/* ---------- Sidan ---------- */

const nav = [
  ['farg', 'Färg'], ['typografi', 'Typografi'], ['form', 'Avstånd, hörn och djup'], ['diagram', 'Diagram'], ['komponenter', 'Komponenter'],
] as const

export function App() {
  return (
    <Box sx={{ maxWidth: 1170, mx: 'auto', px: { xs: 4, md: 12 }, py: 8 }}>
      <Typography variant="display" component="h1">Adecla designsystem</Typography>
      <Typography color="text.secondary" sx={{ mt: 1 }}>
        Tokens och MUI-theme ur <code>adecla-design</code>. Allt på sidan läses ur paketet.
      </Typography>
      <Stack direction="row" component="nav" aria-label="Sektioner" sx={{ flexWrap: 'wrap', gap: 4, mt: 4, mb: 8 }}>
        {nav.map(([id, label]) => <Link key={id} href={`#${id}`}>{label}</Link>)}
      </Stack>

      <Stack sx={{ gap: 12 }}>
        <Section id="farg" title="Färg" note="Alla färgtokens med värde och användning. Varje par som temat sätter ihop testas mot WCAG 2.1 AA.">
          <Palette />
        </Section>

        <Section id="typografi" title="Typografi">
          <Panel title="Typskala" flush><TypeScale /></Panel>
        </Section>

        <Section id="form" title="Avstånd, hörn och djup">
          <Panel title="Avstånd"><Spacing /></Panel>
          <Panel title="Hörnradier"><Radii /></Panel>
          <Panel title="Skuggor"><Shadows /></Panel>
        </Section>

        <Section
          id="diagram"
          title="Diagram"
          note="Dataserierna i ordning, i @mui/x-charts. Serie 1 är alltid eget innehav. Alla klarar 3:1 mot kort- och sidbakgrund."
        >
          <Panel title="Diagramfärger"><ChartColors /></Panel>
        </Section>

        <Section
          id="komponenter"
          title="Komponenter"
          note="Fält, Select, Dialog, Alert och Tooltip finns inte i referensdesignen. Deras stilar följer referensens README och är inte granskade."
        >
          <Panel title="Button"><Buttons /></Panel>
          <Panel title="TextField"><Fields /></Panel>
          <Panel title="Select"><Selects /></Panel>
          <Panel title="Chip"><Chips /></Panel>
          <Panel title="Card" meta={<>Senast uppdaterad: 10 sek sedan<Button variant="text" size="small">Anpassa</Button></>}>
            <Typography>När du har pågående ordrar ser du dem här.</Typography>
          </Panel>
          <Panel title="Table" flush><Tables /></Panel>
          <Panel title="Tabs"><TabsDemo /></Panel>
          <Panel title="Dialog"><DialogDemo /></Panel>
          <Panel title="Alert"><Alerts /></Panel>
          <Panel title="Tooltip"><Tooltips /></Panel>
        </Section>
      </Stack>
    </Box>
  )
}
