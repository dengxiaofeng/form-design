<template>
  <div class="ve-code-control ve-outline" :style="customStyle" :class="className">
    <span v-if="!editor" class="loading">编辑器初始化中...</span>
    <div :id="editorId" class="monaco-editor-container" style="width: 100%;height: 100%" />
  </div>
</template>
<script type="text/ecmascript-6">
import _ from 'lodash'

let id = 0
function newId(str) {
  const index = ++id
  return str + index
}
const noop = function () {

}
const editConfig = {
  base: 'vs',
  inherit: !0,
  rules: [{
    background: '0E1013',
    foreground: 'dddddd'
  }, {
    token: 'string.value.json',
    foreground: 'b4e98c'
  }, {
    token: 'string.key.json',
    foreground: 'dddddd'
  }, {
    token: 'number.json',
    foreground: '37BFFF'
  }],
  colors: {
    'editorCursor.foreground': '#2483FF',
    'editor.lineHighlightBackground': '#ffffff',
    'editorLineNumber.foreground': '#576369',
    'editor.selectionBackground': '#2483FF60',
    'editor.inactiveSelectionBackground': '#ffffff',
    'editorBracketMatch.background': '#ffffff',
    'editorBracketMatch.border': '#ffffff'
  }
}

const editorStyleConfig = {
  language: 'json',
  autoIndent: !0,
  contextmenu: false,
  useTabStops: !0,
  wordBasedSuggestions: !0,
  formatOnPaste: !0,
  quickSuggestions: !0,
  suggestOnTriggerCharacters: !0,
  fontFamily: 'Menlo, Monaco, Courier New, monospace',
  renderIndentGuides: !0,
  fontSize: 12,
  folding: !0,
  scrollbar: {
    verticalScrollbarSize: 5
  },
  wordWrap: 'off',
  wrappingIndent: 2,
  minimap: {
    enabled: !1
  },
  defaultSuggestion: false,
  enableSuggestion: false,
  checkSyntax: false
}
let instanceMonaco = void 0
const lanuage = {
  zh_CN: 'zh-cn'
}
const loadMonaco = function () {
  debugger
  //
  return instanceMonaco || (instanceMonaco = new Promise(((resolve, reject) => {
    window.$loadMonaco && window.$loadMonaco(res => {
      lanuage.zh_CN && res.config({
        'vs/nls': {
          availableLanguages: {
            '*': lanuage.zh_CN
          }
        }
      })

      res(['vs/editor/editor.main'], () => {
        const { monaco } = window
        return _.isObject(monaco) && _.isObject(monaco.editor) ? void (monaco.editor.defineTheme('datavTheme', editConfig), resolve(monaco)) : reject()
      })
    })
  })), instanceMonaco)
}
const editorMethod = function (option) {
  debugger
  const {
    monaco, value, editorConfig, containerId, enableReadOnly
  } = option
  const obj = {
    value, ...editorStyleConfig, ...editorConfig, readOnly: !!enableReadOnly
  }

  const element = document.getElementById(containerId)
  if (element) {
    const editor = monaco && monaco.editor && monaco.editor.create(element, obj)
    return editor.updateOptions({
      tabSize: 2
    }), editor
  }
}

export default {
  props: {
    customStyle: {
      type: [Object, String],
      default() {
        return {}
      }
    },
    editorConfig: {
      type: Object,
      default() {
        return {}
      }
    },
    value: {
      type: String,
      default: ''
    },
    setMonaco: {
      type: Function,
      default() {
        return noop
      }
    },
    getEditor: {
      type: Function,
      default() {
        return noop
      }
    },
    enableReadOnly: {
      type: Boolean,
      default: false
    },
    onChange: {
      type: Function,
      default() {
        return noop
      }
    },
    handlerChange: {
      type: Function,
      default() {
        return noop
      }
    },
    handlerBlur: {
      type: Function,
      default() {
        return noop
      }
    },
    className: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      editorId: newId('__data__code__editor__'),
      editor: null
    }
  },
  watch: {
    value(newVal, oldVal) {
      debugger
      if (newVal !== oldVal) {
        this.editor ? (this.editor.setValue(newVal), this.formatCode()) : this.newValue = newVal
      }
    }
  },
  mounted() {
    setTimeout(() => {
      this.initMonaco()
    }, 300)
  },
  beforeDestroy() {
    const wrapper = document.getElementById(this.editorId)
    wrapper && wrapper.parentNode.removeChild(wrapper)
    this.editor = null
  },
  methods: {
    initMonaco() {
      debugger
     //this.editor = null
      const codeConfig = void 0 === this.editorConfig ? {} : this.editorConfig
      const {
        value, setMonaco, getEditor, enableReadOnly
      } = this
      loadMonaco().then(res => {
        let _value_ = value
        void 0 !== this.newValue && (_value_ = this.newValue, this.newValue = void 0)
        _.isFunction(setMonaco) && setMonaco(res)
        this.editor = editorMethod({
          monaco: res,
          value: _value_,
          editorConfig: codeConfig,
          containerId: this.editorId,
          enableReadOnly
        })
        this.editor && (
          setTimeout(() => {
            this.formatCode()
          }, 300),
          this.editor.onDidBlurEditor(this.editorBlurHandler),
          this.editor.onDidChangeModelContent(this.editorChangeHandler),
          _.isFunction(getEditor) && getEditor(this.editor)
        )
      })
    },
    formatCode() {
      this.editor && this.editor.getAction('editor.action.formatDocument').run()
    },
    editorChangeHandler() {
      // this.onChange && this.onChange(this.getEditorContent())
      this.handlerChange && this.handlerChange(this.getEditorContent())
    },
    editorBlurHandler() {
      this.formatCode()
      this.handlerBlur && this.handlerBlur(this.getEditorContent())
    },
    getEditorContent() {
      let content = ''
      if ((_.isObject(this.editor) && _.isFunction(this.editor.getModel))) {
        const model = this.editor.getModel()
        _.isObject(model) && _.isFunction(model.getValue) && (content = model.getValue())
      }
      return content
    }
  }

}
</script>

<style lang="scss">
  .ve-code-control {
    .loading {
      position: absolute;
      width: 100%;
      text-align: center;
      top: 47%;
      color: var(--color-text,rgba(0,0,0,.6));
      background-color: transparent;
    }
  }
</style>
