# adecla-design

Adeclas tokens och MUI-theme. Hur paketet används, ändras och släpps står i
`README.md`, ordförrådet i `CONTEXT.md`.

## Bevisa att en ändring fungerar

Samma som CI, i den här ordningen. Visa utdata i PR:en.

```bash
npm ci
npm run typecheck
npm test
npm run build
npm run showcase:build
```

Det finns ingen lint. Ändringar som syns: `npm run showcase` och titta på
http://localhost:5190.

En merge till main publicerar showcasen på GitHub Pages
(https://arvidgardebo.github.io/adecla-design/). Paketet släpps först när
någon pushar en tagg.

## Hur vi arbetar

Jira, triage, risknivåer och PR-regler står i adecla-workspace: dess
`CLAUDE.md`, `docs/agents/` och `docs/decisions/d011-granskning-efter-risk.md`.
Klona repot under adecla-workspace (`./setup.sh`) så att den `CLAUDE.md` läses.
