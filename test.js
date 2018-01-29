/* eslint-env mocha */

const assert = require('assert')
const fs = require('fs')
const path = require('path')

const lodepng = require('lodepng')
const pixelmatch = require('pixelmatch')

const wextIcons = require('./')

const source = fs.readFileSync('fixtures/test.svg')

describe('@wext/icons', () => {
  for (const type of ['action', 'extension']) {
    for (const browser of ['chrome', 'edge', 'firefox', 'opera', 'safari']) {
      it(`generates ${type} icons for ${browser}`, async () => {
        const result = wextIcons[type](source, browser, { shape: 'circle', primaryColor: '#00A' })

        for (let idx = 0; idx < result.files.length; idx++) {
          const ext = path.extname(result.files[idx].name)
          const expected = fs.readFileSync(`fixtures/test-${type}-${browser}-${idx}${ext}`)

          if (ext === '.svg') {
            assert.strictEqual(String(result.files[idx].data), String(expected))
          } else if (ext === '.png') {
            const actualImage = await lodepng.decode(result.files[idx].data)
            const expectedImage = await lodepng.decode(expected)

            assert.strictEqual(pixelmatch(actualImage.data, expectedImage.data, null, expectedImage.width, expectedImage.height), 0)
          }
        }
      })
    }
  }
})
