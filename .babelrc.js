module.exports = (api) => {
  api.cache.never();

  const envOptions = {
    modules: false,
    loose: true,
  };

  if (process.env.NODE_ENV === 'test') {
    envOptions.modules = 'commonjs'
    envOptions.targets = { node: 'current' }
  }

  return {
    presets: [
      ['@babel/env', envOptions],
      '@babel/react',
    ],
    plugins: [
      '@babel/transform-react-constant-elements',
      ['transform-react-remove-prop-types', { mode: 'wrap' }],
    ],
  };
}
