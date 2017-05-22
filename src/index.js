/**
 * @Author: Zhengfeng.Yao <yzf>
 * @Date:   2017-05-03 12:05:05
 * @Last modified by:   yzf
 * @Last modified time: 2017-05-03 12:05:07
 */

import path from 'path'

const defaultPresets = [
  'es2015-ie',
  'react',
  'stage-2',
]
const defaultPlugins = [
  'transform-decorators-legacy',
  'transform-class-properties',
  'transform-runtime',
  'lodash'
]

module.exports = (config, options) => {
  let babel;
  let include = [path.resolve(process.cwd(), 'src')];
  if (!options) {
    babel = {
      cacheDirectory: true,
      babelrc: false,
      presets: defaultPresets,
      plugins: defaultPlugins
    }
  } else {
    const { isDebug, presets, plugins, isNode, source } = options
    babel = {
      cacheDirectory: isDebug,
      babelrc: false,
      presets: defaultPresets.concat(isNode ? [
        [
          'env',
          {
            targets: {
              node: 'current'
            },
            modules: false,
            useBuiltIns: false,
            debug: false
          }
        ]
      ]: []).concat(presets).filter(o => !!o),
      plugins: defaultPlugins.concat((isNode || isDebug) ? [
        'transform-react-jsx-source',
        'transform-react-jsx-self'
      ] : []).concat(plugins).filter(o => !!o)
    };
    include = include.concat(source).filter(o => !!o);
  }
  config.add('rule.jsx', {
    test: /\.jsx?$/,
    loader: 'babel-loader',
    include,
    query: babel
  })
  config.add('rule.est', {
    test: /\.est$/,
    use: ['babel-loader', 'template-string-loader']
  })
}
