<template>
  <div ref="wrapper" :class="containerCls" :style="containerWidth">
    <div :class="prefixCls + '-inner'" :style="{width: contentWidth +'px'}">
      <div class="engine-footer-toolbar-extra">
        <slot name="extra" />
      </div>
      <div class="engine-footer-toolbar-children">
        <slot />
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import VuePropTypes from '../vue-types'

export default {
  props: {
    className: VuePropTypes.string,
    contentWidth: VuePropTypes.oneOfType([VuePropTypes.string, VuePropTypes.number]),
    containerWidth: VuePropTypes.oneOfType([VuePropTypes.string, VuePropTypes.number]),
    autoWidth: VuePropTypes.bool.def(!1),
    prefixCls: VuePropTypes.string.def('engine-footer-toolbar'),
    getRefContainer: VuePropTypes.func
  },
  computed: {
    containerCls() {
      return [
        this.className,
        this.prefixCls,
        !this.$slots.extra && `${this.prefixCls}-no-extra`
      ]
    }
  },
  mounted() {
    this.setWrapperStyle()
    this.shouldResizeContainer() && (window.addEventListener('resize', () => {
      this.setWrapperStyle()
    }))
  },
  updated() {
    this.setWrapperStyle()
  },
  beforeDestroy() {
    window.removeEventListener('resize', () => {
      this.setWrapperStyle()
    })
  },
  methods: {
    shouldResizeContainer() {
      const { autoWidth, containerWidth } = this
      return autoWidth && !containerWidth
    },
    setWrapperStyle() {
      if (this.shouldResizeContainer() && this.refs.wrapper) {
        const { getRefContainer } = this
        const node = typeof getRefContainer === 'function' ? getRefContainer() : this.wrapper.parentNode
        if (node) {
          const rect = node.getBoundingClientRect()
          this.$refs.wrapper.style.width = `${node.clientWidth}px`
          this.$refs.wrapper.style.left = `${rect.left}px`
        }
      }
    }

  }
}
</script>
