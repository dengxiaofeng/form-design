<template>
  <el-tooltip class="item" effect="dark" :content="label" placement="top">
    <span class="ve-option" :class="label === value ? ' ve-active': ''" @click="handleChange(label)">
      <slot />
    </span>
  </el-tooltip>
</template>

<script type="text/ecmascript-6">
export default {
  props: {
    label: {},
    name: ''
  },
  computed: {
    value: {
      get() {
        return this.$parent.value
      },
      set() {
        this.$parent.$emit('input', this.label)
      }
    }
  },
  methods: {
    handleChange() {
      this.$parent.$emit('input', this.label)
    }
  }
}
</script>
