<script type="application/ecmascript">
import AddControl from './addControl'
import _ from 'lodash'

function noop() {

}
function def(target, key, value) {
  return key in target ? Object.defineProperty(target, key, {
    value,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : target[key] = value, target
}

function createObject(obj) {
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

export default {
  components: {
    AddControl
  },
  props: {
    configObj: {
      type: Object,
      default() {
        return {}
      }
    },
    valueObj: {
      type: Object,
      default() {
        return {}
      }
    },
    onChange: {
      type: Function,
      default() {
        return noop()
      }
    },
    handlerDisplay: {
      type: Function,
      default() {
        return noop()
      }
    }
  },
  data() {
    return {
      ...createObject({
        config: _.cloneDeep(this.configObj),
        value: _.cloneDeep(this.valueObj)
      }),
      renderSuccess: new Map(),
      renderFailure: new Map()
    }
  },
  methods: {
    getRootDom() {
      return this.$refs.rootDom
    },
    getRootValue() {
      debugger
      return this.valueObj
    },
    setRootValue(value, callback) {
      debugger
      this.value = value
      callback && callback()
    },
    addRenderInfo(conf) {
      debugger
      const config = void 0 === conf.config ? {} : conf.config
      const { value, handler, reason } = conf
      if (conf.success) {
        const _handler = handler.handler
        this.renderSuccess.set(config.keyChain, {
          config,
          value,
          handler: _handler ? handler : {}
        })
      } else {
        this.renderFailure.set(config.keyChain, {
          reason
        })
      }
    }
  },
  render(createElement, context) {
    const value = this.valueObj
    const config = this.configObj
    if (!config || !value) {
      return null
    }
    const handler = config.handler || void 0
    const createControl = Object.keys(config).map(item => {
      const ret = {
        config: config[item],
        value: value[item],
        keyChain: [item],
        nameKeyChain: void 0 === (config[item] || {}).name ? [] : [config[item].name],
        level: (config[item].type || '').toLowerCase() === 'menu' ? 0 : 1,
        getRootValue: this.getRootValue,
        setRootValue: this.setRootValue,
        onChange: this.onChange,
        handlerDisplay: this.handlerDisplay,
        addRenderInfo: this.addRenderInfo,
        changeParams: {
          handler,
          handlerkeyChain: void 0
        }
      }
      return createElement(AddControl, {
        props: {
          conf: ret
        }
      })
    })
    return (
        <div ref="rootDom" class="form-gui">
          {
            createControl
          }
        </div>
    )
  }
}
</script>
