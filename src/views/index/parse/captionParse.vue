<script type="application/ecmascript">
import renderControlInfo from './renderControlInfo'
import RenderComponent from './renderComponent'
import createObject from './util'

export default {
  functional: true,
  components: {
    RenderComponent
  },
  props: {
    params: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  render(createElement, context) {
    const {
      changeParams,
      keyChain,
      addRenderInfo,
      value,
      nameKeyChain,
      config
    } = context.props.params
    const getChangeParams = createObject({}, context.props.params, renderControlInfo.getChangeParams(changeParams, config, keyChain))
    getChangeParams.handleValueChange = renderControlInfo.handleValueChange(getChangeParams)
    addRenderInfo(createObject({}, renderControlInfo.getRenderInfo(createObject({
      keyChain,
      nameKeyChain,
      config,
      value
    }, renderControlInfo.getChangeParams(changeParams, config, keyChain))), {
      success: !0
    }))

    return createElement(RenderComponent, {
      props: {
        params: { key: keyChain && keyChain.join('.'), ...getChangeParams }
      }
    })
  }
}
</script>
