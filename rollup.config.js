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
    output: [
      {
        name: pkg.name,
        file: `dist/react-introspection.umd.js`,
        format: 'umd',
        globals: {
          react: 'React',
          '@emotion/react': '@emotion/react',
          '@mui/icons-material': '@mui/icons-material',
          '@mui/material': '@mui/material',
        },
        sourcemap: true,
      },
      { file: `dist/react-introspection.esm.js`, format: 'es', sourcemap: true },
    ],
  },
]
