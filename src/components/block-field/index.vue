<template>
  <div class="vc-field ve-block-field" :class="classNams">
    <div class="ve-field-head">
      {{ title }}
      <slot name="header" />
    </div>
    <div class="ve-field-body">
      <slot />
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  props: {
    title: {
      type: String,
      default: ''
    },
    classNams: {
      type: String,
      default: '"'
    },
    tip: {
      type: String,
      default: ""
    }
  }
}
</script>

<style type="text/scss" lang="scss" scoped>
  .vc-field {
    &:before, &:after {
      content: " ";
      display: table;
    }
    &:after {
      clear: both;
    }
    &.ve-block-field {
      margin-top: 0px;
    }
    .ve-field-head {
      padding-right: 85px;
      height: auto;
      min-height: 28px;
      display: flex;
      align-items: center;
      padding-left: 10px;
    }
    &.ve-block-field {
      > .ve-field-head {
        background: var(--color-block-background-light, rgba(31, 56, 88, 0.04));
        border-top: 1px solid var(--color-line-normal, rgba(31, 56, 88, 0.1));
        border-bottom: 1px solid var(--color-line-normal, rgba(31, 56, 88, 0.1));
      }
    }
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
    .ve-field-body {
      margin: 5px;
      &:before, &:after {
        content: " ";
        display: table;
      }
      &:after {
        clear: both;
      }

    }
  }
</style>
