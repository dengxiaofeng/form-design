<template>
  <div class="ve-field ve-inline-field" :class="classNames">
    <div class="ve-field-head">
      <span class="ve-field-title" :class="compact ? 've-compact': highlight ? 've-highlight': ''">
        <b v-for="(item, index) in title" :key="index" class="ve-word">{{ item }}</b>
        <slot name="title" />
      </span>
    </div>
    <div class="ve-field-body">
      <slot />
    </div>
    <div class="ve-field-foot" />
  </div>
</template>
<script type="text/ecmascript-6">
export default {
  props: {
    classNames: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    },
    compact: {
      type: Boolean,
      default: false
    },
    highlight: {
      type: Boolean,
      default: false
    }
  }
}
</script>
<style scoped lang="scss">
  .ve-field {
    white-space: nowrap;
    position: relative;
    color: var(--color-text, rgba(0, 0, 0, 0.6));
    &.ve-inline-field {
      display: flex;
      align-items: center;
      padding: 2px 0px;
      > .ve-field-head {
        display: inline-flex;
        background: none;
        padding: 0;
        .ve-field-title{
          display: inline-flex;
          width: 50px;
          margin-right: 5px;
          white-space: nowrap;
          text-transform: lowercase;
          word-break: normal;
          &.ve-highlight {
            color: var(--color-brand, #006cff);
          }
          &.ve-compact {
            justify-content: flex-end;
          }
        }
      }
      > .ve-field-body {
        display: inline-flex;
        width: 100%;
        align-items: center;
        padding: 0;
        margin: 0;
        position: relative;
      }
    }
  }
</style>
