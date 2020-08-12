<script type="application/ecmascript">
import renderControlInfo from './renderControlInfo'
import CaptionParse from './captionParse'

function def(target, key, value) {
  return key in target ? Object.defineProperty(target, key, {
    value,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : target[key] = value, target
}
export default {
  functional: true,
  props: {
    config: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  render(createElement, context) {
    const params = (function (config) {
      for (let c = 1; c < arguments.length; c++) {
        var f = arguments[c] == null ? {} : arguments[c]
        let e = Object.keys(f)
        typeof Object.getOwnPropertySymbols === 'function' && (e = e.concat(Object.getOwnPropertySymbols(f).filter(a => Object.getOwnPropertyDescriptor(f, a).enumerable))),
        e.forEach(a => {
          def(config, a, f[a])
        })
      }
      return config
    }({}, renderControlInfo.getBasicParams(context.props.config)))

    params.enableHide = !1
    return createElement(CaptionParse, {
      props: {
        params: context.props.config
      }
    })
  }
}
</script>
