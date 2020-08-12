<template>
  <div class="ve-action-pane" :class="className">
    <div style="height: 100%">
      <el-tabs>
        <el-tab-pane label="页面JS" />
      </el-tabs>
      <editor ref="codeEditor" :editor-config="editorConfig" :custom-style="style" :value="value" />
      <div class="ve-action-pane-actions">
        <div class="ve-icon-button ve-icon-button-default" @click.stop="handleClose">
          <svg fill="currentColor"
               preserveAspectRatio="xMidYMid meet"
               width="16" height="16"
               viewBox="0 0 1024 1024"
               class="ve-svgicon"
               style="vertical-align: middle;" data-spm-anchor-id="0.0.0.i70.27824098JWoWry"
          >
            <path d="M556.8 512l272-272c12.8-12.8 12.8-32 0-44.8-12.8-12.8-32-12.8-44.8 0L512 467.2 240 195.2c-12.8-12.8-32-12.8-44.8 0-12.8 12.8-12.8 32 0 44.8l272 272-272 272c-12.8 12.8-12.8 32 0 44.8 12.8 12.8 32 12.8 44.8 0l272-272 272 272c12.8 12.8 32 12.8 44.8 0 12.8-12.8 12.8-32 0-44.8L556.8 512z" /></svg>
        </div>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
import Editor from '../editor'

export default {
  components: {
    Editor
  },
  props: {
    className: {
      type: String,
      default: ''
    },
    value: {
      type: String,
      default: ''
    },
    enableGlobalJS: {
      type: Boolean,
      default: true
    },
    enableHeaderTip: {
      type: Object,
      default() {
        return {}
      }
    },
    enableVsCodeEdit: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      editorConfig: {
        className: 've-action-manaco-edito',
        language: 'javascript'
      },
      style: {
        width: '100%',
        height: 'calc(100% - 40px)',
        overflow: 'hidden'
      }
    }
  },
  created() {
    this.editorMap = {}
  },
  mounted() {
    this.$nextTick(() => {
      this.$refs.codeEditor.initMonaco()
    })
  },
  methods: {
    saveEditor(value, key) {
      this.editorMap[key] = value
    },
    handleClose() {
      this.$emit('close')
    }
  }
}
</script>

<style lang="scss" scoped>
  .ve-action-pane {
    height: 100%;
    overflow: hidden;
    background: #fff;
    border-top: 1px solid var(--color-line-darken, rgba(31, 56, 88, 0.1));
    .ve-action-pane-actions {
      position: absolute;
      right: 8px;
      top: 9px;
      display: flex;
      align-items: center;
    }
    .ve-icon-button.ve-icon-button-default {
      max-height: 100%;
      overflow: hidden;
      opacity: 0.6;
    }
  }
</style>
