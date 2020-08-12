import ActionSettingControl from "../../views/index/actionSettingControl";

const EVENT_TYPE = {
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
}
export default {
  props: {
    mode: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    },
    label: {
      type: String,
      default: '绑定动作'
    },
    defaultCode: {
      type: String,
      default: ''
    },
    defaultActionType: {
      type: String,
      default: 'page'
    },
    defaultActionName: {
      type: String,
      default: ''
    },
    supportTypes: [Array],
    // onChange: [Function]
    handleChange: [Function],
    value: [String, Object]
  },
  data() {
    return {
      dialogVisible: !1
    }
  },
  components: {
    ActionSettingControl
  },
  methods: {
    getHotValue() {
      debugger
      let value = this.value
      return "string" == typeof value && (value = {
        source: value
      }), value
    },
    setAction(value) {

      // this.onChange && this.onChange(value)
      this.handleChange && this.handleChange(value)
    },
    locate() {
      
    },
    isModified() {
      const value = this.getHotValue()
      if(value && value.id) {
        return !0
      }
      if(value) {
        var defaultValue = this.defaultValue
        defaultValue && defaultValue.source && (defaultValue = defaultValue.source)
        return !(!value.source || value.source === defaultValue)
      }
    
    },
    showDialog() {
      this.dialogVisible = !0
    },
    hideDialog() {
      this.dialogVisible = !1
    },
    remove() {
      this.handleChange && this.handleChange("")
    },
    renderCurrentItem() {
      const value = this.getHotValue()
      const text = value && value.id ? value.id : EVENT_TYPE.custom.text

      const locateBtn = value && value.id ? (
        <svg fill="currentColor"
             preserveAspectRatio="xMidYMid meet"
             width="16" height="16"
             viewBox="0 0 1024 1024"
             class="ve-svgicon"
             style="vertical-align: middle;" onClick={this.locate}>
          <path d="M73.344 534.496a31.552 31.552 0 0 1 0-44.864v-0.064l224.384-224.192a31.712 31.712 0 1 1 44.896 44.864L140.672 512l201.952 201.824a31.68 31.68 0 0 1 0.064 44.928 31.936 31.936 0 0 1-44.96-0.064l-224.352-224.192h-0.032z m877.312 0v0.032l-224.384 224.192a31.936 31.936 0 0 1-44.96 0.064 31.68 31.68 0 0 1 0.064-44.928l201.952-201.824-201.952-201.792a31.712 31.712 0 1 1 44.896-44.864l224.352 224.192h0.032v0.032a31.552 31.552 0 0 1 0 44.864v0.032z"/>
        </svg>
      ) : null

      return (
        <div class="vs-action-current">
          <div class="vs-action-current-value">{text}</div>
          <div class="vs-action-current-icons">
            {
              locateBtn

            }
            <svg fill="currentColor"
                 preserveAspectRatio="xMidYMid meet"
                 width="16"
                 height="16"
                 viewBox="0 0 1024 1024"
                 class="ve-svgicon"
                 style="vertical-align: middle;" onClick={this.showDialog}>
              <path
                d="M965.824 405.952a180.48 180.48 0 0 1-117.12-85.376 174.464 174.464 0 0 1-16-142.08 22.208 22.208 0 0 0-7.04-23.552 480.576 480.576 0 0 0-153.6-89.216 23.104 23.104 0 0 0-24.32 5.76 182.208 182.208 0 0 1-135.68 57.92 182.208 182.208 0 0 1-133.12-56.64 23.104 23.104 0 0 0-26.88-7.04 478.656 478.656 0 0 0-153.6 89.856 22.208 22.208 0 0 0-7.04 23.552 174.464 174.464 0 0 1-16 141.44A180.48 180.48 0 0 1 58.24 405.952a22.4 22.4 0 0 0-17.28 17.792 455.08 455.08 0 0 0 0 176.512 22.4 22.4 0 0 0 17.28 17.792 180.48 180.48 0 0 1 117.12 84.736c25.408 42.944 31.232 94.592 16 142.08a22.208 22.208 0 0 0 7.04 23.552A480.576 480.576 0 0 0 352 957.632h7.68a23.04 23.04 0 0 0 16.64-7.04 184.128 184.128 0 0 1 266.944 0c6.592 8.96 18.752 11.968 28.8 7.04a479.36 479.36 0 0 0 156.16-88.576 22.208 22.208 0 0 0 7.04-23.552 174.464 174.464 0 0 1 13.44-142.72 180.48 180.48 0 0 1 117.12-84.736 22.4 22.4 0 0 0 17.28-17.792 452.613 452.613 0 0 0 0-176.512 23.04 23.04 0 0 0-17.28-17.792z m-42.88 169.408a218.752 218.752 0 0 0-128 98.112 211.904 211.904 0 0 0-21.76 156.736 415.936 415.936 0 0 1-112 63.68 217.472 217.472 0 0 0-149.12-63.68 221.312 221.312 0 0 0-149.12 63.68 414.592 414.592 0 0 1-112-63.68c12.8-53.12 4.288-109.12-23.68-156.096A218.752 218.752 0 0 0 101.12 575.36a386.176 386.176 0 0 1 0-127.36 218.752 218.752 0 0 0 128-98.112c27.2-47.552 34.944-103.68 21.76-156.8a415.296 415.296 0 0 1 112-63.68A221.44 221.44 0 0 0 512 187.392a218.24 218.24 0 0 0 149.12-57.984 413.952 413.952 0 0 1 112 63.744 211.904 211.904 0 0 0 23.04 156.096 218.752 218.752 0 0 0 128 98.112 386.65 386.65 0 0 1 0 127.36l-1.28 0.64z"/>
              <path
                d="M512 320.576c-105.984 0-192 85.568-192 191.104a191.552 191.552 0 0 0 192 191.104c106.112 0 192.064-85.568 192.064-191.104a190.72 190.72 0 0 0-56.256-135.168 192.448 192.448 0 0 0-135.744-55.936z m0 318.528c-70.656 0-128-57.088-128-127.424 0-70.4 57.344-127.36 128-127.36 70.72 0 128 56.96 128 127.36 0 33.792-13.44 66.176-37.44 90.112a128.32 128.32 0 0 1-90.496 37.312z"/>
            </svg>
            <svg fill="currentColor"
                 preserveAspectRatio="xMidYMid meet"
                 width="16"
                 height="16"
                 viewBox="0 0 1024 1024"
                 class="ve-svgicon"
                 style="vertical-align: middle;" onClick={() => this.remove()}>
              <path
                d="M224 256v639.84A64 64 0 0 0 287.84 960h448.32A64 64 0 0 0 800 895.84V256h64a32 32 0 1 0 0-64H160a32 32 0 1 0 0 64h64zM384 96c0-17.664 14.496-32 31.904-32h192.192C625.696 64 640 78.208 640 96c0 17.664-14.496 32-31.904 32H415.904A31.872 31.872 0 0 1 384 96z m-96 191.744C288 270.208 302.4 256 320.224 256h383.552C721.6 256 736 270.56 736 287.744v576.512C736 881.792 721.6 896 703.776 896H320.224A32.224 32.224 0 0 1 288 864.256V287.744zM352 352c0-17.696 14.208-32.032 32-32.032 17.664 0 32 14.24 32 32v448c0 17.664-14.208 32-32 32-17.664 0-32-14.24-32-32V352z m128 0c0-17.696 14.208-32.032 32-32.032 17.664 0 32 14.24 32 32v448c0 17.664-14.208 32-32 32-17.664 0-32-14.24-32-32V352z m128 0c0-17.696 14.208-32.032 32-32.032 17.664 0 32 14.24 32 32v448c0 17.664-14.208 32-32 32-17.664 0-32-14.24-32-32V352z"/>
            </svg>
          </div>
        </div>
      )
    },
    renderActionSetting() {
      debugger
      const { title } = this

      let {
        // eslint-disable-next-line prefer-const
        supportTypes, defaultActionType, defaultActionName, defaultCode
      } = this
      // eslint-disable-next-line prefer-destructuring
      supportTypes && supportTypes.length > 0 && supportTypes.indexOf('page') < 0 && (defaultActionType = supportTypes[0])
      // const props = {
      //   onChange: value => this.setAction(value),
      //   onClose: () => this.hideDialog(),
      //   handleChange: value => this.setAction(value)
      // }
      // console.log('renderActionSetting', props)
      return (
        <ActionSettingControl title={title}
                              supportTypes={supportTypes}
                              supportActionParam={!1}
                              defaultActionType={defaultActionType}
                              defaultActionName={defaultActionName}
                              defaultCode={defaultCode}
                              value={this.value}
                              handleClose={() => this.hideDialog()}
                              handleChange={(value) => this.setAction(value)}
                              visible={this.dialogVisible}/>
      )
    }
  },
  render() {
    debugger
    const { label } = this
    const currentItem = this.isModified() ? this.renderCurrentItem() : (
      <button type="button" class="vs-action-button 123" {...{ on: { click: event => this.showDialog(event) } }}>{label}</button>
    )
    return (
      <div class="vs-action">
        {
          currentItem
        }
        {
          this.renderActionSetting()
        }
      </div>
    )
  }
}

