<template>
  <div class="icon-button icon-button-default action-check" :class="newVal ? ' checked active': ''" @click="handleChange">
    <svg fill="currentColor"
         preserveAspectRatio="xMidYMid meet"
         width="16"
         height="16"
         viewBox="0 0 1024 1024"
         class="ve-svgicon"
         style="vertical-align: middle;"
    >
      <path :d="calcPath" />
    </svg>
  </div>
</template>

<script type="text/ecmascript-6">
const check = 'M0.00064 192.640399A192.19176 192.19176 0 0 1 192.640399 0.00064h638.719202A192.19176 192.19176 0 0 1 1023.99936 192.640399v638.719202A192.19176 192.19176 0 0 1 831.359601 1023.99936H192.640399A192.19176 192.19176 0 0 1 0.00064 831.359601V192.640399z m63.99992-0.255999v639.2312C64.00056 902.591512 121.472488 959.99944 192.3844 959.99944h639.2312A128.31984 128.31984 0 0 0 959.99944 831.6156V192.3844A128.31984 128.31984 0 0 0 831.6156 64.00056H192.3844A128.31984 128.31984 0 0 0 64.00056 192.3844z'
const active = 'M0.00064 192.640399A192.19176 192.19176 0 0 1 192.640399 0.00064h638.719202A192.19176 192.19176 0 0 1 1023.99936 192.640399v638.719202A192.19176 192.19176 0 0 1 831.359601 1023.99936H192.640399A192.19176 192.19176 0 0 1 0.00064 831.359601V192.640399z m421.503473 436.351455L240.448339 448.00008 149.952453 538.495967l271.55166 271.55166 452.479435-452.543434-90.431887-90.495887-362.047548 361.983548z'

export default {
  props: {
    value: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      path: check,
      newVal: this.value
    }
  },
  computed: {
    calcPath() {
      return this.newVal ? active : check
    }
  },
  watch: {
    value(newVal, oldVal) {
      if (newVal !== oldVal) {
        this.newVal = newVal
      }
    }
  },
  methods: {
    handleChange() {
      this.newVal = !this.newVal
      this.newVal ? (this.path = active) : (this.path = check)
      this.$emit('change', this.newVal)
    }
  }
}
</script>

<style type="text/scss">
  .action-check.checked svg>path:first-child {
    fill: #006cff;
    opacity: 1;
  }
</style>
