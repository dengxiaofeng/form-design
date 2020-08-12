<template>
  <div :id="componentId" :class="containerCls" :style="customStyle">
    <slot />
  </div>
</template>
<script type="text/ecmascript-6">
export default {
  props: {
    componentId: {
      type: String,
      default: ''
    },
    customStyle: {
      type: [String, Object],
      default: ''
    },
    cls: {
      type: String,
      default: ''
    }
  },
  computed: {
    containerCls() {
      return `vc-container ${this.cls}`
    }
  }
}
</script>
