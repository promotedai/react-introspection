import { terser } from 'rollup-plugin-terser'
import typescript from 'rollup-plugin-typescript2'
import del from 'rollup-plugin-delete'
import externals from 'rollup-plugin-node-externals'
import image from '@rollup/plugin-image'

export default [
  {
    input: 'src/index.ts',
    plugins: [
      del({ targets: 'dist/*' }),
      image(),
      externals(),
      typescript({
        typescript: require('typescript'),
      }),
      terser(),
    ],
    output: [{ dir: 'dist', format: 'es', sourcemap: true }],
  },
]
