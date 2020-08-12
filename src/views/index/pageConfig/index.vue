<template>
  <div>
    <block v-for="item in eventConfig" :key="item.eventName" :title="item.title">
      <div v-if="!isExistEvent(item.eventName)" class="vs-action" @click="handleBindEvent($event, item)">
        <button type="button" class="vs-action-button">
          {{ item.actionDescript }}
        </button>
      </div>
      <action v-else :title="item.title" @add="handleBindEvent($event, item)" @delete="deleteAction($event, item)" />
    </block>
    <Dialog :visible="eventVisible" :title="bindConfig.title" width="930px" center @close="handleCloseEvent" @ok="handleSubmit">
      <event-config ref="event" default-action-type="page" :value="bindConfig.value" :default-code="bindConfig.value" :default-action-name="bindConfig.eventName" :on-change="handleChange" />
    </Dialog>
  </div>
</template>

<script type="text/ecmascript-6">
import Block from '@/components/block'
import Action from '@/components/action'
import Dialog from '@/components/dialog'
import EventConfig from '../actionSettingControl'
import _ from 'lodash'

export default {
  components: {
    Block,
    Action,
    Dialog,
    EventConfig
  },
  props: {
    schemaConfig: {
      type: Object,
      default() {
        return {}
      }
    },
    onChange: Function
  },
  data() {
    return {
      eventConfig: [{
        title: '页面加载完之前执行',
        eventName: 'willMount',
        actionDescript: '绑定动作'
      }, {
        title: '页面加载完后执行',
        eventName: 'didMount',
        actionDescript: '绑定动作'
      }, {
        title: '页面销毁前执行',
        eventName: 'willUnMount',
        actionDescript: '绑定动作'
      }],
      eventVisible: false,
      bindConfig: {}
    }
  },
  computed: {
    actionConfig() {
      return this.schemaConfig && Array.isArray(this.schemaConfig.pages) && this.schemaConfig.pages[0].layout.props
    },
    isExistEvent(name) {
      const self = this
      return function (name) {
        debugger
        const event = self.schemaConfig && Array.isArray(self.schemaConfig.pages) && self.schemaConfig.pages[0].layout.props[name]
        if (event && event.source) {
          return true
        }
        return false
      }
    }
  },
  methods: {
    deleteAction(event, item) {
      this.onChange && this.onChange({
        ...item,
        keyChain: this.bindConfig.eventName,
        action: 'delete'
      })
    },
    handleBindEvent(event, item) {
      this.eventVisible = !this.eventVisible
      const props = _.get(this.schemaConfig, 'pages[0].layout.props')
      const baseConfig = {
        title: item.title,
        eventName: item.eventName,
        value: props[item.eventName] || `// 页面节点即将开始渲染 \nfunction ${item.eventName}(ctx) {\n    \n}`
      }
      this.bindConfig = baseConfig
      console.log(this.bindConfig)
      if (event) {
        event.stopPropagation()
        event.preventDefault()
      }
    },
    handleSubmit() {
      this.$refs.event.handleBindSave()
    },
    handleChange(obj) {
      debugger
      this.onChange && this.onChange({
        ...obj,
        keyChain: this.bindConfig.eventName,
        action: 'save'
      })
    },
    handleCloseEvent() {
      this.eventVisible = false
    }
  }
}
</script>
