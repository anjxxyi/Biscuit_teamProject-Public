import { cp, mkdir, rm } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'

const distPath = fileURLToPath(new URL('../dist/', import.meta.url))
const docsPath = fileURLToPath(new URL('../../docs/', import.meta.url))

await rm(docsPath, { force: true, recursive: true })
await mkdir(docsPath, { recursive: true })
await cp(distPath, docsPath, { recursive: true })
