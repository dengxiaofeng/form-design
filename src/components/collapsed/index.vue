<template>
  <div class="engine-setting-field engine-accordion-field" :class="visible ? '': ' engine-collapsed'">
    <div class="engine-field-head" @click.stop="handleToggle">
      <svg fill="currentColor"
           preserveAspectRatio="xMidYMid meet"
           width="12px"
           height="12px"
           viewBox="0 0 1024 1024"
           class="ve-svgicon engine-field-arrow" style="vertical-align: middle;"
      >
        <path d="M512.002047 771.904425c-10.152221 0.518816-20.442588-2.800789-28.202319-10.598382L77.902254 315.937602c-14.548344-14.618952-14.548344-38.318724 0-52.933583 14.544251-14.614859 38.118156-14.614859 52.662407 0l381.437385 418.531212L893.432269 263.004019c14.544251-14.614859 38.125319-14.614859 52.662407 0 14.552437 14.614859 14.552437 38.314631 0 52.933583L540.205389 761.307066C532.451798 769.103636 522.158361 772.424264 512.002047 771.904425z" />
      </svg>
      <span class="engine-field-title">{{ title }}</span>
    </div>
    <div class="engine-field-body">
      <slot />
    </div>
    <div class="engine-field-foot" />
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  props: {
    title: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      visible: false
    }
  },
  methods: {
    handleToggle() {
      this.visible = !this.visible
    }
  }
}
</script>

<style lang="scss" type="text/scss">
  .engine-setting-field {
    white-space: nowrap;
    position: relative;
    &:after,&:before{
      content: " ";
      display: table;
    }
    .engine-field-title {
      font-size: 12px;
      font-family: PingFang SC,Hiragino Sans GB,Microsoft YaHei,Helvetica,Arial,sans-serif;
      line-height: 1em;
      user-select: none;
      color: var(--color-text,rgba(0,0,0,.6));
      width: fit-content;
      white-space: normal;
      word-break: break-word;
    }
    &.engine-accordion-field {
      >.engine-field-body {
        margin: 6px;
      }
      &.engine-collapsed {
        >.engine-field-head {
          margin-bottom: 6px;
          >.engine-field-arrow {
            transform: rotate(0);
          }
        }
        >.engine-field-body {
          display: none;
        }
      }
    }
    &.engine-accordion-field {
      >.engine-field-head {
        position: relative;
        cursor: pointer;
        >.engine-field-title {
          letter-spacing: 1px;
        }
        >.engine-field-arrow {
          position: absolute;
          right: 7px;
          top: 7px;
          transition: transform .1s ease;
          opacity: .6;
        }
      }
    }
    .engine-field-head {
      padding-left: 10px;
      height: 32px;
      background: var(--color-block-background-shallow,rgba(31,56,88,.06));
      display: flex;
      align-items: center;
      font-weight: 500;
      border-top: 1px solid var(--color-line-normal,rgba(31,56,88,.1));
      border-bottom: 1px solid var(--color-line-normal,rgba(31,56,88,.1));
      color: var(--color-title,rgba(0,0,0,.8));
      .engine-field-arrow {
        transform: rotate(180deg);
        position: absolute;
        right: 7px;
        top: 8px;
        transition: transform 0.1s ease;
        opacity: 0.6;
      }
    }
  }
</style>
