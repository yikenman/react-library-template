import typescript from 'rollup-plugin-typescript2';
import commonjs from 'rollup-plugin-commonjs';
import external from 'rollup-plugin-peer-deps-external';
import postcss from 'rollup-plugin-postcss';
import resolve from 'rollup-plugin-node-resolve';
import url from 'rollup-plugin-url';
import svgr from '@svgr/rollup';
import pkg from './package.json';
import fs from 'fs';
import path from 'path';

const plugins = [
  external(),
  url(),
  svgr(),
  resolve(),
  typescript({
    tsconfig: './tsconfig.json',
    tsconfigOverride: {
      compilerOptions: {
        isolatedModules: false,
        declaration: false
      }
    },
    rollupCommonJSResolveHack: true,
    clean: true
  }),
  commonjs()
];
const plugins2 = [
  external(),
  postcss({
    modules: true,
    extract: true
  }),
  url(),
  svgr(),
  resolve(),
  typescript({
    tsconfig: './tsconfig.json',
    tsconfigOverride: {
      compilerOptions: {
        isolatedModules: false,
        declaration: true
      }
    },
    rollupCommonJSResolveHack: true,
    clean: true
  }),
  commonjs()
];

const componentDir = 'src/components';
const componentNames = fs.readdirSync(path.resolve(componentDir));
const outDirES = pkg.module
  .split('/')
  .slice(0, -1)
  .join('/');

const rollupConfigs = componentNames.reduce((arr, name) => {
  if (name !== 'index.ts') {
    arr.push({
      input: `${componentDir}/${name}/index.tsx`,
      output: [
        {
          dir: `${outDirES}/${name}`,
          entryFileNames: '[name].es.js',
          exports: 'named',
          sourcemap: true,
          format: 'es'
        }
      ],
      plugins: [
        postcss({
          modules: true,
          extract: `${outDirES}/${name}/styles/index.css`
        }),
        ...plugins
      ]
    });
  } else {
    console.log('is index.ts');
    arr.push({
      input: `${componentDir}/index.ts`,
      output: [
        {
          file: pkg.module,
          format: 'es',
          entryFileNames: '[name].es.js',
          exports: 'named',
          sourcemap: true
        }
      ],
      plugins: plugins2
    });
    arr.push({
      input: `${componentDir}/index.ts`,
      output: [
        {
          file: pkg.main,
          format: 'cjs',
          entryFileNames: '[name].js',
          exports: 'named',
          sourcemap: true
        }
      ],
      plugins: plugins2
    });
  }
  return arr;
}, []);
console.dir(rollupConfigs);
export default rollupConfigs;
