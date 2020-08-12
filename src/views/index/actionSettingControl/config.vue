<template>
  <div class="ve-action-setting-config">
    <div class="ve-action-setting-code ">
      <div class="ve-action-setting-title">
        动作编写
      </div>
      <editor ref="editor" :editor-config="editorConfig" custom-style="width: 600px; height: 394px;" :value="eventConfig.source" />
      <div class="ve-action-setting-error" />
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
import Editor from '@/components/editor'

export default {
  components: {
    Editor
  },
  props: {
    eventConfig: Object
  },
  data() {
    return {
      editorConfig: {
        language: 'javascript'
      },
      uuid: '',
      actionType: '',
      selectedAction: '',
      searchKey: '',
      newActionName: '',
      code: '',
      params: {},
      paramsStr: '',
      paramsError: '',
      codeError: ''
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.$refs.editor.initMonaco()
      console.log(this.eventConfig.source)
    })
  },
  methods: {
    onCodeChange() {

    }
  }
}
</script>

<style lang="scss" type="text/scss">
  .ve-action-setting-config {
    margin-left: 12px;
    flex-grow: 1;
    min-height: 422px;
    .ve-action-setting-title {
      font-weight: 700;
      margin-bottom: 8px;
      color: rgba(0,0,0,.8);
      display: flex;
      align-items: center;
    }
    .ve-action-setting-error {
      position: absolute;
      color: red;
      margin-top: 2px;
    }
  }
</style>
