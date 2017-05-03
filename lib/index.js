'use strict';

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var defaultPresets = ['stage-2', 'react', 'es2015-ie']; /**
                                                         * @Author: Zhengfeng.Yao <yzf>
                                                         * @Date:   2017-05-03 12:05:05
                                                         * @Last modified by:   yzf
                                                         * @Last modified time: 2017-05-03 12:05:07
                                                         */

var defaultPlugins = ['transform-decorators-legacy', 'transform-class-properties', 'transform-runtime'];

module.exports = function (config, options) {
  var babel = void 0;
  if (!options) {
    babel = {
      cacheDirectory: true,
      babelrc: false,
      presets: defaultPresets,
      plugins: defaultPlugins
    };
  } else {
    var isDebug = options.isDebug,
        presets = options.presets,
        plugins = options.plugins,
        isNode = options.isNode;

    babel = {
      cacheDirectory: isDebug,
      babelrc: false,
      presets: defaultPresets.concat(isNode ? [['env', {
        targets: {
          node: 'current'
        },
        modules: false,
        useBuiltIns: false,
        debug: false
      }]] : []).concat(presets),
      plugins: defaultPlugins.concat(isNode || isDebug ? ['transform-react-jsx-source', 'transform-react-jsx-self'] : []).concat(plugins)
    };
  }
  config.add('rule.jsx', {
    test: /\.jsx?$/,
    loader: 'babel-loader',
    include: [_path2.default.resolve(process.cwd(), 'src')],
    query: babel
  });
  config.add('rule.est', {
    test: /\.est$/,
    use: ['babel-loader', 'template-string-loader']
  });
};
//# sourceMappingURL=index.js.map