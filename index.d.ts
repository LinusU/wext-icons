type Browser = 'chrome' | 'edge' | 'firefox' | 'opera' | 'safari'

interface Options {
  shape?: 'circle' | 'square'
  primaryColor?: string
}

interface Result {
  spec: { [size: string]: string }
  files: { name: string, data: Buffer }[]
}

declare function action (source: Buffer | string, browser: Browser): Result
declare function extension (source: Buffer | string, browser: Browser, options?: Options): Result

export { action, extension }
