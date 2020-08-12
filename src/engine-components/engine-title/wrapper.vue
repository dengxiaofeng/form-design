<template>
  <div :class="wrapperCls">
    <slot />
  </div>
</template>

<script type="text/ecmascript-6">
import PropTypes from '../vue-types'

export default {
  props: {
    prefixCls: PropTypes.string.def('engine-title'),
    className: PropTypes.string,
    type: PropTypes.oneOf(['primary', 'secondary', 'thirdary']).def('secondary'),
    noDecoration: PropTypes.bool.def(!1)
  },
  computed: {
    wrapperCls() {
      const { prefixCls } = this
      const { type } = this
      return [prefixCls, `${prefixCls}-${type}`, this.noDecoration && `${prefixCls}-no-decoration`, this.className].join(' ')
    }
  }
}
</script>

<style lang="scss">
  .engine-title {
    color: rgba(0, 0, 0, 0.8);
    margin-bottom: 10px!important;
    &-primary {
      font-size: 20px;
      margin: 24px 0 30px;
    }
    &-secondary {
      font-size: 16px;
      margin:0px;
      position: relative;
      border-bottom: 1px solid rgba(31, 56, 88, 0.1);
      line-height: 32px;
      &:before {
        content: '';
        border-left: 3px solid #0079F2;
        height: 14px;
        display: inline-block;
        margin-right: 8px;
        position: relative;
        top: 1px;
      }
    }
    &-thirdary {
      font-size: 14px;
      margin: 20px 0 12px;
    }
    .vc-title-text {
      display: inline-block;
      min-width: calc(100% - 15px);
      line-height: 1.5;
    }
  }
</style>
