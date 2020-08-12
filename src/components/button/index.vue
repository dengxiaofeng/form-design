<template>
  <button class="code-button" @click="handleClick">
    <slot />
  </button>
</template>
<script type="application/ecmascript">
export default {
  methods: {
    handleClick(evt) {
      this.$emit('click', evt)
    }
  }
}
</script>
<style>
  .code-button {
    display: block;
    width: 100%;
    height: 32px;
    margin: 8px auto;
    padding: 0 15px;
    border-radius: 3px;
    border: 1px solid #006cff;
    background-color: #006cff;
    color: hsla(0,0%,100%,.8);
    font-size: 14px;
    line-height: 30px;
    outline: 0;
    cursor: pointer;
  }
</style>
