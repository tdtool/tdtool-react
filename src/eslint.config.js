/**
 * @Author: Zhengfeng.Yao <yzf>
 * @Date:   2017-05-23 14:42:57
 * @Last modified by:   yzf
 * @Last modified time: 2017-05-23 15:38:09
 */

module.exports = {
  parser: 'babel-eslint',
  extends: 'standard',
  plugins: ['react'],
  parserOptions: {
    ecmaVersion: 6,
    ecmaFeatures: {
      jsx: true,
      experimentalObjectRestSpread: true
    }
  },
  rules: {
    'func-names': 0,
    "react/jsx-uses-react": "error",
    "react/jsx-uses-vars": "error",
    'react/sort-comp': 0,
    'react/prop-types': 0,
    'react/jsx-first-prop-new-line': 0,
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx', '.md']}],
    'array-bracket-spacing': [2, 'never'],
    'comma-dangle': [2, 'never'],
    'comma-spacing': [2, { before: false, after: true}],
    'computed-property-spacing': [2, 'never'],
    'constructor-super': 0,
    'default-case': 2,
    'eol-last': 2,
    'arrow-parens': 0,
    'generator-star-spacing': 0,
    'semi': 0,
    'space-before-function-paren': 0
  },
  env: {            // 定义预定义的全局变量,比如browser: true，这样你在代码中可以放心使用宿主环境给你提供的全局变量。
    browser: true, // browser global variables.
    node: true, // Node.js global variables and Node.js scoping.
    worker: true, // web workers global variables.
    mocha: true, // adds all of the Mocha testing global variables.
    phantomjs: true, // PhantomJS global variables.
    serviceworker: true // Service Worker global variables.
  }
};
