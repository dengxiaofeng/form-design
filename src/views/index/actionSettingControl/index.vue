<script type="text/ecmascript-6">
import Dialog from '@/components/dialog'
import Editor from '@/components/editor'
import EventEmitter from 'bcore/event'
import BlockField from '@/components/block-field'
import { getDrawingList } from '@/utils/db'
// import { newPage } from '../page/createPage'
const NEW_ACTION_ID = '__newId__'
const TITLE_ADD_ACTION = '添加新动作'
const CONFIG_CONTAINER_HEIGHT = 394
const CUSTOM_PARAM_HEIGHT = 150

const checkActionName = (rule, value, callback) => {
  const reg = /^[a-zA-Z_][0-9A-Z_a-z]*$/
  if (reg.test(value)) {
    return callback()
  }
  callback(new Error('动作名称必须以字母或 _ 开头，包含数字、字母及 _'))
}

const schemeConfig = getDrawingList()

const category = [{
  id: 'showComponent',
  name: '显示组件',
  params: [{
    name: 'target',
    title: '目标'
  }]
}, {
  id: 'hideComponent',
  name: '隐藏组件',
  params: [{
    name: 'target',
    title: '目标'
  }]
}, {
  id: '__loadRemoteDataPool__',
  name: '请求数据源',
  params: [{
    name: 'variableId',
    title: '数据源名'
  }, {
    defaultValue: '{}',
    name: 'params',
    title: '参数'
  }]
}]
export default {
  components: {
    Editor,
    Dialog,
    BlockField
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    supportTypes: {
      type: Array,
      default() {
        return ['page', 'global', 'custom']
      }
    },
    defaultActionType: {
      type: String,
      default: 'page'
    },
    defaultActionName: {
      type: String,
      default: ''
    },
    supportActionParam: {
      type: Boolean,
      default: false
    },
    defaultCode: {
      type: String,
      default: ''
    },
    extraBuiltinActions: {
      type: Array,
      default() {
        return []
      }
    },
    value: {
      type: [String, Object],
      default: ''
    },
    title: {
      type: String,
      default: 'title'
    },
    handleClose: {
      type: Function
    },
    handleChange: {
      type: Function
    },
    eventEmit: new EventEmitter()
  },
  data() {
    return {
      ACTION_TYPES: {
        builtIn: {
          text: '内置动作',
          value: 'builtIn'
        },
        page: {
          text: '页面 JS',
          value: 'page'
        },
        global: {
          text: '项目 JS',
          value: 'global'
        },
        custom: {
          text: '自定义动作',
          value: 'custom'
        }
      },
      currentIndex: 0,
      actionType: 'page',
      editorConfig: {
        language: 'javascript'
      },
      actionTypes: [],
      uuid: '',
      selectedAction: '',
      searchKey: '',
      newActionName: '',
      code: '',
      params: {},
      paramsStr: '',
      paramsError: '',
      codeError: '',
      rules: {
        newActionName: [
          { required: true, message: '动作名称不能为空', trigger: 'blur' },
          { validate: checkActionName, trigger: 'change' }
        ]
      },
      dialogVisible: this.visible,
      category: [],
      actions: {
        page: {},
        global: {},
        fitGlobal: {}
      },
      templateString: {
        page: '',
        global: '',
        fitGlobal: ''
      }
    }
  },
  computed: {
    paramHeight() {
      return CONFIG_CONTAINER_HEIGHT - 93
    }
  },
  watch: {
    visible(val) {
      this.dialogVisible = val
    }
  },
  created() {
    // this.supportTypes.indexOf(this.actionTypes) < 0 &&
    this.init()
  },
  methods: {
    init() {
      let { defaultActionType } = this
      const value = this.transformValue(this.value)
      console.log('transformValue', value)
      let id = NEW_ACTION_ID
      value.id ? (
        id = value.id
      ) : value.source && (defaultActionType = this.ACTION_TYPES.custom.value)

      this.actionType = this.defaultActionType
      this.newActionName = this.defaultActionName
      this.selectedAction = id
      this.uuid = value.uuid
      this.code = value && value.source || this.defaultCode
      this.params = value && value.params || {}
      this.paramsStr = JSON.stringify(value && value.params || {}, null, '\t')
    },
    onActionTypeChange(type) {
      debugger
      // this.currentIndex = index
      this.actionType = type
      // if(type === this.ACTION_TYPES.builtIn.value) {
      //   this.category = category
      // }
      // if(this.actionType === this.ACTION_TYPES.custom.value) {
      //   this.$nextTick(() => {
      //     this.$refs.codeEditor.initMonaco()
      //   })
      // }
    },
    onCodeChange(code) {
      this.code = code;
      /function\s*[\s\S]+{[\s\S]*}[\s\S]*$/.test(code) ? this.codeError = '' : this.codeError = '代码格式不正确，示例：function main(ctx) {}'
    },
    onDialogOK() {
      debugger
      if (this.save()) {
        const onClose = this.handleClose
        // window.share.event.emit('dockUtils', '123')
        onClose && typeof onClose === 'function' && onClose()
      }
    },
    onDialogCancel() {
      const onClose = this.handleClose
      onClose && typeof onClose === 'function' && onClose()
    },
    getBuiltinActions() {
      const { extraBuiltinActions } = this
      return category.concat(extraBuiltinActions || []).map(item => ({
        id: item.id,
        name: item.title || item.name,
        isSystem: !0,
        params: item.params
      }))
    },

    save() {
      debugger
      const {
        actionType, selectedAction, code, params, newActionName, uuid
      } = this
      if (!this.handleChange || typeof this.handleChange !== 'function') {
        return !0
      }
      let ret = {}
      if (actionType === this.ACTION_TYPES.custom.value) {
        ret = {
          type: 'js',
          source: code,
          error: params
        }
      } else if (actionType === this.ACTION_TYPES.builtIn.value) {
        ret = {
          isSystem: !0,
          id: selectedAction,
          name: '',
          params
        }
      } else if (selectedAction === NEW_ACTION_ID) {
        ret = {
          type: 'actionRef',
          id: newActionName,
          name: newActionName,
          params
        }
      } else {
        ret = {
          type: 'actionRef',
          id: selectedAction,
          name: selectedAction,
          params
        }
      }
      this.handleChange({ uuid, ...ret })
      return !0
    },

    getActionsList(actionType) {

    },
    getActionList(defaultActionType, type) {
      console.log('defaultActionType', defaultActionType)
      if (defaultActionType === this.ACTION_TYPES.custom.value) {
        return [{
          id: NEW_ACTION_ID,
          name: TITLE_ADD_ACTION
        }]
      }

      if (defaultActionType === this.ACTION_TYPES.builtIn.value) {
        return (this.getBuiltinActions() || []).map(item => ({
          id: item.id,
          name: item.name
        }))
      }

      let actionList = (window.action_util.getActionsList(defaultActionType) || []).map(item => ({
        id: item.id,
        name: item.title
      }))

      const ret = []
      if (type) {
        const _type_ = type.toLowerCase()

        actionList = actionList.filter(item => item.name.toLowerCase().indexOf(_type_) >= 0)
      }

      ret.unshift({
        id: NEW_ACTION_ID,
        name: TITLE_ADD_ACTION
      })
      return ret
    },
    transformValue(value) {
      return value ? typeof value === 'string' ? {
        source: value
      } : value : {}
    },
    getBuiltinAction(id) {
      return this.getBuiltinActions().find(item => item.id === id) || {}
    },
    onActionChange(id) {
      debugger
      this.selectedAction = id

      if (this.actionType === this.ACTION_TYPES.builtIn.value) {
        const action = this.getBuiltinAction(id)
        console.log('action', action)
        const { params } = action
        const ret = {}

        params.forEach(item => {
          item.defaultValue && (ret[item.name] = item.defaultValue)
        })
        this.params = ret
        this.paramsStr = '{}'
      } else {
        this.params = {}
        this.paramsStr = '{}'
      }
      this.actionType !== this.ACTION_TYPES.page.value && this.actionType !== this.ACTION_TYPES.global.value || id !== NEW_ACTION_ID || setTimeout(() => {
        console.log('12')
      }, 100)
    },
    onParamsStrChange(str) {
      debugger
      this.paramsStr = str
      let ret = {}
      try {
        ret = JSON.parse(str)
      } catch (e) {
        return this.paramsError = e.message
      }

      this.paramsError = ''
      this.params = ret
    },
    renderSelector() {
      debugger
      const { supportTypes } = this
      supportTypes.indexOf < 0 && supportTypes.push(this.actionType)
      const actionList = this.getActionList(this.actionType) || []
      console.log('actionList', actionList)
      return (
          <div class="ve-action-setting-selector">
            <p class="ve-action-setting-title">响应动作</p>
            <div class="ve-action-setting-selector-inner">
              <ul class="ve-action-setting-selector-category ve-action-setting-ul">
                {
                  supportTypes.slice().map(item => (
                      <li class={this.ACTION_TYPES[item].value === this.actionType ? 'active' : ''}
                          key={this.ACTION_TYPES[item].value}
                          onClick={() => this.onActionTypeChange(this.ACTION_TYPES[item].value)}
                          >
                        {this.ACTION_TYPES[item].text}
                        {
                          this.ACTION_TYPES[item].value === this.actionType && (
                            <div class="ve-icon-button ve-icon-button-default active">
                                <svg fill="currentColor"
                                     preserveAspectRatio="xMidYMid meet"
                                     width="16"
                                     height="16"
                                     viewBox="0 0 1024 1024"
                                     class="ve-svgicon" style="vertical-align: middle;">
                                  <path d="M886.4 240c-12.8-12.8-32-12.8-44.8 0L364.8 716.8l-182.4-182.4c-12.8-12.8-32-12.8-44.8 0-12.8 12.8-12.8 32 0 44.8l204.8 204.8c6.4 6.4 12.8 9.6 22.4 9.6 9.6 0 16-3.2 22.4-9.6L886.4 284.8c12.8-12.8 12.8-32 0-44.8z"></path>
                                </svg>
                            </div>)
                        }
                      </li>
                  ))
                }
              </ul>
              <div class="vs-code-actions-items-container">
                <ul class={`vs-code-actions-items ve-action-setting-ul ${this.actionType === this.ACTION_TYPES.page.value || this.actionType === this.ACTION_TYPES.global.value ? 'vs-code-actions-items-with-search' : ''}`}>
                  {
                    actionList.map(item => (
                        <li class={item.id === this.selectedAction ? 'active' : ''} title={item.name} key={item.id} onClick={() => this.onActionChange(item.id)}>
                          {item.name}
                          {
                            item.id === this.selectedAction && (
                              <div class="ve-icon-button ve-icon-button-default active">
                                <svg fill="currentColor"
                                     preserveAspectRatio="xMidYMid meet"
                                     width="16"
                                     height="16"
                                     viewBox="0 0 1024 1024"
                                     class="ve-svgicon" style="vertical-align: middle;">
                                  <path
                                    d="M886.4 240c-12.8-12.8-32-12.8-44.8 0L364.8 716.8l-182.4-182.4c-12.8-12.8-32-12.8-44.8 0-12.8 12.8-12.8 32 0 44.8l204.8 204.8c6.4 6.4 12.8 9.6 22.4 9.6 9.6 0 16-3.2 22.4-9.6L886.4 284.8c12.8-12.8 12.8-32 0-44.8z"></path>
                                </svg>
                              </div>
                            )
                          }
                        </li>
                    ))
                  }
                </ul>
              </div>
            </div>
          </div>
      )
    },
    renderNameConfig() {
      if (this.selectedAction === NEW_ACTION_ID && (this.actionType === this.ACTION_TYPES.page.value || this.actionType === this.ACTION_TYPES.global.value)) {
        return (
            <div class="ve-action-setting-newAction">
              <p class="ve-action-setting-title">动作名称</p>
              <el-form>
                <el-form-item prop="newActionName">
                  <el-input vModel={this.newActionName} placeholder="输入动作名称"></el-input>
                </el-form-item>
              </el-form>
            </div>
        )
      }
      return null
    },

    renderParamsField(selectAction, title, setter, name, createElement) {
      console.log('setter', setter)
      return (
          <block-field title={title}>
            {
              setter && setter.render(createElement)
            }
          </block-field>
      )
    },
    renderBuiltinParamConfig(createElement) {
      const builtin = this.getBuiltinAction(this.selectedAction)
      const { params } = builtin
      return (
          <div>
            <p class="ve-action-setting-title">参数设置</p>
            {
              params && params.length !== 0 ? params.map(item => this.renderParamsField(this.selectedAction, item.title, item.setter, item.name, createElement)) : null
            }
          </div>
      )
    },
    renderParamConfig(createElement) {
      if (this.actionType === this.ACTION_TYPES.builtIn.value) {
        return this.renderBuiltinParamConfig(createElement)
      }

      if (!this.supportActionParam && this.actionType === this.ACTION_TYPES.custom.value) {
        return null
      }

      let calcHeight = CONFIG_CONTAINER_HEIGHT
      this.selectedAction === NEW_ACTION_ID && (calcHeight -= 93)
      this.actionType === this.ACTION_TYPES.custom.value && (calcHeight = CUSTOM_PARAM_HEIGHT)
      return (
          <div>
            <p class="ve-action-setting-title">参数设置</p>
            {
              this.supportActionParam ? (
                <editor key={`ve-action-setting-code-control-${this.actionType}`}
                        custom-style={{ width: `${600}px`, height: `${CONFIG_CONTAINER_HEIGHT}px` }} handlerChange={param => this.onParamsStrChange(param)}></editor>) : (
                <div class="ve-action-setting-param-disabled" style={{ width: `${600}px`, height: `${calcHeight}px` }}>
                  暂不支持参数设置
                </div>
              )
            }
            <p class="ve-action-setting-error">{this.paramsError}</p>
          </div>
      )
    },
    renderCodeConfig() {
      if (this.actionType !== this.ACTION_TYPES.custom.value) {
        return null
      }
      let height = CONFIG_CONTAINER_HEIGHT
      this.supportActionParam && (height = CONFIG_CONTAINER_HEIGHT - CUSTOM_PARAM_HEIGHT - 48)

      return (
          <div class={`ve-action-setting-code ${this.supportActionParam ? 've-action-setting-code-with-param' : ''}`}>
            <p class="ve-action-setting-title">动作编写</p>
            <editor custom-style={{ width: `${600}px`, height: `${height}px` }} value={this.code} handlerBlur={(value) => this.onCodeChange(value)}></editor>
            <p class="ve-action-setting-error">{this.codeError}</p>
          </div>
      )
    }
  },
  render(createElement) {
    return (
        <Dialog width="930px"
                center={true}
                visible={this.dialogVisible}
                title={this.title}
                {...{
                  on: {
                    ok: this.onDialogOK,
                    close: this.onDialogCancel
                  }
                }}>
          <div class="ve-action-setting">
            {
              this.renderSelector()
            }
              <div class="ve-action-setting-config">
                {
                  this.renderNameConfig()
                }
                {
                  this.renderParamConfig(createElement)
                }

                {
                  this.renderCodeConfig()
                }

              </div>
          </div>
        </Dialog>
    )
  }
}
</script>
<style lang="scss" type="text/scss">
  .ve-action-setting-selector {
    width: 270px;
    flex-grow: 0;
    flex-shrink: 0;
    .ve-action-setting-title {
      font-weight: 700;
      margin-bottom: 8px;
      color: rgba(0,0,0,.8);
      display: flex;
      align-items: center;
    }
    .ve-action-setting-selector-inner {
      display: flex;
      border: 1px solid rgba(31,56,88,.3);
      border-radius: 3px;
      height: calc(100% - 28px);
      .ve-action-setting-selector-category {
        width: 110px;
        flex-shrink: 0;
        flex-grow: 0;
        border-right: 1px solid rgba(31,56,88,.2);
        margin: 0;
        padding: 0;
        &.ve-action-setting-ul {
          li {
            height: 28px;
            line-height: 28px;
            padding: 0 30px 0 12px;
            cursor: pointer;
            position: relative;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            list-style: none;
          }
        }
      }
      .ve-icon-button{
        &.active {
          position: absolute;
          right: 12px;
          top: 0;
          height: 28px;
          color: var(--color-brand,#006cff);
        }
      }
    }
  }

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
  .engine-uxcore-form-tips {
    padding-top: 4px;
    font-size: 12px;
    color: rgba(31, 56, 88, 0.4);
  }
  .ve-action-setting-param-disabled {
    display: flex;
    align-items: center;
    justify-content: center;
    color: #999;
    border: 1px solid rgba(31,56,88,.3);
    border-radius: 3px;
  }
  .ve-action-setting-selector-inner .vs-code-actions-items-container {
    width: 157px;
  }
  .ve-action-setting-selector-inner .vs-code-actions-items-container .vs-code-actions-items {
    overflow-y: auto;
    overflow-x: hidden;
    height: 394px;
    margin-left: -30px;
  }
  .ve-action-setting-ul li {
    height: 28px;
    line-height: 28px;
    padding: 0 30px 0 12px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
</style>
