<template>
  <div class="ve-icon-button ve-icon-button-default engine-slate-close" @click="handleClick">
    <svg fill="currentColor" preserveAspectRatio="xMidYMid meet" width="12px" height="12px" viewBox="0 0 1024 1024" class="ve-svgicon" style="vertical-align: middle;"><path d="M556.8 512l272-272c12.8-12.8 12.8-32 0-44.8-12.8-12.8-32-12.8-44.8 0L512 467.2 240 195.2c-12.8-12.8-32-12.8-44.8 0-12.8 12.8-12.8 32 0 44.8l272 272-272 272c-12.8 12.8-12.8 32 0 44.8 12.8 12.8 32 12.8 44.8 0l272-272 272 272c12.8 12.8 32 12.8 44.8 0 12.8-12.8 12.8-32 0-44.8L556.8 512z" /></svg>
  </div>
</template>

<script>
export default {
  methods: {
    handleClick(event) {
      this.$emit('click', event)
    }
  }
}
</script>

<style type="text/scss" lang="scss">
  .ve-icon-button {
    &.ve-icon-button-default {
      max-height: 100%;
      overflow: hidden;
      opacity: 0.6;
      cursor: pointer;
    }
  }
</style>
