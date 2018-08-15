/**
 * @Author: Zhengfeng.Yao <yzf>
 * @Date:   2017-05-03 12:05:05
 * @Last modified by:   yzf
 * @Last modified time: 2017-05-03 12:05:07
 */

import path from 'path';
import is from './is';

function getEnvPreset(targets) {
  return [
    'env',
    {
      targets: targets || {
        node: 'current',
        browsers: ["last 2 versions", "safari >= 7", "ie >= 9", 'chrome >= 52']
      },
      useBuiltIns: true,
      debug: false
    }
  ]
}

const defaultPresets = [
  'react',
  'stage-0'
];
const defaultPlugins = [
  'transform-decorators-legacy',
  'transform-class-properties',
  // 'transform-runtime'
];



exports.load = (config, options) => {
  let babel;
  let include = [path.resolve(process.cwd(), 'src')];
  if (!options) {
    babel = {
      cacheDirectory: true,
      babelrc: false,
      presets: defaultPresets.concat([getEnvPreset()]),
      plugins: defaultPlugins
    };
  } else {
    const { isDebug, presets, plugins, isNode, source, targets } = options;
    babel = {
      cacheDirectory: isDebug,
      babelrc: false,
      presets: defaultPresets.concat([
        getEnvPreset(targets)
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

exports.cliStartCallback = function(config, nodeDevServer) {
  if (nodeDevServer) {
    if (is.Array(config.entry)) {
      config.entry.unshift('react-hot-loader/patch')
    } else if (is.Object(config.entry)) {
      Object.keys(config.entry).forEach(key => {
        if (is.Array(config.entry[key])) {
          config.entry[key].unshift('react-hot-loader/patch')
        } else {
          config.entry[key] = ['react-hot-loader/patch', config.entry[key]]
        }
      })
    } else {
      config.entry = ['react-hot-loader/patch', config.entry]
    }

    const babelLoader = config.module.rules.find(x => x.loader === 'babel-loader')
    if (babelLoader && babelLoader.query) {
      babelLoader.query.plugins = ['react-hot-loader/babel'].concat(babelLoader.query.plugins || [])
    }
  } else {
    const rule = config.module.rules.find(x => x.loader === 'babel-loader')
    if (rule && rule.query) {
      rule.query.presets = ['react-hmre'].concat(rule.query.presets || []);
      // rule.query.plugins = [ [
      //   require.resolve('babel-plugin-react-transform'), {
      //     transforms: [
      //       {
      //         transform: 'react-transform-hmr',
      //         imports: ['react'],
      //         locals: ['module'],
      //       }, {
      //         transform: 'react-transform-catch-errors',
      //         imports: ['react', 'redbox-react'],
      //       },
      //     ],
      //   }
      // ]].concat(rule.query.plugins || [])
    }
  }
}
