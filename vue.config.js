module.exports = {
  runtimeCompiler: true,
  lintOnSave: true,
  baseUrl: process.env.NODE_ENV === 'production'
    ? '/cli3-demo/'
    : '',
  devServer: {
    https: true
  }
}
