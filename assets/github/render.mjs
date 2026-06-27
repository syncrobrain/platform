#!/usr/bin/env node
/**
 * Render GitHub org profile assets (banner PNG + avatar).
 * Usage: node assets/github/render.mjs
 */
import { readFileSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { createRequire } from 'node:module'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = join(__dirname, '..', '..')
const require = createRequire(join(root, 'website', 'package.json'))
const sharp = require('sharp')
const { Resvg } = require('@resvg/resvg-js')

function renderSvg(svgPath, width) {
  const svg = readFileSync(svgPath, 'utf8')
  const resvg = new Resvg(svg, { fitTo: { mode: 'width', value: width } })
  return resvg.render().asPng()
}

const bannerPng = renderSvg(join(__dirname, 'banner.svg'), 1280)
writeFileSync(join(__dirname, 'profile', 'banner.png'), bannerPng)
console.log('Wrote profile/banner.png (1280x640)')

const socialPng = await sharp(bannerPng)
  .resize(1200, 630, { fit: 'cover', position: 'centre' })
  .png()
  .toBuffer()
writeFileSync(join(__dirname, 'social-preview.png'), socialPng)
console.log('Wrote social-preview.png (1200x630)')

const avatarPng = await sharp(join(root, 'assets', 'logo.png'))
  .resize(400, 400, { fit: 'contain', background: { r: 10, g: 15, b: 30, alpha: 1 } })
  .png()
  .toBuffer()
writeFileSync(join(__dirname, 'org-avatar.png'), avatarPng)
console.log('Wrote org-avatar.png (400x400)')
