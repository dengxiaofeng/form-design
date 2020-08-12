<template>
  <div v-if="visible" data-vueroot>
    <div class="engine-unxcore-dialog-mask" :class="closed ? 'engine-unxcore-dialog-mask-hidden': ''" />
    <div class="engine-unxcore-dialog-wrap" :class="center ? 'vertical-center-dialog': ''" role="dialog" :style="{display: closed ? 'none': ''}">
      <div role="document" class="engine-unxcore-dialog" :style="{width: width}">
        <div class="engine-unxcore-dialog-content">
          <button v-if="showClose" class="engine-unxcore-dialog-close" @click.prevent.stop="handleClose">
            <span class="engine-unxcore-dialog-close-x" />
          </button>
          <div class="engine-unxcore-dialog-header">
            <div class="engine-unxcore-dialog-title">
              {{ title }}
            </div>
          </div>
          <div class="engine-unxcore-dialog-body">
            <slot />
          </div>
          <div class="engine-unxcore-dialog-footer">
            <div v-if="!$slots.foot">
              <button class="engine-uxcore-button kuma-button engine-unxcore-button kuma-button-secondary engine-uxcore-button kuma-button-sm" @click.prevent.stop="handleClose">
                取消
              </button>
              <button class="engine-uxcore-button kuma-button engine-unxcore-button kuma-button-primary engine-uxcore-button kuma-button-sm" @click.prevent.stop="handleSubmit">
                确定
              </button>
            </div>
            <div /><slot name="foot" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  props: {
    center: {
      type: Boolean,
      default: false
    },
    visible: {
      type: Boolean,
      default: false
    },
    showClose: {
      type: Boolean,
      default: true
    },
    closeOnPressEscape: {
      type: Boolean,
      default: true
    },
    appendToBody: {
      type: Boolean,
      default: true
    },
    title: {
      type: String,
      default: ''
    },

    width: String,
    beforeClose: Function,
    destroyOnClose: Boolean
  },
  data() {
    return {
      closed: false,
      rendered: false
    }
  },
  watch: {
    visible(val) {
      console.log('.....dialog----', val)
      debugger
      if (val) {
        this.closed = false
        if (this.appendToBody) {
          document.body.appendChild(this.$el)
        }
      } else {
        this.closed = true
        this.handleClose()
        if (!this.closed) this.$emit('close')
      }
    }
  },
  mounted() {
    if (this.visible) {
      this.rendered = true
      this.closed = false
      if (this.appendToBody) {
        document.body.appendChild(this.$el)
      }
    }
  },
  destroyed() {
    if (this.appendToBody && this.$el && this.$el.parentNode) {
      this.$el.parentNode.removeChild(this.$el)
    }
  },
  methods: {
    handleSubmit(event) {
      this.$emit('ok')
      this.handleClose(event)
    },
    handleClose(event) {
      if (typeof this.beforeClose === 'function') {
        this.beforeClose(this.hide)
      } else {
        this.hide()
      }
    },
    hide(event) {
      this.closed = true
      this.$emit('close', event, this.closed)
    }
  }
}
</script>

<style scoped lang="scss">
  .engine-unxcore-dialog-mask {
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    background-color: #000;
    background-color: rgba(0, 0, 0, 0.4);
    height: 100%;
    z-index: 1000;
    filter: alpha(opacity=30);
    &-hidden {
      display: none;
    }
  }
  .engine-unxcore-dialog-wrap {
    position: fixed;
    overflow: auto;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1000;
    outline: 0 none;
    .engine-unxcore-dialog {
      position: relative;
      top: 100px;
      width: auto;
      margin: 0 auto;
      .engine-unxcore-dialog-content {
        position: relative;
        background-color: #fff;
        box-shadow: 0 4px 15px 0 rgba(0, 0, 0, 0.15);
        outline: 0;
        border-radius: 6px;
        overflow: hidden;
        .engine-unxcore-dialog-close {
          position: absolute;
          right: 13px;
          top: 8px;
          background: none;
          border: 0 none;
          font-size: 16px;
          cursor: pointer;
          outline: none;
          color: rgba(0, 0, 0, 0.6);
          .engine-unxcore-dialog-close-x {
            font-family: unxcore!important;
            font-style: normal;
            -webkit-font-smoothing: antialiased;
            -webkit-text-stroke-width: 0.2px;
            -moz-osx-font-smoothing: grayscale;
            color: rgba(31, 56, 88, 0.4);
            font-size: 12px;
            &:after {
              content: "\E6B0";
            }
          }
        }
        .engine-unxcore-dialog-header {
          .engine-unxcore-dialog-title {
            padding: 20px 0px 10px;
            font-size: 16px;
            color: rgba(0, 0, 0, 0.8);
            text-indent: 24px;
          }
        }
        .engine-unxcore-dialog-body {
          padding: 16px 24px 32px;
          font-size: 12px;
          line-height: 1.5;
        }
        .engine-unxcore-dialog-footer {
          padding: 16px 16px 16px 24px;
          text-align: right;
          border-top: 1px solid rgba(31, 56, 88, 0.1);
          button + button {
            margin-left: 8px;
            margin-bottom: 0;
          }

        }
      }
    }
    &.vertical-center-dialog {
      display: flex;
      align-items: center;
      justify-content: center;
      .engine-unxcore-dialog {
        top: 0;
      }
    }
  }
</style>
