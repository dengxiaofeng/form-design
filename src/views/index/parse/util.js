function def(target, key, value) {
  return key in target ? Object.defineProperty(target, key, {
    value,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : target[key] = value, target
}

export default function createObject(obj) {
  for (let i = 1; i < arguments.length; i++) {
    var args = arguments[i] == null ? {} : arguments[i]
    let keys = Object.keys(args)
    typeof Object.getOwnPropertySymbols === 'function' && (keys = keys.concat(Object.getOwnPropertySymbols(args).filter(value => Object.getOwnPropertyDescriptor(args, value).enumerable))),
    keys.forEach(key => {
      def(obj, key, args[key])
    })
  }
  return obj
}
