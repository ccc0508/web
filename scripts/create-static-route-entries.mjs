import { copyFileSync, mkdirSync, readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const projectRoot = join(dirname(fileURLToPath(import.meta.url)), '..')
const routerSource = readFileSync(join(projectRoot, 'src/router/index.ts'), 'utf8')
const distDirectory = join(projectRoot, 'dist')
const indexFile = join(distDirectory, 'index.html')

const routes = [...routerSource.matchAll(/path:\s*['"](\/[^'"]*)['"]/g)]
  .map((match) => match[1])
  .filter((route) => route !== '/' && !route.includes(':') && !route.includes('*'))

for (const route of new Set(routes)) {
  const routeDirectory = join(distDirectory, route.slice(1))
  mkdirSync(routeDirectory, { recursive: true })
  copyFileSync(indexFile, join(routeDirectory, 'index.html'))
}

console.log(`Created static entries for ${new Set(routes).size} routes.`)
