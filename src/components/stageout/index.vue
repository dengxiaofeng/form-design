<template>
  <div class="engine-settings-stage engine-has-backer" :class="'engine-stageout' + placment">
    <div class="engine-settings-stagebacker">
      <svg fill="currentColor"
           preserveAspectRatio="xMidYMid meet"
           width="12px"
           height="12px"
           viewBox="0 0 1024 1024"
           class="ve-svgicon engine-field-arrow"
           style="vertical-align: middle;"
      >
        <path d="M512.002047 771.904425c-10.152221 0.518816-20.442588-2.800789-28.202319-10.598382L77.902254 315.937602c-14.548344-14.618952-14.548344-38.318724 0-52.933583 14.544251-14.614859 38.118156-14.614859 52.662407 0l381.437385 418.531212L893.432269 263.004019c14.544251-14.614859 38.125319-14.614859 52.662407 0 14.552437 14.614859 14.552437 38.314631 0 52.933583L540.205389 761.307066C532.451798 769.103636 522.158361 772.424264 512.002047 771.904425z" data-spm-anchor-id="0.0.0.i85.27824098ukz4o9" />
      </svg>
      <span class="engine-field-title">选择图标</span>
      <i class="ve-icon-tip engine-field-tip-icon" />
    </div>
    <div class="engine-stage-content">
      <slot />
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  props: {
    placment: {
      type: String,
      default: 'right'
    }
  }
}
</script>

<style scoped lang="scss" type="text/scss">
  .engine-settings-stage {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    opacity: 1;
    transition: transform .2s;
    .engine-stagein-left, .engine-stageout-right {
      transform: translateX(100%);
    }
    .engine-settings-stagebacker {
      cursor: pointer;
      font-weight: 500;
      height: 30px;
      display: flex;
      align-items: center;
      background: var(--color-block-background-light,rgba(31,56,88,.04));
      justify-content: center;
      position: relative;
      .engine-field-arrow {
        position: absolute;
        left: 3px;
        top: 50%;
        transform: translateY(-50%) rotate(90deg);
        opacity: .6;
      }
      .engine-field-title {
        letter-spacing: 1px;
        font-size: 12px;
        font-family: PingFang SC,Hiragino Sans GB,Microsoft YaHei,Helvetica,Arial,sans-serif;
        line-height: 1em;
        user-select: none;
        color: var(--color-text,rgba(0,0,0,.6));
        width: fit-content;
        white-space: normal;
        word-break: break-word;
      }
    }
    .engine-stage-content {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      z-index: 2;
      overflow-x: hidden;
      overflow-y: auto;
      box-sizing: border-box;
    }
    &.engine-has-backer .engine-stage-content {
      top: 36px;
    }
  }
  .ve-icon-tip {
    display: -ms-inline-flexbox;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    pointer-events: auto;
    color: var(--color-icon-normal,rgba(31,56,88,.4));
    &:visited {
      color: var(--color-icon-normal,rgba(31,56,88,.4));
    }
  }
</style>
