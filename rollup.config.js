import copy from 'rollup-plugin-copy';
import { terser } from 'rollup-plugin-terser';
import typescript from 'rollup-plugin-typescript2';
import del from 'rollup-plugin-delete';
import generatePackageJson from 'rollup-plugin-generate-package-json';
import pkg from './package.json';

export default [
  {
    input: 'src/index.ts',
    external: ['@emotion/react', '@mui/icons-material', '@mui/material'],
    plugins: [
      del({ targets: 'dist/*' }),
      typescript({
        typescript: require('typescript'),
      }),
      copy({
        targets: [
          { src: 'README.md', dest: 'dist' },
          { src: 'CHANGELOG.md', dest: 'dist' },
        ],
      }),
      generatePackageJson({
        baseContents: (pkg) => ({
          ...pkg,
          name: pkg.name,
          main: `${pkg.name}.umd.js`,
          module: `${pkg.name}.esm.js`,
          typings: `index.d.ts`,
          scripts: undefined,
          dependencies: {},
          devDependencies: {},
          peerDependencies: {},
          config: undefined,
        }),
      }),
      terser(),
    ],
    output: [
      {
        name: pkg.name,
        file: `dist/${pkg.name}.umd.js`,
        format: 'umd',
        globals: {
          '@emotion/react': '@emotion/react',
          '@mui/icons-material': '@mui/icons-material',
          '@mui/material': '@mui/material'
        },
        sourcemap: true,
      },
      { file: `dist/${pkg.name}.esm.js`, format: 'es', sourcemap: true },
    ],
  },
];
