# Domain Docs

How the engineering skills should consume this repo's domain documentation when exploring the codebase.

## Before exploring, read these

- **`GLOSSARY.md`** at the repo root, or
- **`GLOSSARY-MAP.md`** at the repo root if it exists: it points at one `GLOSSARY.md` per context. Read each one relevant to the topic.
- **`docs/decisions/`** in this repo: decisions that only concern this repo.
- **`docs/decisions/`** in adecla-workspace: decisions for every Adecla repo. Read the ones that touch the area you're about to work in.

Decisions live in `docs/decisions/`, never in `docs/adr/`. When a skill says ADR, it means a file there, named `dNNN-short-title.md` and written in the same format as the decisions in adecla-workspace.

`GLOSSARY.md` (or `GLOSSARY-MAP.md`) is required by the Adecla standard (`scripts/check-repo.sh` in adecla-workspace); if it is missing, say so. The decision folders may be empty or missing: then **proceed silently**, and let `/domain-modeling` create decisions when they actually get resolved.

## Use the glossary's vocabulary

When your output names a domain concept (in an issue title, a refactor proposal, a hypothesis, a test name), use the term as defined in `GLOSSARY.md`. Don't drift to synonyms the glossary explicitly avoids.

If the concept you need isn't in the glossary yet, that's a signal: either you're inventing language the project doesn't use (reconsider) or there's a real gap (note it for `/domain-modeling`).

## Flag decision conflicts

If your output contradicts an existing decision, surface it explicitly rather than silently overriding:

> _Contradicts d011 (review by risk), but worth reopening because…_
