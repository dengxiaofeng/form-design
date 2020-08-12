<template>
  <div class="text-control">
    <input ref="getInput" type="text" class="input" :value="val"
           @input="handleInput"
           @focus="handleFocus"
           @blur="handleBlur"
           @change="handleChange"
    >
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: [String, Number, Object],
      default: null
    }
  },
  data() {
    return {
      val: this.value
    }
  },
  watch: {
    value(newVal, oldVal) {
      if (newVal !== oldVal) {
        this.val = newVal
        this.$emit('change', this.val)
      }
    }
  },
  methods: {
    focus() {
      this.getInput().focus()
    },
    blur() {
      this.getInput().blur()
    },
    getInput() {
      return this.$refs.input
    },
    handleInput(event) {
      if (event.target.value === this.nativeInputValue) return
      this.$emit('change', event.target.value)
    },
    handleChange(event) {
      this.$emit('change', event.target.value)
    },
    handleFocus(event) {
      this.$emit('change', event.target.value)
    },
    handleBlur(event) {
      this.$emit('change', event.target.value)
    }
  }
}
</script>

<style>
  .text-control {
    width: 100%;
    box-sizing: border-box;
    background: transparent;
    min-height: 28px;
    border: 1px solid rgba(31,56,88,.3);
    border-radius: 3px;
  }
  .text-control>input.input {
    height: 28px;
  }
  .text-control>input.input, .text-control>textarea.input {
    box-sizing: border-box;
    padding: 4px;
    display: block;
    font-size: 12px;
    font-family: PingFang SC,Hiragino Sans GB,Microsoft YaHei,Helvetica,Arial,sans-serif;
    width: 100%;
    border: 0;
    margin: 0;
    background: transparent;
    color: rgba(0,0,0,.6);
    outline: none;
    resize: none;
  }
</style>
