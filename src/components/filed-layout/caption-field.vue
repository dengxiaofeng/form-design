<template>
  <div class="ve-field ve-caption-field vs-field-flex">
    <div class="ve-field-head">
      <span class="ve-field-title">{{ title }}</span>
    </div>
    <div class="ve-field-body">
      <slot />
    </div>
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
    }
  }
}
</script>

<style type="text/scss" lang="scss">
  .ve-field {
    white-space: nowrap;
    position: relative;
    color: var(--color-text, rgba(0, 0, 0, 0.6));
    &.ve-caption-field {
      border: 1px solid var(--color-line-normal, rgba(31, 56, 88, 0.1));
      border-radius: 5px;
      margin-top: 10px;
      > .ve-field-head {
        position: absolute;
        background: none;
        top: -11px;
        padding: 0 5px;
        left: 50%;
        transform: translateX(-50%);
        height: 20px;
        cursor: default;
        .ve-field-title {
          font-size: 12px;
          font-family: "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", Helvetica, Arial, sans-serif;
          line-height: 1.5em;
          user-select: none;
          color: var(--color-text, rgba(0, 0, 0, 0.6));
          width: fit-content;
          white-space: initial;
          word-break: break-word;
        }
      }
      > .ve-field-body {
        min-height: 20px;
        margin: 5px 5px;
        margin-top: 12px;
      }
    }
  }
</style>
