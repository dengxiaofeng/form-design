import ActionSettingControl from '../../views/index/actionSettingControl'
import ActionParams from './event'
import { getDrawingList } from '@/utils/db'

const find = function (data, key, value) {
  let ret = null
  data.forEach(item => {
    item[key] === value && (ret = item)
  })

  return ret
}
export default {
  props: {
    events: {
      type: [Object, Array],
      default() {
        return []
      }
    }
  },
  data() {
    return {
      dialogVisible: !1
    }
  },
  components: {
    ActionSettingControl
  },
  created() {
    this.isNewAction = !1
    this.currentAction = null
  },
  methods: {
    getActionList() {

    },
    getHotValue() {
      return getDrawingList().actions.list || []
    },
    getEventTypes() {
      console.log(this.events)
      const { events } = this
      return events instanceof Array ? events : []
    },
    getEventTypeObj(eventType) {
      if (!eventType) {
        return {}
      }

      const name = find(this.events, 'name', eventType)
      const alias = find(this.events, 'alias', eventType)

      return name || alias || {}
    },
    getActionName() {

    },
    locate(actionName) {

    },
    setAction(params) {
      console.log(params)
      const { uuid } = params
      let action = void 0
      if (action = params.id && new ActionParams({
        uuid,
        isSystem: params.isSystem,
        actionType: params.id,
        actionName: params.name,
        eventType: this.currentAction.eventType,
        params: params.params || {}
      }), this.isNewAction) {

      }

      this.currentAction = action
    },
    addAction(name) {
      debugger
      this.isNewAction = !0
      this.currentAction = new ActionParams({
        eventType: name
      })
      this.showDialog()
    },
    editAction(uuid) {

    },
    deleteAction(uuid) {

    },
    showDialog() {
      this.dialogVisible = true
    },
    getFunctionName(methodName) {
      let actionList = window.action_util.getActionsList() || []
      actionList = actionList.map(item => item.id)
      let index = 1
      let name = void 0
      do {
        name = index === 1 ? methodName : `${methodName}${index}`,
        index += 1
      }
      while (actionList.indexOf(name) >= 0) return name
    },
    renderActionList() {

    },
    renderActionItem(action, actionType) {
      return <div class="vs-event-item-operation" key={actionType}>
        <div class="vs-event-item-title">
          <div class="vs-event-item-tex">{action.actionName}</div>
        </div>
        <div>
          <div className="ve-icon-button ve-icon-button-default" onClick={this.editAction(action.uuid)}>
            <svg fill="currentColor"
                 preserveAspectRatio="xMidYMid meet"
                 width="16"
                 height="16"
                 viewBox="0 0 1024 1024"
                 className="ve-svgicon"
                 style="vertical-align: middle;">
              <path
                d="M965.824 405.952a180.48 180.48 0 0 1-117.12-85.376 174.464 174.464 0 0 1-16-142.08 22.208 22.208 0 0 0-7.04-23.552 480.576 480.576 0 0 0-153.6-89.216 23.104 23.104 0 0 0-24.32 5.76 182.208 182.208 0 0 1-135.68 57.92 182.208 182.208 0 0 1-133.12-56.64 23.104 23.104 0 0 0-26.88-7.04 478.656 478.656 0 0 0-153.6 89.856 22.208 22.208 0 0 0-7.04 23.552 174.464 174.464 0 0 1-16 141.44A180.48 180.48 0 0 1 58.24 405.952a22.4 22.4 0 0 0-17.28 17.792 455.08 455.08 0 0 0 0 176.512 22.4 22.4 0 0 0 17.28 17.792 180.48 180.48 0 0 1 117.12 84.736c25.408 42.944 31.232 94.592 16 142.08a22.208 22.208 0 0 0 7.04 23.552A480.576 480.576 0 0 0 352 957.632h7.68a23.04 23.04 0 0 0 16.64-7.04 184.128 184.128 0 0 1 266.944 0c6.592 8.96 18.752 11.968 28.8 7.04a479.36 479.36 0 0 0 156.16-88.576 22.208 22.208 0 0 0 7.04-23.552 174.464 174.464 0 0 1 13.44-142.72 180.48 180.48 0 0 1 117.12-84.736 22.4 22.4 0 0 0 17.28-17.792 452.613 452.613 0 0 0 0-176.512 23.04 23.04 0 0 0-17.28-17.792z m-42.88 169.408a218.752 218.752 0 0 0-128 98.112 211.904 211.904 0 0 0-21.76 156.736 415.936 415.936 0 0 1-112 63.68 217.472 217.472 0 0 0-149.12-63.68 221.312 221.312 0 0 0-149.12 63.68 414.592 414.592 0 0 1-112-63.68c12.8-53.12 4.288-109.12-23.68-156.096A218.752 218.752 0 0 0 101.12 575.36a386.176 386.176 0 0 1 0-127.36 218.752 218.752 0 0 0 128-98.112c27.2-47.552 34.944-103.68 21.76-156.8a415.296 415.296 0 0 1 112-63.68A221.44 221.44 0 0 0 512 187.392a218.24 218.24 0 0 0 149.12-57.984 413.952 413.952 0 0 1 112 63.744 211.904 211.904 0 0 0 23.04 156.096 218.752 218.752 0 0 0 128 98.112 386.65 386.65 0 0 1 0 127.36l-1.28 0.64z"/>
              <path
                d="M512 320.576c-105.984 0-192 85.568-192 191.104a191.552 191.552 0 0 0 192 191.104c106.112 0 192.064-85.568 192.064-191.104a190.72 190.72 0 0 0-56.256-135.168 192.448 192.448 0 0 0-135.744-55.936z m0 318.528c-70.656 0-128-57.088-128-127.424 0-70.4 57.344-127.36 128-127.36 70.72 0 128 56.96 128 127.36 0 33.792-13.44 66.176-37.44 90.112a128.32 128.32 0 0 1-90.496 37.312z"/>
            </svg>
          </div>
          <div className="ve-icon-button ve-icon-button-default" onClick={this.deleteAction(action.uuid)}>
            <svg fill="currentColor"
                 preserveAspectRatio="xMidYMid meet"
                 width="16"
                 height="16"
                 viewBox="0 0 1024 1024"
                 className="ve-svgicon"
                 style="vertical-align: middle;">
              <path
                d="M224 256v639.84A64 64 0 0 0 287.84 960h448.32A64 64 0 0 0 800 895.84V256h64a32 32 0 1 0 0-64H160a32 32 0 1 0 0 64h64zM384 96c0-17.664 14.496-32 31.904-32h192.192C625.696 64 640 78.208 640 96c0 17.664-14.496 32-31.904 32H415.904A31.872 31.872 0 0 1 384 96z m-96 191.744C288 270.208 302.4 256 320.224 256h383.552C721.6 256 736 270.56 736 287.744v576.512C736 881.792 721.6 896 703.776 896H320.224A32.224 32.224 0 0 1 288 864.256V287.744zM352 352c0-17.696 14.208-32.032 32-32.032 17.664 0 32 14.24 32 32v448c0 17.664-14.208 32-32 32-17.664 0-32-14.24-32-32V352z m128 0c0-17.696 14.208-32.032 32-32.032 17.664 0 32 14.24 32 32v448c0 17.664-14.208 32-32 32-17.664 0-32-14.24-32-32V352z m128 0c0-17.696 14.208-32.032 32-32.032 17.664 0 32 14.24 32 32v448c0 17.664-14.208 32-32 32-17.664 0-32-14.24-32-32V352z"/>
            </svg>
          </div>
        </div>
      </div>
    },
    renderActionSetting() {
      debugger
      const { dialogVisible } = this
      if (!dialogVisible) {
        return null
      }
      const currentAction = this.currentAction || {}
      console.log('currentAction', currentAction)
      let ret = {}

      ret = currentAction.func ? {
        uuid: currentAction.uuid,
        type: 'js',
        source: typeof currentAction.func === 'string' ? currentAction.func : currentAction.func.source || '',
        params: currentAction.params
      } : currentAction.isSystem ? {
        uuid: currentAction.uuid,
        id: currentAction.actionType,
        name: currentAction.actionName,
        params: currentAction.params
      } : {
        uuid: currentAction.uuid,
        type: 'actionRef',
        id: currentAction.actionType,
        name: currentAction.actionName,
        params: currentAction.params
      }

      const {
        initialValue, actions, name, title
      } = this.getEventTypeObj(currentAction.eventType)
      console.log('currentAction-ret', ret)
      const supportTypes = ['builtIn', 'page']
      return (
        <ActionSettingControl
            visible={dialogVisible}
            title={title || name }
            supportTypes={supportTypes}
            value={ret}
            defaultCode={initialValue} extraBuiltinActions={actions || []}
            defaultActionType="page"
            handleClose={() => this.dialogVisible = !1}
            defaultActionName={this.getFunctionName(name)}
            supportActionParam={true}
            handleChange={params => this.setAction(params)}
        />
      )
    }
  },
  render() {
    return (
      <div class="ve-event-setter">
        <div class="ve-event-add-action" ref="shell">
          <el-popover
            placement="top"
            width="254"
            trigger="click" popper-class="ve-popup vs-event-type-popup ve-align-top ve-visible-normal" ref="shell">
            <ul class="vs-event-list">
              {

                this.getEventTypes().map(item => (
                    <li onClick={() => this.addAction(item.name)}>{item.title}</li>
                ))
              }
            </ul>
            <button type="button" class="vs-code-button" slot="reference">新建动作</button>
          </el-popover>

        </div>
        {
          this.renderActionSetting()
        }
      </div>
    )
  }
}
