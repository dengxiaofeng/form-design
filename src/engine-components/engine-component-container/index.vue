<script type="text/ecmascript-6">
import VuePropTypes from '../vue-types'

export default {
  props: {
    componentId: VuePropTypes.string,
    style: VuePropTypes.object
  },
  render() {
    return (
        <div class="vc-developer-component-container" style={this.style}>
          {
            this.$slots.default
          }
          {
            !this.$slots.default && (<div class="vc-developer-component-container-empty">
              拖拽组件到此区域
            </div>)
          }
        </div>
    )
  }
}
</script>

<style scoped lang="scss">
  .vc-developer-component-container-empty {
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(102,188,92,.06);
    border: 1px dashed #66bc5c;
    font-size: 14px;
    color: #66bc5c;
    min-height: 80px;
    min-width: 200px;
  }
</style>
