const {
  override,
  addWebpackAlias,
  addLessLoader,
  addPostcssPlugins,
  fixBabelImports
} = require('customize-cra')
const px2rem = require('postcss-px2rem')
const path = require('path')

module.exports = override(
  addWebpackAlias({
    '@': path.resolve(__dirname, 'src/'),
    '@assets': path.resolve(__dirname, 'src/assets'),
    '@components': path.resolve(__dirname, 'src/components'),
    '@services': path.resolve(__dirname, 'src/services'),
    '@libs': path.resolve(__dirname, 'src/libs'),
    '@models': path.resolve(__dirname, 'src/models')
  }),
  addLessLoader(),
  addPostcssPlugins([
    px2rem({
      remUnit: 75
    })
  ])
  // , fixBabelImports('import', {
  //   libraryName: 'antd-mobile',
  //   libraryDirectory: 'es/components',
  //   style: false
  // })
)
