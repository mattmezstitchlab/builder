# AI+ME backend blueprint

## Current slice

The local Intelligence API exposes:

- `GET /api/health`
- `GET /api/objects`
- `GET /api/magic-folders`
- `POST /api/analyze`
- `GET /api/analysis/:id`
- `POST /api/magic-folders`
- `POST /api/transform`

The API is intentionally provider-neutral. OCR, vision, transcription and document parsing should plug into `buildAnalysis` through adapters rather than being coupled to the UI.

## Domain model

- **AIME Object**: one source of truth for a file, URL, message, image or code asset.
- **Context**: event, client, person, project, place or date inferred from objects.
- **Relation**: typed link between objects and contexts.
- **Magic Folder**: an editable hypothesis made from related object IDs.
- **Transformation**: a reviewed proposal that turns objects into a project, studio, timeline, moodboard or document.

## Next production adapters

1. Object storage and signed uploads.
2. OCR / vision / transcription workers.
3. Entity extraction and confidence scoring.
4. Postgres or SQLite persistence for objects and relations.
5. Queue-based analysis jobs with progress events.
6. Review and approval before a Magic Folder becomes a project.
