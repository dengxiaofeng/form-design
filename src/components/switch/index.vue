<template>
  <div class="ve-bool-control" :class="bool ? 've-on': ''" @click="handleChange">
    <div class="ve-slider">
      <i class="ve-block" />
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
export default {
  props: {
    value: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      bool: this.value
    }
  },
  watch: {
    value(val) {
      this.bool = val
    }
  },
  methods: {
    handleChange() {
      this.bool = !this.bool
      this.$emit('change', this.bool)
    }
  }
}
</script>
<style type="text/scss" lang="scss">
  .ve-bool-control {
    box-sizing: border-box;
    width: 40px;
    height: 24px;
    border-radius: 20px;
    position: relative;
    overflow: hidden;
    .ve-slider {
      position: absolute;
      width: 85px;
      height: 24px;
      left: -37px;
      background-color: var(--color-block-background-disabled,rgba(31,56,88,.2));
      cursor: pointer;
      transition: left .13s ease;
      .ve-block {
        position: absolute;
        height: 18px;
        width: 18px;
        background-color: var(--color-block-background-normal,#fff);
        top: 0;
        left: 50%;
        margin-left: -1px;
        margin-top: 3px;
        border-radius: 18px;
      }
    }
    &.ve-on {
      .ve-slider {
        left: -24px;
        background-color: var(--color-function-success,#66bc5c);
      }
    }
  }
</style>
