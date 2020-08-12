<script type="text/ecmascript-6">
import BlockField from '@/components/block-field'
// import loadMonaco from '@/utils/loadMonaco'
import Editor from '@/components/editor'
import Button from '@/components/button/button'
const defaultConfig = {
  willFetch: "function willFetch(vars, config) {\n  // 通过 vars.data 可以更改查询参数"+ "\n  // 通过 config.header 可以更改 header" +  "\n  // 通过 config.url 可以更改  url"  + "\n  console.log(vars, config); // 可以查看还有哪些参数可以修改。" + "\n}",
  fit: "function fit(response) {\n  const content = (response.content !== undefined) ? response.content : response;\n  const error = {\n    message: response.errorMsg ||\n      (response.errors && response.errors[0] && response.errors[0].msg) ||\n      response.content || '" + "远程数据源请求出错，success is false" + "',\n  };\n  let success = true;\n  if (response.success !== undefined) {\n    success = response.success;\n  } else if (response.hasError !== undefined) {\n    success = !response.hasError;\n  }\n  return {\n    content,\n    success,\n    error,\n  };\n}",
  onError: "function onError(error, ctx){\n  console.log(error);\n  // 可以在这里做弹框提示等操作"  + "  \n}"
}
export default {
  components: {
    BlockField,
    Editor,
    Button
  },
  props: {
    dataSource: {
      type: Object,
      default() {
        return {}
      }
    },
    config: {
      type: Object,
      default() {
        return {}
      }
    },
    onSave: {
      type: Function,
      default() {
        return {}
      }
    },
    onCancel: {
      type: Function,
      default() {
        return {}
      }
    },
    enableHeaderTip: {
      type: Object,
      default() {
        return {}
      }
    },
    enableErrorTip: {
      type: Boolean,
      default: !0
    }
  },
  data() {
    return {
      editorConfig: {
        language: 'javascript'
      },
      fetchConfig: {
        willFetch: this.config.willFetch.source,
        fit: this.config.fit.source,
        onError: this.config.onError.source
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      // this.$refs.willFetchEditor.initMonaco()
      // this.$refs.fitEditor.initMonaco()
      // this.$refs.errorEditor.initMonaco()
    })
  },
  methods: {
    onHandlerSave() {

    },
    renderTitle() {
      return (
        <div class="engine-datapool-form-wrap-title">
          <div>全局配置</div>
          <div class="engine-datapool-form-button-group">
            <Button type="primary" size="sm" style="margin-right: 8px;" onClick={() => this.onSave}>保 存</Button>
            <Button type="outline" size="sm" onClick={() => this.onCancel}>取 消</Button>
          </div>
        </div>
      )
    },
    importDefaultValue(key) {
      this.handleItemChange(key, defaultConfig[key])
    },
    handleItemChange(key, value) {
      const config = this.fetchConfig
      config[key] = value
      this.config = config
    }
  },
  render() {
    return (
      <div class="engine-datapool-form-wrap">
        {
          this.renderTitle()
        }
        <div class="engine-datapool-form engine-datapool-global-config-form">
            <BlockField class-nams="engine-datapool-global-config-field">
              <template slot="header">
                <span class="ve-field-title">每个远程请求发送前的处理函数（global willFetch)</span>
              </template>
               <a class="engine-datapool-global-config-form-import" onClick={() => this.importDefaultValue('willFetch')}>导入默认</a>
                <Editor ref="willFetchEditor" custom-style="width: 382px; height: 150px;" editor-config={this.editorConfig} value={this.fetchConfig.willFetch} />
            </BlockField>
            <BlockField class-nams="engine-datapool-global-config-field">
                <template slot="header">
                  <span class="ve-field-title">每个远程请求返回时的数据适配函数（global fit）</span>
                </template>
                 <a class="engine-datapool-global-config-form-import" onClick={() => this.importDefaultValue('fit')}>导入默认</a>
                  <Editor ref="fitEditor" custom-style="width: 382px; height: 150px;" editor-config={this.editorConfig} value={this.fetchConfig.fit} />
            </BlockField>
            <BlockField class-nams="engine-datapool-global-config-field">
              <template slot="header">
                <span class="ve-field-title">每个远程请求发送错误时的处理函数（global onError）</span>
              </template>
               <a class="engine-datapool-global-config-form-import" onClick={() => this.importDefaultValue('onError')}>导入默认</a>
                <Editor ref="errorEditor" custom-style="width: 382px; height: 150px;" editor-config={this.editorConfig} value={this.fetchConfig.onError} />
            </BlockField>
        </div>

      </div>
    )
  }
}
</script>
