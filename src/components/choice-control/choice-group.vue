<template>
  <div class="ve-choice-control ve-compact"
       :class="layout === 'display'? `vs-style-layout-diplay ${classNames}` : layout === 'flex' ? `vs-style-flex-property ${classNames}` : `${classNames}`"
  >
    <slot />
  </div>
</template>
<script type="text/ecmascript-6">
export default {
  props: {
    value: {
      type: String,
      default: ''
    },
    layout: {
      type: String,
      default: ''
    },
    classNames: {
      type: String,
      default: ''
    }
  },
  created() {
    this.$on('input', value => {
      this.$emit('change', value)
    })
  }
}
</script>

<style lang="scss" type="text/scss">
  .ve-choice-control.ve-compact .ve-option:first-child, .ve-choice-control.ve-compact .ve-option:not(:first-child) {
    border-left: 1px solid var(--color-field-border,rgba(31,56,88,.3));
  }
  .ve-choice-control {
    box-sizing: border-box;
    white-space: normal;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    flex: 1;
    &.ve-compact {
      white-space: nowrap;
      .ve-option {
        padding: 2px 4px;
        border-radius: 0;
        margin: 0;
        &:first-child {
          border-radius: 3px 0 0 3px;
        }
        &:not(:first-child) {
          border-left: 1px solid var(--color-field-border,rgba(31,56,88,.3));
        }
        &:last-child {
          border-radius: 0 3px 3px 0;
          border-right: 1px solid var(--color-field-border,rgba(31,56,88,.3));
        }
      }
    }
    .ve-option {
      flex: 1;
      position: relative;
      box-sizing: content-box;
      user-select: none;
      height: 22px;
      padding: 2px 5px;
      color: var(--color-text,rgba(0,0,0,.6));
      font-family: PingFang SC,Hiragino Sans GB,Microsoft YaHei,Helvetica,Arial,sans-serif;
      font-size: 12px;
      cursor: pointer;
      border-top: 1px solid var(--color-field-border,rgba(31,56,88,.3));
      border-bottom: 1px solid var(--color-field-border,rgba(31,56,88,.3));
      border-radius: 3px;
      margin-right: 4px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      background: var(--color-field-background,#fff);
      transition: background .2s;
      &.ve-active {
        opacity: 1;
        background: var(--color-field-border-active,rgba(31,56,88,.6));
        color: var(--color-text-reverse,hsla(0,0%,100%,.8));
        box-shadow: none;
      }
    }

  }
</style>
