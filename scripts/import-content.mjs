// One-off import of Sarah's content into Sanity.
//
//   node --env-file=.env.local scripts/import-content.mjs            dry run, no network
//   node --env-file=.env.local scripts/import-content.mjs --write    needs SANITY_API_WRITE_TOKEN
//   add --force to overwrite documents that already exist

import {writeFileSync} from 'node:fs'
import {homedir} from 'node:os'
import {join} from 'node:path'

import {buildDocuments} from './sarah-content.mjs'

const DRY_RUN_OUTPUT = '/tmp/sarah-import.json'
const PHOTO_PATH = join(homedir(), 'sarah-content', 'profile pic.jpeg')

const args = new Set(process.argv.slice(2))
const write = args.has('--write')
const force = args.has('--force')

function collectUrls(value, found = []) {
  if (Array.isArray(value)) {
    value.forEach((item) => collectUrls(item, found))
  } else if (value && typeof value === 'object') {
    for (const [key, child] of Object.entries(value)) {
      if (['url', 'href', 'websiteUrl'].includes(key) && typeof child === 'string') found.push(child)
      else collectUrls(child, found)
    }
  }
  return found
}

function printSummary(documents) {
  for (const doc of documents) {
    const counts = Object.entries(doc)
      .filter(([, value]) => Array.isArray(value))
      .map(([field, value]) => `${field}=${value.length}`)
    console.log(`${doc._id}: ${counts.join(', ') || 'no arrays'}`)
  }
  console.log('\nURLs:')
  for (const url of collectUrls(documents)) console.log(`  ${url}`)
}

function fail(message) {
  console.error(message)
  process.exit(1)
}

async function buildPhoto(client) {
  const {default: sharp} = await import('sharp')
  const buffer = await sharp(PHOTO_PATH)
    .rotate()
    .resize({width: 2000, withoutEnlargement: true})
    .jpeg({quality: 85})
    .toBuffer()
  const asset = await client.assets.upload('image', buffer, {
    filename: 'sarah-rowles.jpg',
    contentType: 'image/jpeg',
  })
  return {
    _type: 'image',
    asset: {_type: 'reference', _ref: asset._id},
    hotspot: {_type: 'sanity.imageHotspot', x: 0.75, y: 0.5, width: 0.4, height: 0.6},
    alt: 'Sarah Rowles, wearing a grey cap and plum jacket, beside a lake',
  }
}

async function main() {
  const documents = buildDocuments()
  printSummary(documents)

  if (!write) {
    writeFileSync(DRY_RUN_OUTPUT, JSON.stringify(documents, null, 2) + '\n')
    console.log(`\nDry run. Full JSON written to ${DRY_RUN_OUTPUT}`)
    console.log('Nothing was sent to Sanity. Pass --write to import.')
    return
  }

  const token = process.env.SANITY_API_WRITE_TOKEN
  if (!token) fail('SANITY_API_WRITE_TOKEN is not set. Add it to .env.local (never commit it) and re-run.')

  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET
  const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION
  if (!projectId || !dataset || !apiVersion) {
    fail('NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET and NEXT_PUBLIC_SANITY_API_VERSION must all be set.')
  }

  const {createClient} = await import('@sanity/client')
  const client = createClient({projectId, dataset, apiVersion, token, useCdn: false})

  const ids = documents.flatMap((doc) => [doc._id, `drafts.${doc._id}`])
  const existing = await client.fetch('*[_id in $ids]._id', {ids})
  if (existing.length > 0 && !force) {
    fail(`Refusing to overwrite existing documents: ${existing.join(', ')}\nRe-run with --force to replace them.`)
  }
  if (existing.length > 0) console.log(`\n--force: replacing ${existing.join(', ')}`)

  console.log(`\nWriting to ${projectId}/${dataset}`)
  const photo = await buildPhoto(client)
  console.log(`Uploaded photo asset ${photo.asset._ref}`)

  const about = documents.find((doc) => doc._id === 'aboutPage')
  about.photo = photo

  const transaction = client.transaction()
  for (const doc of documents) transaction.createOrReplace(doc)
  const result = await transaction.commit()

  console.log('\nCommitted transaction', result.transactionId)
  for (const id of result.documentIds) console.log(`  ${id}`)
}

main().catch((error) => fail(error instanceof Error ? error.message : String(error)))
