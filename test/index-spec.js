/**
 * @Author: Zhengfeng.Yao <yzf>
 * @Date:   2017-05-03 12:44:55
 * @Last modified by:   yzf
 * @Last modified time: 2017-05-03 12:44:57
 */

import * as chai from 'chai'
import extend from '../src/index'
const expect = chai.expect

class Config {
  constructor() {
    this.config = {}
  }

  add = (key, value) => {
    this.config[key] = value
  }
}

describe('index', () => {
  it('test no options', () => {
    const configObj = new Config()
    extend(configObj)
    expect(configObj.config['rule.jsx']).to.not.be.undefined
    expect(configObj.config['rule.est']).to.not.be.undefined
  })

  it('test options', () => {
    const configObj = new Config()
    extend(configObj, {
      isDebug: true
    })
    expect(configObj.config['rule.jsx'].query.plugins).to.include.members([
      'transform-react-jsx-source', 'transform-react-jsx-self'
    ])
  })

  it('test node options', () => {
    const configObj = new Config()
    extend(configObj, {
      isNode: true
    })
    expect(configObj.config['rule.jsx'].query.plugins).to.include.members([
      'transform-react-jsx-source', 'transform-react-jsx-self'
    ])
    expect(configObj.config['rule.jsx'].query.presets).to.deep.include.members([
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
    ])
  })

  it('test plugins options', () => {
    const configObj = new Config()
    extend(configObj, {
      plugins: ['test']
    })
    expect(configObj.config['rule.jsx'].query.plugins).to.include.members(['test'])
  })
})
