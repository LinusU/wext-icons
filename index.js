const { Rsvg } = require('librsvg-prebuilt')

const reSvg = /<svg[^>]+>/
const reWidth = /width="[^"]*"/
const reHeight = /height="[^"]*"/

const actionColors = new Map([
  ['chrome', '#5A5A5A'],
  ['edge', '#000000'],
  ['firefox', '#4A4A4B'],
  ['opera', '#444748'],
  ['safari', 'black']
])

function setSvgSize (source, size) {
  const svgTagMatch = source.match(reSvg)
  if (!svgTagMatch) throw new Error('Could not find svg tag in source')

  const hasWidth = Boolean(svgTagMatch[0].match(reWidth))
  const hasHeight = Boolean(svgTagMatch[0].match(reHeight))

  return source
    .replace(hasHeight ? reHeight : '<svg', `${hasHeight ? '' : '<svg '}height="${size}"`)
    .replace(hasWidth ? reWidth : '<svg', `${hasWidth ? '' : '<svg '}width="${size}"`)
}

function setPrimaryColor (source, color) {
  return String(source).replace(/\$PRIMARY_COLOR/g, color)
}

exports.action = function (source, browser) {
  const spec = {}
  const files = []
  const coloredSource = setPrimaryColor(source, actionColors.get(browser))

  if (browser === 'firefox') {
    spec['32'] = 'action.svg'
    files.push({ name: 'action.svg', data: coloredSource })
  } else {
    const svg = new Rsvg(coloredSource)

    if (browser === 'edge') {
      spec['20'] = 'action-20.png'
      spec['25'] = 'action-25.png'
      spec['30'] = 'action-30.png'
      spec['40'] = 'action-40.png'
      files.push({ name: 'action-20.png', data: svg.render({ format: 'png', width: 20, height: 20 }).data })
      files.push({ name: 'action-25.png', data: svg.render({ format: 'png', width: 25, height: 25 }).data })
      files.push({ name: 'action-30.png', data: svg.render({ format: 'png', width: 30, height: 30 }).data })
      files.push({ name: 'action-40.png', data: svg.render({ format: 'png', width: 40, height: 40 }).data })
    } else {
      spec['16'] = 'action-16.png'
      spec['32'] = 'action-32.png'
      files.push({ name: 'action-16.png', data: svg.render({ format: 'png', width: 16, height: 16 }).data })
      files.push({ name: 'action-32.png', data: svg.render({ format: 'png', width: 32, height: 32 }).data })
    }
  }

  return { spec, files }
}

exports.extension = function (source, browser, options = {}) {
  const spec = {}
  const files = []

  const coloredSource = setPrimaryColor(source, (options && options.primaryColor) || 'black')

  if (browser === 'firefox') {
    spec['32'] = 'icon.svg'
    files.push({ name: 'icon.svg', data: coloredSource })
  } else if (browser === 'chrome') {
    const paddedSource = [
      '<?xml version="1.0" encoding="UTF-8"?>',
      '<svg viewBox="0 0 128 128" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">',
      `<g transform="translate(${options.shape === 'circle' ? '8 8' : '16 16'})">`,
      setSvgSize(coloredSource.replace(/<\?xml[^>]+\?>/, ''), options.shape === 'circle' ? 112 : 96).trim(),
      '</g>',
      '</svg>'
    ]

    const svg = new Rsvg(paddedSource.join('\n'))

    spec['48'] = 'icon-48.png'
    spec['96'] = 'icon-96.png'
    spec['128'] = 'icon-128.png'
    spec['256'] = 'icon-256.png'
    files.push({ name: 'icon-48.png', data: svg.render({ format: 'png', width: 48, height: 48 }).data })
    files.push({ name: 'icon-96.png', data: svg.render({ format: 'png', width: 96, height: 96 }).data })
    files.push({ name: 'icon-128.png', data: svg.render({ format: 'png', width: 128, height: 128 }).data })
    files.push({ name: 'icon-256.png', data: svg.render({ format: 'png', width: 256, height: 256 }).data })
  } else {
    const svg = new Rsvg(coloredSource)

    if (browser === 'safari') {
      spec['32'] = 'Icon-32.png'
      spec['48'] = 'Icon-48.png'
      spec['64'] = 'Icon-64.png'
      spec['96'] = 'Icon-96.png'
      spec['128'] = 'Icon-128.png'
      files.push({ name: 'Icon-32.png', data: svg.render({ format: 'png', width: 32, height: 32 }).data })
      files.push({ name: 'Icon-48.png', data: svg.render({ format: 'png', width: 48, height: 48 }).data })
      files.push({ name: 'Icon-64.png', data: svg.render({ format: 'png', width: 64, height: 64 }).data })
      files.push({ name: 'Icon-96.png', data: svg.render({ format: 'png', width: 96, height: 96 }).data })
      files.push({ name: 'Icon-128.png', data: svg.render({ format: 'png', width: 128, height: 128 }).data })
    } else if (browser === 'edge') {
      spec['44'] = 'icon-44.png'
      spec['48'] = 'icon-48.png'
      spec['50'] = 'icon-50.png'
      spec['128'] = 'icon-128.png'
      spec['150'] = 'icon-150.png'
      spec['176'] = 'icon-176.png'
      files.push({ name: 'icon-44.png', data: svg.render({ format: 'png', width: 44, height: 44 }).data })
      files.push({ name: 'icon-48.png', data: svg.render({ format: 'png', width: 48, height: 48 }).data })
      files.push({ name: 'icon-50.png', data: svg.render({ format: 'png', width: 50, height: 50 }).data })
      files.push({ name: 'icon-128.png', data: svg.render({ format: 'png', width: 128, height: 128 }).data })
      files.push({ name: 'icon-150.png', data: svg.render({ format: 'png', width: 150, height: 150 }).data })
      files.push({ name: 'icon-176.png', data: svg.render({ format: 'png', width: 176, height: 176 }).data })
    } else {
      spec['48'] = 'icon-48.png'
      spec['96'] = 'icon-96.png'
      spec['128'] = 'icon-128.png'
      spec['256'] = 'icon-256.png'
      files.push({ name: 'icon-48.png', data: svg.render({ format: 'png', width: 48, height: 48 }).data })
      files.push({ name: 'icon-96.png', data: svg.render({ format: 'png', width: 96, height: 96 }).data })
      files.push({ name: 'icon-128.png', data: svg.render({ format: 'png', width: 128, height: 128 }).data })
      files.push({ name: 'icon-256.png', data: svg.render({ format: 'png', width: 256, height: 256 }).data })
    }
  }

  return { spec, files }
}
