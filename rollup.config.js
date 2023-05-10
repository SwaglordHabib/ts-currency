// rollup config file for building the library with typescript
import typescript from 'rollup-plugin-typescript';
import pkg from './package.json';
import { terser } from 'rollup-plugin-terser';
import json from '@rollup/plugin-json';

export default {
    input: 'src/index.ts',
    output: [
        {
            file: pkg.main,
            format: 'umd',
            name: 'ts-currency',
            sourcemap: true,
            plugins: [terser()]
        },
        {
            file: pkg.module,
            format: 'es',
            sourcemap: true,
            plugins: [terser()]
        }
    ],
    plugins: [
        typescript({
            typescript: require('typescript'),
        }),
        json(),
    ],
};