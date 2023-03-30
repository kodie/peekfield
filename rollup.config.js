import { babel } from '@rollup/plugin-babel'

const config = {
  input: 'src/peekfield.js',
  output: {
    dir: 'dist',
    format: 'umd',
    name: 'peekfield',
    sourcemap: true
  },
  plugins: [
    babel({ babelHelpers: 'bundled' })
  ]
}

export default config
