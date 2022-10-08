import { terser } from 'rollup-plugin-terser'
import typescript from 'rollup-plugin-typescript2'
import del from 'rollup-plugin-delete'
import pkg from './package.json'
import externals from 'rollup-plugin-node-externals'

export default [
  {
    input: 'src/index.ts',
    plugins: [
      del({ targets: 'dist/*' }),
      externals(),
      typescript({
        typescript: require('typescript'),
      }),
      terser(),
    ],
    output: [{ dir: 'dist', format: 'es', sourcemap: true }],
  },
]
