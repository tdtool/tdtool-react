/**
 * @Author: Zhengfeng.Yao <yzf>
 * @Date:   2017-05-03 12:05:05
 * @Last modified by:   yzf
 * @Last modified time: 2017-05-03 12:05:07
 */

import path from 'path';
import is from './is';

const defaultPresets = [
  'react',
  'stage-2'
];
const defaultPlugins = [
  'transform-decorators-legacy',
  'transform-class-properties',
  'transform-runtime'
];

module.exports = (config, options) => {
  let babel;
  let include = [path.resolve(process.cwd(), 'src')];
  if (!options) {
    babel = {
      cacheDirectory: true,
      babelrc: false,
      presets: defaultPresets,
      plugins: defaultPlugins
    };
  } else {
    const { isDebug, presets, plugins, isNode, source, targets } = options;
    babel = {
      cacheDirectory: isDebug,
      babelrc: false,
      presets: defaultPresets.concat([
        [
          'env',
          {
            targets: targets || {
              node: 'current',
              browsers: ["last 2 versions", "safari >= 7", "ie >= 9"]
            },
            useBuiltIns: false,
            debug: false
          }
        ]
      ]).concat(presets).filter(o => !!o),
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
  });
  config.add('rule.est', {
    test: /\.est$/,
    use: ['babel-loader', 'template-string-loader']
  });
  // eslint
  if (!options) {
    return;
  }
  if (is.String(options.eslint)) {
    config.add('rule.eslint', {
      test: /\.jsx?$/,
      enforce: 'pre',
      loader: 'eslint-loader',
      options: {
        emitWarning: true,
        emitError: true,
        useEslintrc: false,
        include,
        formatter: require('eslint-friendly-formatter'),
        configFile: options.eslint
      }
    });
  } else if (options.eslint === true) {
    config.add('rule.eslint', {
      test: /\.jsx?$/,
      enforce: 'pre',
      loader: 'eslint-loader',
      options: {
        emitWarning: true,
        emitError: true,
        useEslintrc: false,
        include,
        formatter: require('eslint-friendly-formatter'),
        configFile: path.resolve(__dirname, 'eslint.config.js')
      }
    });
  } else if (is.Object(options.eslint)) {
    config.add('rule.eslint', {
      test: /\.jsx?$/,
      enforce: 'pre',
      loader: 'eslint-loader',
      options: Object.assign({
        emitWarning: true,
        emitError: true,
        useEslintrc: false,
        include,
        formatter: require('eslint-friendly-formatter'),
        configFile: path.resolve(__dirname, 'eslint.config.js')
      }, options.eslint)
    });
  }
}
