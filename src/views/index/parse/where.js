import _ from "lodash";

const { toString } = Object.prototype
function convertArray(a) {
  return (function (a) {
    if (Array.isArray(a)) {
      for (var b = 0, c = Array(a.length); b < a.length; b++) c[b] = a[b]
      return c
    }
  }(a)) || (function (a) {
    if (Symbol.iterator in Object(a) || Object.prototype.toString.call(a) === '[object Arguments]') return Array.from(a)
  }(a)) || (function () {
    throw new TypeError('Invalid attempt to spread non-iterable instance')
  }())
}

function parseObj(value) {
  if (typeof value === 'string') {
    return value
  }
  const ret = `${value}`
  return ret == '0' && 1 / value == -(1 / 0) ? '-0' : ret
}

function isKey(value, object) {
  if (_.isArray(value)) return !1
  const type = typeof value
  if (type == 'number' || type == 'symbol' || type == 'boolean'
    || value == null || _.isSymbol(value)) {
    return true
  }
  return /^\w*$/.test(value) || !/\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/.test(value)
    || (object != null && value in Object(object))
}
function parseArr(b, c) {
  for (var d = 0, e = (c = isKey(c, b) ? [c] : c).length; b != null && d < e;) b = b[parseObj(c[d++])]
  return d && d == e ? b : void 0
}

const normalizeWhere = (a, b, c) => {
  const fn = a === null ? void 0 : parseArr(a, b)
  return void 0 === fn ? c : fn
}

const converKeyChain = (where, keyChain, getRootValue) => {

  if ((where[0] === '.' ? 'relative' : 'absolute') === 'absolute') {
    return normalizeWhere(getRootValue, where)
  }

  for (var ret = convertArray(keyChain); where[0] === '.';) {
    ret.pop()
    where = where.slice(1)
  }
  ret = ret.concat(where.split('.'))

  // if(ret.length > 1) {
  //   ret = [ret[ret.length - 1]]
  // }
  console.log('converKeyChain', ret)
  return normalizeWhere(getRootValue, ret)
}

const parseWhere = (b, c, d) => {
  let e = !1
  return e = c === '$eq' ? b === d : c === '$ne' ? b !== d : c === '$gt' ? b > d : c === '$lt' ? b < d : c === '$gte' ? b >= d : c === '$lte' ? b <= d : c === '$in' ? _.isArray(d) && d.indexOf(b) >= 0 : c === '$nin' && _.isArray(d) && d.indexOf(b) == -1,
  e
}
export default (showPanel, keyChain, getRootValue) => {

  if (void 0 === showPanel) {
    return !0
  }

  if (_.isBoolean(showPanel)) {
    return !!showPanel
  }
  let status; let
    where

  if (_.isArray(showPanel)) {
    status = showPanel
    where = '$and'
  } else {
    if (!_.isPlainObject(showPanel)) {
      return !0
    }

    if (Array.isArray(showPanel.conditions)) {
      status = showPanel.conditions
      where = showPanel.logicalType === '$or' ? '$or' : '$and'
    } else if (Array.isArray(showPanel.$and)) {
      status = showPanel.$and
      where = '$and'
    } else {
      if (!Array.isArray(showPanel.$or)) {
        return !0
      }
      status = showPanel.$or
      where = '$or'
    }
  }
  if (_.isString(keyChain)) {
    keyChain = Array.from(new Set(keyChain.split('.')))
  }
  for (var ret, _where = where === '$and', i = 0; i < status.length; i++) {
    if (ret = status[i], Array.isArray(ret)) {
    
      const convertKey = converKeyChain(ret[0], keyChain, getRootValue)
      const key1 = ret[1]
      const value = ret[2]
      const _parseWhere = convertKey && parseWhere(convertKey, key1, value)

      if (where === '$and') {
        if (!(_where = _where && _parseWhere)) {
          break
        }
      } else if (_where = _where || _parseWhere) {
        break
      }
    }
  }
  console.log('_where', _where)
  return _where
}
