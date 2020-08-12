<template>
  <div class="engine-setting-field engine-block-field">
    <div class="engine-field-head">
      <span content="engine-field-title">{{ title }}</span>
      <i v-if="tooltip" class="ve-icon-tip engine-field-tip-icon">
        <el-tooltip effect="dark" :content="tooltip" placement="top">
          <svg fill="currentColor" preserveAspectRatio="xMidYMid meet" width="16" height="16" viewBox="0 0 1024 1024" class="ve-svgicon" style="vertical-align: middle;"><path d="M473.536 593.408v-7.04c0-22.656 3.84-42.24 12.704-58.112 8.288-17.12 32.448-42.208 71.84-75.84l10.816-11.616c11.456-14.08 17.792-28.768 17.792-44.64 0-21.44-6.336-37.92-18.432-50.176-12.704-12.224-31.136-18.336-54.016-18.336-28.64 0-49.6 8.576-62.304 26.304-11.36 14.528-17.056 35.072-17.184 61.6a31.616 31.616 0 0 1 0.192 3.584c0 17.856-14.976 32.32-33.472 32.32-18.496 0-33.472-14.464-33.472-32.32a31.68 31.68 0 0 1 0.128-2.816H368c0-44.64 13.344-79.488 40.064-105.184 26.688-26.304 63.552-39.136 110.624-39.136 40.672 0 73.728 10.4 99.168 32.416 25.44 21.408 38.144 50.752 38.144 87.456 0 29.952-8.256 55.04-24.16 74.592-5.728 6.72-23.52 22.656-53.408 47.712a102.4 102.4 0 0 0-26.688 31.808 79.648 79.648 0 0 0-10.176 40.352v10.4h-0.064c-0.8 17.504-15.712 31.456-34.016 31.456-18.784 0-34.016-14.72-34.016-32.896 0-0.64 0-1.28 0.064-1.92zM512 960C264.576 960 64 759.424 64 512S264.576 64 512 64s448 200.576 448 448-200.576 448-448 448z m0-64c212.064 0 384-171.936 384-384S724.064 128 512 128 128 299.936 128 512s171.936 384 384 384z m-4.768-231.456c13.344 0 24.8 3.68 33.696 12.224 8.896 7.968 13.344 18.368 13.344 31.2s-5.088 23.232-13.984 31.808a48.8 48.8 0 0 1-33.056 12.224c-12.704 0-24.16-4.288-33.056-12.832a41.664 41.664 0 0 1-13.344-31.2c0-12.832 4.448-23.232 13.344-31.2 8.896-8.544 20.352-12.224 33.056-12.224z" /></svg>
        </el-tooltip>
      </i>
    </div>
    <div class="engine-field-body">
      <slot />
    </div>
    <div class="engine-field-foot" />
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: ''
    },
    tooltip: {
      type: String,
      default: ''
    }
  }
}
</script>

<style type="text/css">
  .engine-setting-field {
    white-space: nowrap;
    position: relative;
  }
  .engine-setting-field:after, .engine-setting-field:before {
    content: " ";
    display: table;
  }
  .engine-setting-field .engine-field-body .engine-field-head {
    height: 28px;
    border: none;
    font-weight: 400;
  }
  .engine-setting-field .engine-field-head {
    padding-left: 10px;
    height: 32px;
    background: rgba(31,56,88,.06);
    display: flex;
    align-items: center;
    font-weight: 500;
    border-top: 1px solid rgba(31,56,88,.1);
    border-bottom: 1px solid rgba(31,56,88,.1);
    color: rgba(0,0,0,.6);
    font-size: 12px;
  }
  .engine-setting-field.engine-block-field>.field-head>.engine-field-title {
    letter-spacing: 1px;
  }
  .engine-setting-field .engine-field-title {
    font-size: 12px;
    font-family: PingFang SC,Hiragino Sans GB,Microsoft YaHei,Helvetica,Arial,sans-serif;
    line-height: 1em;
    user-select: none;
    color: rgba(0,0,0,.6);
    width: fit-content;
    white-space: normal;
    word-break: break-word;
  }
  .engine-setting-field.engine-block-field>.engine-field-body {
    margin: 6px;
  }
  .engine-setting-field .engine-field-body {
    min-height: 20px;
  }
  .main .ve-icon-tip, .engine-main .ve-icon-tip:visited {
    color: rgba(31,56,88,.4)
  }
  .ve-icon-tip {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    pointer-events: auto;
  }

</style>
