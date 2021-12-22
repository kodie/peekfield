import { babel } from '@rollup/plugin-babel'

const config = {
  input: 'src/vanishing-fields.js',
  output: {
    dir: 'dist',
    format: 'umd',
    name: 'vanishingFields',
    sourcemap: true
  },
  plugins: [
    babel({ babelHelpers: 'bundled' })
  ]
}

export default config
