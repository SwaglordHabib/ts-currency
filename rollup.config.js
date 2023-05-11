import typescript from '@rollup/plugin-typescript';
import json from '@rollup/plugin-json';

export default {
  input: 'src/index.ts',
  output: {
    dir: 'build',
    format: 'es'
  },
  plugins: [typescript(), json()]
};