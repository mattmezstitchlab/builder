import http from 'node:http'
import { randomUUID } from 'node:crypto'

const port = Number(process.env.API_PORT || 8787)
const objects = new Map()
const magicFolders = new Map()
const analyses = new Map()

const seedObjects = [
  { id: 'seed-devis', name: 'devis-traiteur.pdf', format: 'PDF', kind: 'document', nature: 'Devis', context: 'Mariage Sophie & Thomas', confidence: 0.96 },
  { id: 'seed-contrat', name: 'contrat-salle.pdf', format: 'PDF', kind: 'document', nature: 'Contrat', context: 'Mariage Sophie & Thomas', confidence: 0.93 },
  { id: 'seed-photo', name: 'photo-lieu.jpg', format: 'JPG', kind: 'image', nature: 'Photo de lieu', context: 'Mariage Sophie & Thomas', confidence: 0.89 },
  { id: 'seed-planning', name: 'planning.xlsx', format: 'XLSX', kind: 'data', nature: 'Planning', context: 'Mariage Sophie & Thomas', confidence: 0.94 },
]
seedObjects.forEach((object) => objects.set(object.id, object))

function json(res, status, payload) {
  const body = JSON.stringify(payload)
  res.writeHead(status, {
    'Content-Type': 'application/json; charset=utf-8',
    'Content-Length': Buffer.byteLength(body),
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
  })
  res.end(body)
}

function empty(res, status = 204) {
  res.writeHead(status, { 'Access-Control-Allow-Origin': '*' })
  res.end()
}

async function body(req) {
  let raw = ''
  for await (const chunk of req) raw += chunk
  if (!raw) return {}
  try { return JSON.parse(raw) } catch { return {} }
}

function inferContext(text = '') {
  const value = text.toLowerCase()
  if (value.includes('mariage') || value.includes('wedding')) return { type: 'wedding', label: 'Mariage' }
  if (value.includes('festival') || value.includes('concert')) return { type: 'festival', label: 'Festival' }
  if (value.includes('conférence') || value.includes('conference') || value.includes('summit')) return { type: 'conference', label: 'Conférence' }
  if (value.includes('entreprise') || value.includes('corporate') || value.includes('séminaire')) return { type: 'corporate', label: 'Entreprise' }
  if (value.includes('anniversaire') || value.includes('birthday')) return { type: 'birthday', label: 'Anniversaire' }
  return { type: 'custom', label: 'Projet' }
}

function classify(input) {
  const name = String(input.name || 'untitled')
  const format = String(input.format || name.split('.').pop() || 'FILE').toUpperCase()
  const lower = format.toLowerCase()
  let kind = input.kind || 'document'
  let nature = input.nature || 'Document'
  if (['jpg', 'jpeg', 'png', 'webp', 'svg', 'gif', 'raw'].includes(lower)) { kind = 'image'; nature = 'Image' }
  if (['mp4', 'mov', 'webm', 'avi'].includes(lower)) { kind = 'video'; nature = 'Vidéo' }
  if (['mp3', 'wav', 'aiff', 'm4a', 'flac'].includes(lower)) { kind = 'audio'; nature = 'Audio' }
  if (['csv', 'xls', 'xlsx', 'json', 'xml', 'yaml'].includes(lower)) { kind = 'data'; nature = 'Données' }
  if (['html', 'css', 'js', 'jsx', 'tsx'].includes(lower)) { kind = lower === 'html' ? 'web' : 'code'; nature = lower === 'html' ? 'Page web' : 'Code' }
  if (['zip', 'rar', '7z'].includes(lower)) { kind = 'archive'; nature = 'Archive' }
  if (name.toLowerCase().includes('devis')) nature = 'Devis'
  if (name.toLowerCase().includes('contrat')) nature = 'Contrat'
  if (name.toLowerCase().includes('facture')) nature = 'Facture'
  return { id: input.id || randomUUID(), name, format, kind, nature, context: input.context || 'À comprendre', confidence: 0.88, createdAt: new Date().toISOString() }
}

function buildAnalysis(payload) {
  const hint = String(payload.prompt || '')
  const context = inferContext(hint)
  const incoming = Array.isArray(payload.files) ? payload.files.map(classify) : []
  incoming.forEach((object) => objects.set(object.id, object))
  const allObjects = incoming.length ? incoming : [...objects.values()]
  const web = allObjects.some((object) => object.kind === 'web' || object.kind === 'code')
  const magic = {
    id: randomUUID(),
    title: web ? 'Projet Web détecté' : `${context.label} — proposition`,
    subtitle: `${allObjects.length} objets · relations à confirmer`,
    type: web ? 'web' : context.type,
    confidence: web ? 0.91 : 0.94,
    objectIds: allObjects.map((object) => object.id),
    hypothesis: web ? 'Ces fichiers semblent constituer un site Web.' : 'Ces objets semblent concerner le même contexte.',
  }
  magicFolders.set(magic.id, magic)
  return {
    id: randomUUID(),
    status: 'complete',
    summary: web ? 'Structure Web identifiée.' : 'Informations structurables détectées.',
    context,
    stages: ['import', 'understand', 'relate', 'propose'],
    objects: allObjects,
    magicFolders: [magic],
    suggestions: web ? ['Prévisualiser', 'Ouvrir dans Web Studio', 'Envoyer vers GitHub'] : ['Dashboard', 'Timeline', 'Budget', 'Magic Folder'],
  }
}

async function handle(req, res) {
  if (req.method === 'OPTIONS') return empty(res)
  const url = new URL(req.url, `http://${req.headers.host || 'localhost'}`)
  if (req.method === 'GET' && url.pathname === '/api/health') return json(res, 200, { ok: true, service: 'AI+ME Intelligence API', version: '0.1.0' })
  if (req.method === 'GET' && url.pathname === '/api/objects') return json(res, 200, { objects: [...objects.values()] })
  if (req.method === 'GET' && url.pathname === '/api/magic-folders') return json(res, 200, { magicFolders: [...magicFolders.values()] })
  if (req.method === 'POST' && url.pathname === '/api/analyze') {
    const result = buildAnalysis(await body(req))
    analyses.set(result.id, result)
    return json(res, 200, result)
  }
  if (req.method === 'GET' && url.pathname.startsWith('/api/analysis/')) {
    const result = analyses.get(url.pathname.split('/').pop())
    return result ? json(res, 200, result) : json(res, 404, { error: 'Analysis not found' })
  }
  if (req.method === 'POST' && url.pathname === '/api/magic-folders') {
    const payload = await body(req)
    const selected = Array.isArray(payload.objectIds) ? payload.objectIds.map((id) => objects.get(id)).filter(Boolean) : []
    const folder = { id: randomUUID(), title: payload.title || 'New Magic Folder', subtitle: `${selected.length} objects · manual context`, type: payload.type || 'custom', confidence: 1, objectIds: selected.map((object) => object.id), hypothesis: 'Folder created by you.' }
    magicFolders.set(folder.id, folder)
    return json(res, 201, folder)
  }
  if (req.method === 'POST' && url.pathname === '/api/transform') {
    const payload = await body(req)
    return json(res, 200, { id: randomUUID(), status: 'suggested', source: payload.source || 'objects', output: payload.output || 'project', message: 'Transformation proposal ready for review.' })
  }
  return json(res, 404, { error: 'Not found' })
}

const server = http.createServer((req, res) => {
  handle(req, res).catch((error) => json(res, 500, { error: error.message }))
})
server.listen(port, '0.0.0.0', () => console.log(`AI+ME Intelligence API listening on http://0.0.0.0:${port}`))
