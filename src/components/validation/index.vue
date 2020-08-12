<template>
  <div class="validation">
    <div v-for="(item, index) in data" :key="index" class="validation-ruleitem">
      <div class="ruleitem-body">
        {{ item.description }}
      </div>
      <div class="ruleitem-action">
        <el-popover placement="left"
                    width="240"
                    trigger="click"
                    @show="handleShow(item)"
        >
          <div class="stage-box">
            <div class="stage">
              <div class="state-content">
                <Field title="启用">
                  <el-switch v-model="item.enable" @change="updateParams($event, item)" />
                </Field>
                <template v-if="item.type !== 'required' && item.type !== 'customValidate'">
                  <Field :title="item.description">
                    <TextInput ref="pattern" @change="handlerPattern($event, item)" />
                  </Field>
                </template>

                <Block v-if="item.type === 'customValidate'" title="自定义函数">
                  <div id="editorValidate" class="editorValidate" style="height: 100px;" />
                </Block>
                <Field title="错误提示">
                  <TextInput v-model="item.message" @change="handlerMessage($event, item)" />
                </Field>
              </div>
            </div>
          </div>

          <div slot="reference" class="icon-button icon-button-default action-edit">
            <svg
              fill="currentColor"
              preserveAspectRatio="xMidYMid meet"
              width="16"
              height="16"
              viewBox="0 0 1024 1024"
              class="ve-svgicon"
              style="vertical-align: middle;"
            ><path d="M707.872 289.6l-256.32 256.32 56.576 33.952 33.92 56.576 256.32-256.32-90.496-90.528z m45.28-45.248l90.496 90.496 22.624-22.624a32 32 0 0 0 0-45.248L821.024 221.76a32 32 0 0 0-45.248 0l-22.624 22.624z m-346.88 346.848l-15.168 15.2v90.496h90.496l15.2-15.2-33.92-56.544-56.576-33.952zM843.68 153.856l90.496 90.496a64 64 0 0 1 0 90.496L508.16 760.896h-181.024v-181.024L753.152 153.856a64 64 0 0 1 90.496 0zM576 96a32 32 0 0 1-32 32H160c-17.696 0-32 14.208-32 31.744v704.512c0 17.184 14.336 31.744 32 31.744h704c17.696 0 32-14.208 32-31.744V608a32 32 0 0 1 64 0v287.84C960 931.264 931.2 960 896.288 960H127.68C92.512 960 64 931.296 64 895.84V128.16C64 92.736 92.8 64 127.712 64H544a32 32 0 0 1 32 32z" data-spm-anchor-id="0.0.0.i62.5fa240981c24HZ" />
            </svg>
          </div>
        </el-popover>
        <CheckBox v-model="item.enable" @change="handleChange($event, item)" />
      </div>
    </div>
  </div>
</template>

<script type="application/ecmascript">
import Field from '@/components/field'
import TextInput from '@/components/text'
import CheckBox from '@/components/checkbox'
import Block from '@/components/block'
// import loadMonaco from '@/utils/loadMonaco'
import _ from 'lodash'

export default {
  components: {
    Field,
    TextInput,
    CheckBox,
    Block
  },
  props: {
    data: {
      type: Array,
      default: []
    }
  },
  methods: {
    handleChange(enable, item) {
      const cloneData = _.clone(this.data)
      const ret = cloneData.map(k => {
        console.log(k)
        debugger
        if (k.type === item.type) {
          k.enable = enable
          k.param.message = item.param.message
          return k
        }
        return k
      })

      this.$emit('change', ret)
    },
    updateParams(enable, item) {
      const cloneItem = _.clone(item)
      if (cloneItem.type === 'customValidate') {
        cloneItem.param.handler = this.jsValidateCode.getValue()
      }
      this.handleChange(enable, cloneItem)
    },
    handlerPattern(val, item) {
      const cloneItem = _.clone(item)
      cloneItem.param.min = val
      this.handleChange(item.enable, cloneItem)
    },
    handlerMessage(message, item) {
      const cloneItem = _.clone(item)
      cloneItem.param.message = message
      this.handleChange(item.enable, cloneItem)
    },
    initCode(code) {
      // loadMonaco(val => {
      //   monaco = val
      //   this.setEditorValue('editorValidate', code)
      // })
    },
    setEditorValue(id, codeStr) {
      if (this.jsValidateCode) {
        this.jsValidateCode.setValue(codeStr)
      } else {
        this.jsValidateCode = monaco.editor.create(document.getElementById(id), {
          value: codeStr,
          theme: 'vs',
          language: 'javascript',
          automaticLayout: true,
          minimap: {
            enabled: !1
          },
          formatOnType: !0,
          lineHeight: 15,
          lineNumbersMinChars: 3,
          lineDecorationsWidth: 2,
          roundedSelection: !1,
          scrollBeyondLastLine: !1,
          scrollbar: {
            verticalScrollbarSize: 2,
            horizontalScrollbarSize: 2,
            arrowSize: 0
          },
          contextmenu: !1,
          formatOnPaste: !0,
          quickSuggestions: !1,
          fixedOverflowWidgets: !0,
          wordBasedSuggestions: !1,
          snippetSuggestions: !1,
          fontFamily: 'Menlo-Regular, Monaco, Menlo, Consolas, "Ubuntu Mono", monospace'
        })
      }
    },
    handleShow(item) {
      if (item.type === 'customValidate') {
        this.initCode(item.param.handler)
      }
    }
  }
}
</script>

<style type="text/scss" lang="scss">
.validation {
  .validation-ruleitem {
    border-top: 1px solid #fff;
    position: relative;
    display: flex;
    align-items: center;
    &:first-child {
      border-top: 1px solid transparent;
    }
  }
  .ruleitem-body {
    height: 30px;
    line-height: 30px;
    flex: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    padding-left: 10px;
    color: rgba(0,0,0,.6);
  }
  .ruleitem-action {
    width: 50px;
    > * {
      margin-left: 5px;
    }
  }
  .icon-button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    cursor: pointer;
  }
  .icon-button.icon-button-default {
    max-height: 100%;
    overflow: hidden;
    opacity: 0.6;
  }
}
</style>
