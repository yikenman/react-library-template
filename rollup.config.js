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

const componentDir = 'src/components';
const componentNames = fs.readdirSync(path.resolve(componentDir));

const componentConfigs = componentNames.reduce((acc, name) => {
  const inputPath = `${componentDir}/${name}/index.tsx`;
  acc.push({
    input: inputPath,
    output: [
      {
        dir: `dist/es/components/${name}`,
        entryFileNames: '[name].es.js',
        exports: 'named',
        sourcemap: true,
        format: 'es'
      }
    ],
    plugins: [
      postcss({
        modules: true,
        extract: `dist/es/components/${name}/styles/index.css`
      }),
      ...plugins
    ]
  });
  return acc;
}, []);

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

const configs = [
  {
    input: 'src/index.ts',
    output: [
      {
        file: pkg.module,
        format: 'es',
        entryFileNames: '[name].es.js', // 输出文件名
        exports: 'named',
        sourcemap: true
      }
    ],
    plugins: plugins2
  },
  {
    input: 'src/index.ts',
    output: [
      {
        file: pkg.main,
        format: 'cjs',
        entryFileNames: '[name].js', // 输出文件名
        exports: 'named',
        sourcemap: true
      }
    ],
    plugins: plugins2
  }
];

export default configs.concat(componentConfigs);
