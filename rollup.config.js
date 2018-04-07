import babel from 'rollup-plugin-babel';
import nodeResolve from 'rollup-plugin-node-resolve';

const pkg = require('./package.json');

const external = Object.keys(pkg.dependencies)
  .concat(Object.keys(pkg.peerDependencies));

process.env.BABEL_ENV = 'rollup';

export default {
  input: 'src/index.js',
  output: [{
    file: pkg.main,
    exports: 'named',
    format: 'cjs',
    sourcemap: true,
  }, {
    file: pkg.module,
    format: 'es',
    sourcemap: true,
  }],
  external: id => external.some(m => id.split('/')[0] === m),
  plugins: [
    babel(),
    nodeResolve(),
  ],
};
