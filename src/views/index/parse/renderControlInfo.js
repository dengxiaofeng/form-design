import _ from "lodash";

import suiteConfig from "./suitesConfig";
import utils from "./utils";

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

function f(a) {
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

export default {
  getType(config) {
    return (config.type || '').toLowerCase()
  },
  getRenderInfo(conf) {
    const {
      keyChain, nameKeyChain, config, value, changeParams
    } = conf
    const type = this.getType(config)
    const controlType = suiteConfig.CONTROL_TYPES_MAP[type]
    const renderInfo = {
      config: createObject({}, controlType === 'collection' ? _.pick(config, ['children', 'template', 'child']) : config, {
        type,
        nodeType: controlType || 'field',
        keyChain: utils.kcStr2Arr(keyChain),
        nameKeyChain: utils.kcStr2Arr(nameKeyChain)
      }),
      value,
      handler: changeParams
    }

    return renderInfo
  },
  handleValueChange(config) {
  
    console.log('handleValueChange', config)
    const {
      changeParams, keyChain, getRootValue, setRootValue, onChange
    } = config
    const { handler, handlerKeyChain } = changeParams

    return function (b, c, key) {
    
      const _getRootValue = getRootValue()
      if (keyChain[keyChain.length - 1] === 'events') {
          const events = _.get(_getRootValue, handlerKeyChain, _getRootValue)
          const action = Array.isArray(events) ? (events || []) : [events]
          action.push({
            [b.id]: b
          })
        _.set(_getRootValue, keyChain, action)
      } else {
        if(key) {
          _.set(_getRootValue, key, b)
        } else {
          _.set(_getRootValue, keyChain, b)
        }
       
      }
      const value = _.get(_getRootValue, key? key: handlerKeyChain, _getRootValue)
      onChange && onChange(handler ? {
        keyChain: key? key: handlerKeyChain,
        value: b,
        rootValue: _getRootValue,
        handler,
        handlerKeyChain: key? key: handlerKeyChain,
        handlerValue: value
      } : {
        keyChain: key? key: handlerKeyChain,
        value: b,
        rootValue: _getRootValue,
        handler: void 0,
        handlerKeyChain: void 0,
        handlerValue: _getRootValue
      })

      setRootValue(_getRootValue, c)
    }
  },
  noop() {
  },
  getChangeParams(b, c, d) {
    let e = c.handler
    const f = c.children
    f && f.handler && !e && (e = f.handler)
    const g = b && b.handler
    const h = b && b.handlerKeyChain
    return g ? {
      changeParams: {
        handler: g,
        handlerKeyChain: h
      }
    } : {
      changeParams: {
        handler: e,
        handlerKeyChain: d
      }
    }
  },
  getBasicParams(conf) {
    const {
      keyChain, level, config, value, nameKeyChain
    } = conf
    const {
      name, description, caption, enableHide
    } = config

    return {
      name: name || caption || keyChain && keyChain[keyChain.length - 1],
      enableHide,
      description,
      showStatus: (value || {}).show,
      caption: !!caption,
      level,
      keyChain,
      nameKeyChain,
      value
    }
  },
  handleShowHideToggle(option) {
    const { changeParams } = option
    const handler = changeParams && changeParams.handler
    const handlerKeyChain = changeParams && changeParams.handlerKeyChain
    const {
      keyChain, getRootValue, setRootValue, onChange
    } = option
    return function (flag) {
      const _getRootValue = getRootValue()
      const showKey = [].concat(f(keyChain), ['show'])
      _.set(_getRootValue, showKey, flag)
      const handlerValue = _.get(_getRootValue, handlerKeyChain, _getRootValue)

      onChange(handler ? {
        keyChain: showKey,
        value: flag,
        rootValue: _getRootValue,
        handler,
        handlerKeyChain,
        handlerValue
      } : {
        keyChain: showKey,
        value: flag,
        rootValue: _getRootValue,
        handler: void 0,
        handlerKeyChain: void 0,
        handlerValue: _getRootValue
      })
      setRootValue(_getRootValue)
    }
  },
  getTypedSuiteConfig(config) {
    const { components, type, children } = config
    let ret = {}
    const suiteOptions = suiteConfig.SUITES_CHILDREN[type]
    void 0 === components ? ret = suiteOptions : Array.isArray(components) && (ret = {}, components.forEach(item => {
      ret[item] = createObject({}, suiteOptions[item])
    }))
    children && Object.keys(children).forEach(item => {
      ret[item] = createObject({}, suiteOptions[item], children[item], {
        type: suiteOptions[item] && suiteOptions[item].type || children[item].type
      })
    })
    return ret
  },
  getCollectionRenderParams(opt) {
    debugger
    const {
      config, value, changeParams, keyChain, addRenderInfo, nameKeyChain
    } = opt

    const params = this.getChangeParams(changeParams, config, keyChain)
    const type = this.getType(config)

    addRenderInfo(createObject({}, this.getRenderInfo(createObject({
      keyChain,
      nameKeyChain,
      config,
      value
    }, params)), {
      success: !0
    }))

    return createObject({
      type,
      fold: !(config && _.isBoolean(config.fold) && !config.fold),
      config,
      defaultViewMode: config.defaultViewMode,
      showStatus: (value || {}).show,
      handleShowHideToggle: this.handleShowHideToggle(createObject({}, opt, params))
    }, params, this.getBasicParams(opt), {
      addRenderInfo
    })
  },
  getMenuContent: function menuContent(opt) {
    const { params } = opt
    const { changeParams } = opt

    const { keyChain } = params
    const { children } = params.config

    const { value } = params
    const { addRenderInfo } = params
    const { nameKeyChain } = params
    let { level } = params

    level += 1
    return Object.keys(children).map(item => {
      let menuChildren; const
        data = children[item]

      if (data.mode === 'multiple') {
        const props = {
          config: data,
          value: value && value[item],
          changeParams,
          keyChain: utils.getKeyChain(keyChain, [item]),
          nameKeyChain: utils.getKeyChain(nameKeyChain, (data || {}).name),
          level: params.level,
          addRenderInfo
        }
        const getCollectionRenderParams = this.getCollectionRenderParams(props)

        getCollectionRenderParams.menuChildren = menuContent({
          params: createObject({}, params, props),
          changeParams: getCollectionRenderParams.changeParams
        })
        menuChildren = getCollectionRenderParams
      } else {
        menuChildren = Object.entries(data.children || {}).map(child => {
          const props = {
            config: child[1],
            value: (value && value[item] || {})[child[0]],
            level,
            keyChain: utils.getKeyChain(keyChain, [item, child[0]]),
            nameKeyChain: utils.getKeyChain(nameKeyChain, [(data || {}).name, (child[1] || {}).name])
          }
          return addControl(createObject({}, params, props, {
            changeParams
          }))
        })
      }

      return createObject({}, data, {
        key: utils.kcArr2Str(utils.getKeyChain(keyChain, item)),
        tabKey: utils.kcArr2Str(utils.getKeyChain(keyChain, item)),
        fields: menuChildren
      })
    })
  },
  getTabsContent(opt) {
    const { params } = opt
    const { changeParams } = opt
    const { config } = params
    const { template } = config
    const { children } = config
    const { keyChain } = params
    const { value } = params
    const { level } = params
    const { nameKeyChain } = params

    if (template) {
      const name = _.template(template.name)
      const description = _.template(template.description)
      const icon = _.template(template.icon)
      const isChildren = !template.children

      return value && value.map((item, index) => {
        const _keyChain = utils.getKeyChain(keyChain, index)
        const _nameKeyChain = utils.getKeyChain(nameKeyChain, index)
        let render = null
        if (isChildren) {
          const props = createObject({}, params, {
            config: template || !_.isPlainObject(template) ? {} : createObject({}, template, {
              name: name({
                i: index
              })
            }),
            value: item,
            level: level + 1,
            keyChain: _keyChain,
            nameKeyChain: _nameKeyChain
          }, {
            changeParams
          })
          render = addControl(props, ['tabs', 'menu'])
        } else {
          render = Object.entries(template.children || {}).map(b => {
            const props = {
              config: b[1],
              value: (item || {})[b[0]],
              level: level + 1,
              keyChain: utils.getKeyChain(_keyChain, b[0]),
              nameKeyChain: utils.getKeyChain(_nameKeyChain, (b[1] || {}).name)
            }
            return addControl(createObject({}, params, props, {
              changeParams
            }), ['tabs', 'menu'])
          })
        }

        return {
          fields: render,
          index,
          key: utils.kcArr2Str(_keyChain),
          tabKey: utils.kcArr2Str(_keyChain),
          name: item._label || name({
            i: index
          }),
          icon: item._icon || icon({
            i: index
          }),
          description: item.description || description({
            i: index
          })
        }
      })
    }

    return value && value.map((item, index) => {
      const _keyChain = utils.getKeyChain(keyChain, index)
      const _nameKeyChain = utils.getKeyChain(nameKeyChain, index)
      return {
        fields: Object.entries(children[index].children || {}).map(child => {
          const props = {
            config: child[1],
            value: (item || {})[child[0]],
            level: level + 1,
            keyChain: utils.getKeyChain(_keyChain, child[0]),
            nameKeyChain: utils.getKeyChain(_nameKeyChain, (child[1] || {}).name)
          }
          return addControl(createObject({}, params, props, {
            changeParams
          }), ['tabs', 'menu'])
        }),
        index,
        key: utils.kcArr2Str(_keyChain),
        tabKey: utils.kcArr2Str(_keyChain),
        name: item._label || children[index].name,
        icon: item._icon || children[index].icon,
        description: item.description || children[index].description
      }
    })
  }

}
