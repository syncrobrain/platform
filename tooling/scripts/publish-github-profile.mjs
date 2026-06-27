#!/usr/bin/env node
/**
 * Publish syncrobrain/.github org profile repo from assets/github/.
 *
 * Usage:
 *   node tooling/scripts/publish-github-profile.mjs
 *   node tooling/scripts/publish-github-profile.mjs --dry-run
 */
import { cpSync, existsSync, mkdirSync, rmSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { execSync } from 'node:child_process'
import { findMetaRoot } from './lib/paths.mjs'

const metaRoot = findMetaRoot()
if (!metaRoot) {
  console.error('❌ Run from SyncroBrain Meta-Repo root.')
  process.exit(1)
}

const dryRun = process.argv.includes('--dry-run')
const assetsDir = join(metaRoot, 'assets', 'github')
const workDir = join(metaRoot, '.tmp', 'syncrobrain-dot-github')
const org = 'syncrobrain'
const repo = `${org}/.github`
const remote = `git@github.com:${org}/.github.git`

execSync(`node "${join(assetsDir, 'render.mjs')}"`, { stdio: 'inherit', cwd: metaRoot })

if (existsSync(workDir)) {
  rmSync(workDir, { recursive: true, force: true })
}
mkdirSync(join(workDir, 'profile'), { recursive: true })

cpSync(join(assetsDir, 'profile', 'README.md'), join(workDir, 'profile', 'README.md'))
cpSync(join(assetsDir, 'profile', 'banner.png'), join(workDir, 'profile', 'banner.png'))
writeFileSync(
  join(workDir, 'README.md'),
  `# syncrobrain/.github

Organization profile for [github.com/syncrobrain](https://github.com/syncrobrain).

Edit sources in [\`syncrobrain/platform\`](https://github.com/syncrobrain/platform) → \`assets/github/\`.
`,
)

if (dryRun) {
  console.log(`\n✓ Dry run — prepared ${workDir}`)
  process.exit(0)
}

const hasRepo = (() => {
  try {
    execSync(`gh repo view ${repo}`, { stdio: 'pipe' })
    return true
  } catch {
    return false
  }
})()

if (!hasRepo) {
  console.log(`→ Creating ${repo} …`)
  execSync(`gh repo create ${repo} --public --description "SyncroBrain GitHub organization profile"`, {
    stdio: 'inherit',
  })
}

if (!existsSync(join(workDir, '.git'))) {
  execSync('git init -b main', { cwd: workDir, stdio: 'inherit' })
  execSync(`git remote add origin ${remote}`, { cwd: workDir, stdio: 'inherit' })
}

execSync('git add -A', { cwd: workDir, stdio: 'inherit' })
try {
  execSync('git diff --cached --quiet', { cwd: workDir, stdio: 'pipe' })
  console.log('✓ No changes to publish')
} catch {
  execSync('git commit -m "chore: update org profile README and banner"', {
    cwd: workDir,
    stdio: 'inherit',
  })
  execSync('git push -u origin main', { cwd: workDir, stdio: 'inherit' })
  console.log(`\n✓ Published https://github.com/${org}`)
}

const description =
  'Open-source AI-native IoT PaaS · 万物智脑 — B2B verticals, private deploy & white-label. syncrobrain.com'

try {
  execSync(
    `gh api orgs/${org} -X PATCH -f description="${description}" -f blog="https://syncrobrain.com"`,
    { stdio: 'inherit' },
  )
  console.log('✓ Updated organization description')
} catch (err) {
  console.warn('⚠️  Could not update org description — set manually in GitHub Settings')
}

console.log('\nManual step: upload assets/github/org-avatar.png as organization profile picture.')
