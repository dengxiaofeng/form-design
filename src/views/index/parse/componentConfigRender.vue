<script type="text/ecmascript-6">
import renderControlInfo from './renderControlInfo'
import utils from './utils'
import addControl from './addControl'
import BodyField from '@/components/body-field'
import createObject from './util'
import Accordion from '@/components/accordion'
export default {
  functional: true,
  components: {
    addControl,
    BodyField,
    Accordion
  },
  props: {
    config: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  render(createElement, context) {
    const { config } = context.props.config
    const { children, addable, template } = config
    const getCollectionRenderParams = renderControlInfo.getCollectionRenderParams(context.props.config)

    const {
      changeParams, keyChain, type, value, level, nameKeyChain
    } = getCollectionRenderParams
    if (type === 'group') {
      const fields = Object.entries(children || {}).map(item => {
        const key = item[0]
        const opt = {
          config: item[1],
          value: (value || {})[key],
          level: level + 1,
          keyChain: utils.getKeyChain(keyChain, key),
          nameKeyChain: utils.getKeyChain(nameKeyChain, item[1].name)
        }
        return createElement(addControl, {
          props: {
            conf: createObject({}, context.props.config, opt, {
              changeParams
            })
          }
        })
      })
      getCollectionRenderParams.fields = fields
    }
    if (type === 'datasource') {
      const fields = Object.entries(children || {}).map(item => {
        const key = item[0]
        const opt = {
          config: item[1],
          value: (value || {})[key],
          level: level + 1,
          keyChain: utils.getKeyChain(keyChain, key),
          nameKeyChain: utils.getKeyChain(nameKeyChain, item[1].name)
        }
        return createElement(addControl, {
          props: {
            conf: createObject({}, context.props.config, opt, {
              changeParams
            })
          }
        })
      })
      getCollectionRenderParams.fields = fields
    }

    type !== 'group' && (getCollectionRenderParams.enableHide = !1)

    const props = { key: keyChain && keyChain.join('.'), ...getCollectionRenderParams }
    console.log('add controle', type)
    return type === 'group' ? createElement(Accordion, {
       class: 'engine-setting-field',
       props: {
          title: props.name
        }
    }, props.fields) : createElement(BodyField, props.fields)
  }
}
</script>
