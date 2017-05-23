/**
 * @Author: Zhengfeng.Yao <yzf>
 * @Date:   2017-05-23 14:42:57
 * @Last modified by:   yzf
 * @Last modified time: 2017-05-23 15:38:09
 */

module.exports = {
  parser: 'babel-eslint',
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
    'eol-last': 2
  }
};
