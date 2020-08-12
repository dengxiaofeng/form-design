<script>
import PageConfigRender from './pageConfigRender'
import suiteConfig from './suitesConfig'
import ComponentConfigRender from './componentConfigRender'
import where from './where'
import _ from 'lodash'

export default {
  functional: true,
  components: {
    PageConfigRender,
    ComponentConfigRender
  },
  props: {
    conf: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  render(createElement, context) {
  
    const {
      keyChain, config, getRootValue, addRenderInfo
    } = context.props.conf

    const _keyChain = keyChain && keyChain.join('.')
    const { type } = context.props.conf.config
    const controlType = suiteConfig.CONTROL_TYPES_MAP[type]

    // if(_.isObject(config)) {
    //   return !["handler", "fold"].includes(keyChain) && console.warn("Warning from datav.gui: ".concat(_keyChain, " with invalid config!")),
    //     addRenderInfo({
    //       config: {
    //         keyChain: _keyChain
    //       },
    //       success: !1,
    //       reason: "INVALID_CONIFG"
    //     }),
    //     null;
    // }
    const lastKeyChain = keyChain && keyChain[keyChain.length - 1]
    if (['default', 'range', 'show'].includes(lastKeyChain)) {
      return null
    }
    
    if (
      void 0 !== config.show && void 0 === config.showInPanel && (
        config.showInPanel = config.show,
        Array.isArray(config.show) && config.showInPanel.map(a => (a[0] = a[0].startsWith('.') ? a[0] : '.'.concat(a[0]), a))),
      !where(config.showInPanel, keyChain, getRootValue())) {
      return addRenderInfo({
        config: {
          keyChain: _keyChain
        },
        success: !1,
        reason: 'HIDE'
      }), null
    }

    return createElement(controlType === 'collection' ? ComponentConfigRender : PageConfigRender, {
      props: {
        config: context.props.conf
      }
    })
  }
}
</script>
