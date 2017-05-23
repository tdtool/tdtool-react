/**
 * @Author: Zhengfeng.Yao <yzf>
 * @Date:   2017-05-03 15:53:49
 * @Last modified by:   yzf
 * @Last modified time: 2017-05-03 15:53:50
 */

function type(obj) {
 return Object.prototype.toString.call(obj)
}

exports.String = obj => type(obj) === '[object String]'
exports.Array = obj => type(obj) === '[object Array]'
exports.Object = obj => type(obj) === '[object Object]'
exports.Boolean = obj => type(obj) === '[object Boolean]'
