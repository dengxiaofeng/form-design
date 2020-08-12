<template>
  <div class="vs-style-layout-padding-margin">
    <div class="vs-layout-box vs-margin-box">
      <div class="vs-layout-handle vs-handle-top">
        <svg fill="currentColor"
             preserveAspectRatio="xMidYMid meet"
             width="12px"
             height="12px"
             viewBox="0 0 1566 1024"
             class="ve-svgicon vs-handle-icon"
             style="vertical-align: middle;"
        >
          <path d="M445.44 291.84h675.84v153.6H445.44zM220.16 578.56h1126.4v153.6H220.16zM0 870.4h1566.72v153.6H0zM670.72 0h230.4v153.6h-230.4z" />
        </svg>
      </div>
      <div class="vs-inline-input vs-layout-input-top ve-highlight">
        <span v-if="!margin.visible.marginTop" class="vs-inline-input-text" @click.stop="handleContentEdit('margin.visible.marginTop', 'marginTop')">{{ margin.value.marginTop }}</span>
        <input v-else ref="marginTop" v-model="margin.value.marginTop + 'px'" class="vs-inline-input-input" type="text"
               :placeholder="margin.value.marginTop +'px'"
               @keydown.down="handleMin"
               @keydown.up="handleAdd"
               @change="handleChange($event, 'margin.value.marginTop')"
               @blur="handleBlur('margin.visible.marginTop')"
        >
      </div>
      <div class="vs-layout-handle vs-handle-right">
        <svg
          fill="currentColor"
          preserveAspectRatio="xMidYMid meet"
          width="12px"
          height="12px"
          viewBox="0 0 1566 1024"
          class="ve-svgicon vs-handle-icon"
          style="vertical-align: middle;"
        >
          <path
            d="M445.44 291.84h675.84v153.6H445.44zM220.16 578.56h1126.4v153.6H220.16zM0 870.4h1566.72v153.6H0zM670.72 0h230.4v153.6h-230.4z"
          />
        </svg>
      </div>
      <div class="vs-inline-input vs-layout-input-right ve-highlight">
        <!--        <span class="vs-inline-input-text">auto left</span>-->
        <span v-if="!margin.visible.marginRight" class="vs-inline-input-text" @click.stop="handleContentEdit('margin.visible.marginRight', 'marginRight')">{{ margin.value.marginRight }}</span>
        <input v-else ref="marginRight" class="vs-inline-input-input" type="text" :placeholder="margin.value.marginRight +'px'"
               :value="margin.value.marginRight + 'px'"
               @keydown.down="handleMin"
               @change="handleChange($event, 'margin.value.marginRight')"
               @blur="handleBlur('margin.visible.marginRight')"
        >
      </div>
      <div class="vs-layout-handle vs-handle-bottom">
        <span class="vs-handle-inscription">margin</span>
        <svg
          fill="currentColor"
          preserveAspectRatio="xMidYMid meet"
          width="12px"
          height="12px"
          viewBox="0 0 1566 1024"
          class="ve-svgicon vs-handle-icon" style="vertical-align: middle;"
        >
          <path
            d="M445.44 291.84h675.84v153.6H445.44zM220.16 578.56h1126.4v153.6H220.16zM0 870.4h1566.72v153.6H0zM670.72 0h230.4v153.6h-230.4z"
          />
        </svg>
      </div>

      <div class="vs-inline-input vs-layout-input-bottom ve-highlight">
        <span v-if="!margin.visible.marginBottom" class="vs-inline-input-text" @click.stop="handleContentEdit('margin.visible.marginBottom', 'marginBottom')">{{ margin.value.marginBottom }}</span>
        <input v-else ref="marginBottom" class="vs-inline-input-input" type="text" :placeholder="margin.value.marginBottom +'px'"
               :value="margin.value.marginBottom + 'px'"
               @keydown.down="handleMin"
               @keydown.up="handleAdd"
               @change="handleChange($event, 'margin.value.marginBottom')"
               @blur="handleBlur('margin.visible.marginBottom')"
        >
      </div>
      <div class="vs-layout-handle vs-handle-left">
        <svg fill="currentColor" preserveAspectRatio="xMidYMid meet" width="12px" height="12px" viewBox="0 0 1566 1024"
             class="ve-svgicon vs-handle-icon" style="vertical-align: middle;"
        >
          <path
            d="M445.44 291.84h675.84v153.6H445.44zM220.16 578.56h1126.4v153.6H220.16zM0 870.4h1566.72v153.6H0zM670.72 0h230.4v153.6h-230.4z"
          />
        </svg>
      </div>
      <div class="vs-inline-input vs-layout-input-left ve-highlight">
        <span v-if="!margin.visible.marginLeft" class="vs-inline-input-text" @click.stop="handleContentEdit('margin.visible.marginLeft', 'marginLeft')">{{ margin.value.marginLeft }}</span>
        <input v-else ref="marginLeft" class="vs-inline-input-input" type="text" :placeholder="margin.value.marginLeft +'px'"
               :value="margin.value.marginLeft + 'px'"
               @keydown.down="handleMin"
               @keydown.up="handleAdd"
               @change="handleChange($event, 'margin.value.marginLeft')"
               @blur="handleBlur('margin.visible.marginLeft')"
        >
      </div>
    </div>
    <div class="vs-layout-box vs-padding-box">
      <div class="vs-layout-handle vs-handle-top">
        <svg fill="currentColor" preserveAspectRatio="xMidYMid meet" width="12px" height="12px" viewBox="0 0 1566 1024"
             class="ve-svgicon vs-handle-icon" style="vertical-align: middle;"
        >
          <path
            d="M445.44 291.84h675.84v153.6H445.44zM220.16 578.56h1126.4v153.6H220.16zM0 870.4h1566.72v153.6H0zM670.72 0h230.4v153.6h-230.4z"
          />
        </svg>
      </div>
      <div class="vs-inline-input vs-layout-input-top ve-highlight">
        <span v-if="!padding.visible.paddingTop" class="vs-inline-input-text" @click.stop="handleContentEdit('padding.visible.paddingTop', 'paddingTop')">{{ padding.value.paddingTop }}</span>
        <input v-else ref="paddingValue" class="vs-inline-input-input" type="text" :placeholder="padding.value.paddingTop +'px'"
               :value="padding.value.paddingTop + 'px'"
               @keydown.down="handleMin"
               @keydown.up="handleAdd"
               @change="handleChange($event, 'padding.value.paddingTop')"
               @blur="handleBlur('padding.visible.paddingTop')"
        >
      </div>
      <div class="vs-layout-handle vs-handle-right">
        <svg fill="currentColor" preserveAspectRatio="xMidYMid meet" width="12px" height="12px" viewBox="0 0 1566 1024"
             class="ve-svgicon vs-handle-icon" style="vertical-align: middle;"
        >
          <path
            d="M445.44 291.84h675.84v153.6H445.44zM220.16 578.56h1126.4v153.6H220.16zM0 870.4h1566.72v153.6H0zM670.72 0h230.4v153.6h-230.4z"
          />
        </svg>
      </div>
      <div class="vs-inline-input vs-layout-input-right ve-highlight">
        <span v-if="!padding.visible.paddingRight" class="vs-inline-input-text" @click.stop="handleContentEdit('padding.visible.paddingRight', 'paddingRight')">{{ padding.value.paddingRight }}</span>
        <input v-else ref="paddingValue" class="vs-inline-input-input" type="text" :placeholder="padding.value.paddingRight +'px'"
               :value="padding.value.paddingRight + 'px'"
               @keydown.down="handleMin"
               @keydown.up="handleAdd"
               @change="handleChange($event, 'padding.value.paddingRight')"
               @blur="handleBlur('padding.visible.paddingRight')"
        >
      </div>
      <div class="vs-layout-handle vs-handle-bottom" @click="handleAdd">
        <span class="vs-handle-inscription">2</span>
        <svg fill="currentColor"
             preserveAspectRatio="xMidYMid meet"
             width="12px"
             height="12px"
             viewBox="0 0 1566 1024"
             class="ve-svgicon vs-handle-icon"
             style="vertical-align: middle;"
        >
          <path
            d="M445.44 291.84h675.84v153.6H445.44zM220.16 578.56h1126.4v153.6H220.16zM0 870.4h1566.72v153.6H0zM670.72 0h230.4v153.6h-230.4z"
          />
        </svg>
      </div>
      <div class="vs-inline-input vs-layout-input-bottom ve-highlight">
        <span v-if="!padding.visible.paddingBottom" class="vs-inline-input-text" @click.stop="handleContentEdit('padding.visible.paddingBottom', 'paddingBottom')">{{ padding.value.paddingBottom }}</span>
        <input v-else ref="paddingValue" class="vs-inline-input-input" type="text" :placeholder="padding.value.paddingBottom +'px'"
               :value="padding.padding.paddingBottom + 'px'"
               @keydown.down="handleMin"
               @keydown.up="handleAdd"
               @change="handleChange($event, 'padding.value.paddingBottom')"
               @blur="handleBlur('padding.visible.paddingBottom')"
        >
      </div>
      <div class="vs-layout-handle vs-handle-left">
        <svg fill="currentColor" preserveAspectRatio="xMidYMid meet" width="12px" height="12px" viewBox="0 0 1566 1024"
             class="ve-svgicon vs-handle-icon" style="vertical-align: middle;"
        >
          <path
            d="M445.44 291.84h675.84v153.6H445.44zM220.16 578.56h1126.4v153.6H220.16zM0 870.4h1566.72v153.6H0zM670.72 0h230.4v153.6h-230.4z"
          />
        </svg>
      </div>
      <div class="vs-inline-input vs-layout-input-left ve-highlight">
        <span v-if="!padding.visible.paddingLeft" class="vs-inline-input-text" @click.stop="handleContentEdit('padding.visible.paddingLeft', 'paddingLeft')">{{ padding.value.paddingLeft }}</span>
        <input v-else ref="paddingValue" class="vs-inline-input-input" type="text" :placeholder="padding.value.paddingLeft +'px'"
               :value="padding.value.paddingLeft + 'px'"
               @keydown.down="handleMin"
               @keydown.up="handleAdd"
               @change="handleChange($event, 'padding.value.paddingLeft')"
               @blur="handleBlur('padding.visible.paddingLeft')"
        >
      </div>
    </div>
    <div class="ve-icon-button ve-icon-button-default vs-margin-auto ve-active" @click.stop="handleMarginAuto">
      <svg fill="currentColor"
           preserveAspectRatio="xMidYMid meet"
           width="20"
           height="20"
           viewBox="0 0 1024 1024"
           class="ve-svgicon"
           style="vertical-align: middle;"
      >
        <path d="M486.4 102.4l51.2 0 0 409.6-51.2 0 0-409.6Z" />
        <path d="M486.4 819.2l51.2 0 0 102.4-51.2 0 0-102.4Z" />
        <path d="M307.2 204.8l409.6 0 0 256-409.6 0 0-256Z" />
        <path
          d="M768 563.2l0 204.8L256 768l0-204.8L768 563.2M819.2 512 204.8 512l0 307.2 614.4 0L819.2 512 819.2 512z"
        />
      </svg>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import _ from 'lodash'

export default {
  props: {
    classNames: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      marginBottom: false,
      value: 10,

      margin: {
        value: {
          marginLeft: 'auto',
          marginRight: 'auto',
          marginTop: 0,
          marginBottom: 0
        },
        visible: {
          marginLeft: false,
          marginRight: false,
          marginTop: false,
          marginBottom: false
        }
      },
      padding: {
        value: {
          paddingLeft: 0,
          paddingRight: 0,
          paddingTop: 0,
          paddingBottom: 0
        },
        visible: {
          paddingLeft: false,
          paddingRight: false,
          paddingTop: false,
          paddingBottom: false
        }
      }
    }
  },
  methods: {
    handleContentEdit(keyChain, ref) {
      const visible = _.get(this, keyChain)
      _.set(this, keyChain, !visible)
      this.$nextTick(() => {
        this.$refs[ref] && this.$refs[ref].focus()
      })
    },
    handleAdd(event) {
      debugger
      this.value += 1
    },
    handleMin() {
      this.value -= 1
      console.log(this.value)
    },
    handleChange(event, keyChain) {
      const { value } = event.target
      _.set(this, keyChain, value)
      console.log(event, keyChain)
    },
    handleBlur(keyChain) {
      const visible = _.get(this, keyChain)
      _.set(this, keyChain, !visible)
    },
    handleMarginAuto() {
      this.margin.value.marginLeft = 'auto'
      this.margin.value.marginRight = 'auto'
    }
  }
}
</script>

<style scoped lang="scss">

  .vs-style-layout {
    .vs-style-layout-padding-margin {
      width: 190px;
      height: 107px;
      margin: 25px 32px;
      position: relative;
      .vs-layout-box {
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        position: absolute;
        .vs-inline-input {
          position: absolute;
          width: 36px;
          height: 16px;
          > .vs-inline-input-text {
            display: block;
            font-family: PingFang SC, Hiragino Sans GB, Microsoft YaHei, Helvetica, Arial, sans-serif;
            color: rgba(0, 0, 0, .6);
            font-size: 12px;
            line-height: 16px;
            opacity: .6;
            cursor: text
          }
          > .vs-inline-input-text {
            &:hover {
              opacity: 1;
              text-decoration: underline
            }
          }
          > .vs-inline-input-input {
            font-family: PingFang SC, Hiragino Sans GB, Microsoft YaHei, Helvetica, Arial, sans-serif;
            color: rgba(0, 0, 0, .6);
            font-size: 12px;
            border: none;
            background: rgba(0, 0, 0, .5);
            border-radius: 3px;
            width: 100%;
            height: 16px;
            line-height: 16px;
            padding: 0 2px;
            box-sizing: border-box;
            outline: none;
          }
          &.vs-layout-input-bottom, &.vs-layout-input-top{
            left: 50%;
            margin-left: -18px;
            text-align: center;
            .vs-inline-input-input {
              text-align: center
            }
          }
          &.vs-layout-input-left, &.vs-layout-input-right {
            top: 50%;
            margin-top: -8px;
          }
          &.vs-layout-input-top {
            top: -17px;
          }

          &.vs-layout-input-bottom {
            bottom: -17px
          }

          &.vs-layout-input-left {
            left: -38px;
            text-align: right;
            .vs-inline-input-input {
              text-align: right
            }
          }

          &.vs-layout-input-right {
            right: -38px;
          }
        }
        .vs-layout-handle {
          position: absolute;
          display: block;
          font-size: 0;
          border: 14px solid transparent;
          box-sizing: border-box;
          opacity: .8;
          .vs-handle-icon {
            position: absolute;
            opacity: .6;
            max-width: none;
            max-height: none;
            pointer-events: none
          }
          &.vs-handle-top {
            top: 0;
            border-top-color: rgba(0, 0, 0, .3);
            border-bottom-width: 0;
            .vs-handle-icon {
              bottom: 1px;
              left: 50%;
              transform: translateX(-50%)
            }
          }
          &.vs-handle-right {
            right: 0;
            border-right-color: rgba(0, 0, 0, .3);
            border-left-width: 0;
            .vs-handle-icon {
              left: 1px;
              top: 50%;
              transform: translateY(-50%) rotate(90deg);
            }
          }
          &.vs-handle-bottom {
            bottom: 0;
            border-bottom-color: rgba(0, 0, 0, .3);
            border-top-width: 0;
            .vs-handle-icon {
              top: 1px;
              left: 50%;
              transform: translateX(-50%) rotate(180deg)
            }
            .vs-handle-inscription {
              position: absolute;
              left: 3px;
              top: 1px;
              font-size: 12px;
              text-transform: uppercase;
              transform-origin: left;
              transform: scale(.6);
              pointer-events: none;
            }
          }
          &.vs-handle-left {
            left: 0;
            border-left-color: rgba(0, 0, 0, .3);
            border-right-width: 0;
            .vs-handle-icon {
              right: 1px;
              top: 50%;
              transform: translateY(-50%) rotate(-90deg);
            }
          }
          &.vs-handle-bottom, &.vs-handle-top {
            height: 0;
            left: 2px;
            right: 2px;
            cursor: row-resize
          }
          &.vs-handle-left, &.vs-handle-right {
            width: 0;
            bottom: 2px;
            top: 2px;
            cursor: col-resize
          }
          &:hover {
            opacity: 1
          }
        }
        &.vs-padding-box {
          top: 18px;
          bottom: 18px;
          left: 18px;
          right: 18px;
          .vs-handle-icon {
            > path {
              transform-origin: center;
              transform: rotate(180deg);
            }
          }
          .vs-inline-input {
            &.vs-layout-input-top {
              top: 16px;
            }
            &.vs-layout-input-bottom {
              bottom: 20px;
            }
            &.vs-layout-input-left {
              left: 16px;
              text-align: left;
              .vs-inline-input-input {
                text-align: left;
              }
            }
            &.vs-layout-input-right {
              right: 16px;
              text-align: right;
              .vs-inline-input-input {
                text-align: right
              }
            }
          }
        }
      }
      .vs-margin-auto {
        position: absolute;
        bottom: 0;
        right: -35px;
        cursor: pointer;
        padding: 2px;
        border-radius: 2px;
        background: hsla(0, 0%, 100%, .3);
        &.ve-active {
          background: rgba(0, 0, 0, .4)
        }
      }
      .ve-highlight {
        .vs-inline-input-text {
          font-weight: 700;
          color: var(--color-brand, #006cff) !important
        }
      }
    }
  }
</style>
