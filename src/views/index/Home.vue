<template>
  <div class="container engine">
    <div class="engine-main">
      <div class="engine-panes">
        <DockPane ref="dockPane"
                  :components="leftComponents"
                  :add-component="addComponent"
                  :source-code="getSourceCode"
                  :clone-component="cloneComponent"
                  :actions="schemaConfig && schemaConfig.actions || []"
                  :on-end="onEnd" :page-data-source="pageDataSource"
        />
        <div class="engine-pane engine-actionpane">
          <div class="engine-actions-group engine-group-right">
            <div class="engine-actionitem" @click="run">
              <div class="ve-icon-button ve-icon-button-default preview-button" data-tip="预览 Cmd+P" data-dir="bottom">
                <svg fill="currentColor" preserveAspectRatio="xMidYMid meet" width="20" height="20"
                     viewBox="0 0 1024 1024" class="ve-svgicon" style="vertical-align: middle;"
                >
                  <path
                    d="M512 864c-290.752 0-410.4-243.584-441.568-318.208a91.968 91.968 0 0 1 0-67.584C101.6 403.584 221.248 160 512 160c289.408 0 410.4 243.584 441.568 318.208 8.576 22.08 8.576 45.536 0 67.584C922.4 620.416 801.408 864 512 864zM129.984 500.48a30.4 30.4 0 0 0 0 21.664C156.16 588.48 261.6 800 512 800s355.84-211.52 382.016-276.48a30.4 30.4 0 0 0 0-21.664C867.84 435.52 762.4 224 512 224S156.16 435.52 129.984 500.48zM512 672c-88.192 0-160-72.32-160-160s71.808-160 160-160 160 72.32 160 160-71.808 160-160 160z m0-256c-52.608 0-96 42.88-96 96s42.88 96 96 96 96-42.88 96-96-43.392-96-96-96z"
                  />
                </svg>
      

              </div>
            </div>
            <div class="engine-actionitem">
              <div class="save-button" data-tip="保存 Cmd+S">
                保 存
              </div>
            </div>
          </div>
        </div>
        <div class="engine-pane engine-workspacepane">
          <div class="engine-simulator">
            <overlay v-if="activeData" :position="position" @copy="drawingItemCopy" @delete="drawingItemDelete" :getScrollTop="getScrollTop" />
            <div class="engine-simulator-screen">
              <div class="engine-pages">
                <div class="engine-page engine-visible" ref="shell">
                  <div :id="currentDocument"
                       class="engine-document"
                       :class="activeDocuementContent ? 'engine-selected-outline': ''" ref="document" @click.prevent="handleDocuementConfig"
                  >
                    <draggable v-if="documentTree" class="vc-root" :class="documentTree && documentTree.layout.id" style="width: 100%; height: 100%;" :list="drawingList" :animation="340" group="componentsGroup">
                      <div class="vc-rootheader" />
                      <div :style="{
                             padding:rootContentConfig.rootContentPadding +'px',
                             backgroundColor: rootContentConfig.rootContentColor}"
                           :class="activePageContent ? 'engine-selected-outline': ''"
                           style="min-height: 40px;" @click.prevent.stop="handleContentConfig"
                      >
                        <div v-if="!documentTree.layout.children[1].children.length" id="empty-root-view-container" />
                        <draggable v-if="drawingList.length" class="drawing-board" :list="drawingList" :animation="340" group="componentsGroup">
                          <draggable-item
                            v-for="(element, index) in drawingList"
                            :key="element.renderKey"
                            :drawing-list="drawingList"
                            :element="element"
                            :index="index"
                            :active-id="activeId"
                            :form-conf="formConf"
                            @activeItem="activeFormItem"
                          />
                        </draggable>
                      </div>
                      <div class="vc-footer" />
                    </draggable>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <ConfigPanel :active-data="activeData"
                        :config-obj="package.configObj"
                        :form-conf="formConf"
                        :show-field="!!drawingList.length"
                        @change="handleChange"></ConfigPanel>
      </div>
    </div>
    <form-drawer
      :visible.sync="drawerVisible"
      :form-data="formData"
      size="100%"
      :generate-conf="generateConf"
    />
    <json-drawer
      size="60%"
      :visible.sync="jsonDrawerVisible"
      :json-str="JSON.stringify(formData)"
      @refresh="refreshJson"
    />
    <code-type-dialog
      :visible.sync="dialogVisible"
      title="选择生成类型"
      :show-file-name="showFileName"
      @confirm="generate"
    />
  </div>
</template>

<script>
import draggable from 'vuedraggable'
import { debounce } from 'throttle-debounce'
import { saveAs } from 'file-saver'
import ClipboardJS from 'clipboard'
import render from '@/components/render/render'
import FormDrawer from './FormDrawer'
import JsonDrawer from './JsonDrawer'
import ConfigPanel from './configPanel'
import CloseIcon from '@/components/SvgIcon/close'
import DockPane from './dockpane'
import {
  inputComponents, selectComponents, layoutComponents, formConf
} from '@/components/generator/config'
import {
  exportDefault, beautifierConf, isNumberStr, titleCase, deepClone
} from '@/utils/index'
import {
  makeUpHtml, vueTemplate, vueScript, cssStyle
} from '@/components/generator/html'
import { makeUpJs } from '@/components/generator/js'
import { makeUpCss } from '@/components/generator/css'
import drawingDefalut from '@/components/generator/drawingDefalut'
import logo from '@/assets/logo.png'
import CodeTypeDialog from './CodeTypeDialog'
import DraggableItem from './DraggableItem'
import {
  getDrawingList, saveDrawingList, getIdGlobal, saveIdGlobal, getFormConf
} from '@/utils/db'
import loadBeautifier from '@/utils/loadBeautifier'
import InlineField from '@/components/filed-layout/inline-filed'
import ChoiceGroup from '../../components/choice-control/choice-group'
import ChoiceItem from '../../components/choice-control/choice-item'
import Block from '@/components/block'
import Collapsed from '@/components/collapsed'
import StyleLayout from '@/components/style-layout'
import Dialog from '@/components/dialog'
import Overlay from './overlay'
import VCIcon from '@/engine-components/engine-icon'
import { globalConfig } from '../../components/event-setter/util'
// import EventConfig from './event'
import PageAction from './pageConfig'
import _ from 'lodash'
import styleSheetUtils from '@/utils/cache'
import PageConfigRender from './parse/pageConfigRender'
import { uuid } from './page/createPage'
import { packageJSON } from '../../components/generator/config'

const EVENT_ACTION_ADD = 'save'
const EVENT_ACTION_DELETE = 'delete'
let beautifier
const emptyActiveData = {
  style: {},
  autosize: {}
}
let oldActiveId
let tempActiveData
const drawingListInDB = getDrawingList()
const formConfInDB = getFormConf()
const idGlobal = getIdGlobal()
const parseComponent = function (validateConfig) {
  let item
  let type
  const obj = (validateConfig instanceof Array) ? [] : {}

  if (validateConfig) {
    for (const key in validateConfig) {
      item = validateConfig[key], type = item.type

      if (Object.prototype.hasOwnProperty.call(validateConfig, key)) {
        if (type === 'coms') {
          continue
        } else if (type == 'group' || type == 'menuChild') {
          obj[key] = parseComponent(item.children, item.name)
        } else if (item == 'menu') {
          obj.options = parseComponent(validateConfig.children, item.name)
        } else if (item.children) {
          obj[key] = parseComponent(item.children)
        } else {
          obj[key] = item.default
          delete obj.children
        }
      }
    }
  }
  return obj
}
const identifiesField = function (tag) {
  const field = {
    'el-input': 'textField',
    'el-select': 'selectField',
    'vc_text': 'vcText',
    'el-form': 'Form',
    'el-button': 'button',
    'pro-table': 'proTable',
    'el_date-picker': 'el_date_picker',
    'el-date-picker': 'el_date_picker',
    'el-radio-group': 'el_radio_group',
    'el-checkbox-group': 'el_checkbox_group'
  }
  return uuid(6, '', `${field[tag] ? field[tag] : tag}`).replace(/-/ig, '_')
}

export default {
  components: {
    PageConfigRender,
    ChoiceItem,
    ChoiceGroup,
    draggable,
    render,
    FormDrawer,
    JsonDrawer,
    ConfigPanel,
    CodeTypeDialog,
    DraggableItem,
    CloseIcon,
    DockPane,
    InlineField,
    Block,
    Collapsed,
    StyleLayout,
    Dialog,
    // EventConfig,
    PageAction,
    Overlay,
    VCIcon
  },
  data() {
    return {
      logo,
      idGlobal,
      formConf,
      inputComponents,
      selectComponents,
      layoutComponents,
      labelWidth: 100,
      drawingList: getDrawingList(),
      drawingData: {},
      activeId: '',
      drawerVisible: false,
      formData: {},
      dialogVisible: false,
      jsonDrawerVisible: false,
      generateConf: null,
      showFileName: false,
      activeData: {},
      schemaConfig: getDrawingList(),
      saveDrawingListDebounce: debounce(340, saveDrawingList),
      saveIdGlobalDebounce: debounce(340, saveIdGlobal),
      leftComponents: [
        {
          title: '输入型组件',
          list: inputComponents
        },
        {
          title: '选择型组件',
          list: selectComponents
        },
        {
          title: '布局型组件',
          list: layoutComponents
        }
      ],
      activePageContent: false,
      activeDocuementContent: false,
      rootContentConfig: {
        rootContentPadding: '20',
        rootContentColor: 'white'
      },
      eventVisible: false,
      bindConfig: {},
      position: {},
      package: {
        configObj: {}
      },
      isReady: false
    }
  },
  computed: {
    getRoot() {

    },
    pageDataSource() {
      return this.schemaConfig && this.schemaConfig.pages[0].dataSource
    },
    currentDocument() {
      // const pageConfig = JSON.parse(localStorage.getItem('schemaPageConfig') || '{}')
      return this.schemaConfig && Array.isArray(this.schemaConfig.pages) && this.schemaConfig.pages[0].id
    },
    documentTree() {
      return this.schemaConfig && this.schemaConfig.pages[0]
    },
    getSourceCode: {
      get() {
        return JSON.stringify(this.schemaConfig, null, 2)
      },
      set(val) {
        this.schemaConfig = val
        this.saveDrawingListDebounce(val)
        return val
      }

    },
  },
  watch: {
    activeId: {
      handler(val) {
        oldActiveId = val
      },
      immediate: true
    },
    drawingList: {
      handler(val) {
        if (this.schemaConfig) {
          this.schemaConfig.pages[0].layout.children[1].props = {
            ...this.schemaConfig.pages[0].layout.children[1].props
          }
          this.schemaConfig.pages[0].layout.children[1].children = val
          this.saveDrawingListDebounce(this.schemaConfig)
        }

        if (val.length === 0) this.idGlobal = 100
      },
      deep: true
    },
    schemaConfig(val, oldVal) {
      if (val !== oldVal) {
        this.saveDrawingListDebounce(val)
      }
    },
    idGlobal: {
      handler(val) {
        this.saveIdGlobalDebounce(val)
      },
      immediate: true
    }
  },
  mounted() {
    // styleSheetUtils.invoke(".engine-document", ":root {background-color: #f2f3f5;display: flex;}")
    // const eventConfig = globalConfig.getConfigFromRemote()
    // eventConfig.function && eventConfig.function.module ? window.action_util.setActions(eventConfig.function, 'global') : window.action_util.setActions({}, 'global')
    // eventConfig.fit ? window.action_util.setActions(eventConfig.fit, 'fitGlobal') : window.action_util.setActions({}, 'fitGlobal')
    // eventConfig.willFetch ? window.action_util.setActions(eventConfig.willFetch, 'willFetchGlobal') : window.action_util.setActions({}, 'willFetchGlobal')
    // this.schemaConfig && this.schemaConfig.actions ? window.action_util.setActions(this.schemaConfig.actions, 'page') : window.action_util.setActions({}, 'page')
    if (drawingListInDB && drawingListInDB.pages && Array.isArray(drawingListInDB.pages) && drawingListInDB.pages.length > 0) {
      this.drawingList = drawingListInDB.pages[0].layout.children[1].children
    } else {
      this.drawingList = []
    }
    if (Array.isArray(this.drawingList) && this.drawingList.length > 0) {
      this.activeFormItem(this.drawingList[0])
    }

    // window.share.event.on('dockUtils', event => {
    //   console.log('123', event)
    //   this.$refs && this.$refs.dockPane && this.$refs.dockPane.handlerMenuDock(2)
    // })
    this.isReady = true
    window.addEventListener('resize', this.calcOverPostion)

    this.$nextTick(() => {
      const shell = this.$refs.shell
      const firstElementChild = shell.firstElementChild
      firstElementChild.addEventListener("scroll", this.scroll, !0)
    })
  },
  methods: {
    handleActionChange(obj) {
      if (obj.action === EVENT_ACTION_ADD) {
        this.schemaConfig.pages[0].layout.props[obj.keyChain] = obj
      }

      if (obj.action === EVENT_ACTION_DELETE) {
        this.schemaConfig.pages[0].layout.props[obj.eventName] = '// 页面节点即将开始渲染 \nfunction willMount(ctx) {\n    \n}'
      }

      this.saveDrawingListDebounce(this.schemaConfig)
    },
    handleCloseEvent() {
      this.eventVisible = false
    },
    handleContentConfig() {
      debugger
      this.activeDocuementContent = false
      this.activePageContent = !this.activePageContent
      this.activeData = this.schemaConfig.pages[0].layout.children[1]
      this.package.configObj = packageJSON[this.activeData.componentName].config || {};
    },
    handleDocuementConfig() {
      debugger
      this.activePageContent = false
      this.activeDocuementContent = !this.activeDocuementContent
      this.activeData = this.schemaConfig.pages[0].layout
      this.package.configObj = packageJSON[this.activeData.componentName].config || {}
      console.log(this.package.configObj)
    },
    handleRootContentConfig(val, key) {
      const rootContentProps = _.get(this.schemaConfig, 'pages[0].layout.children[1].props')
      this.rootContentConfig[key] = val
      _.set(this.schemaConfig, 'pages[0].layout.children[1].props', { ...rootContentProps, ...this.rootContentConfig })
      this.saveDrawingListDebounce(this.schemaConfig)
    },
    getDocument() {
      return this.schemaConfig && Array.isArray(this.schemaConfig.pages) && this.schemaConfig.pages[0].id
    },
    activeFormItem(element, parent, index, event) {
      this.activeDocuementContent = false
      this.activePageContent = false
      this.activeData = {
        ...element,
        parent,
        index
      }
      const configObj = packageJSON[element.componentName].config || {}
      this.package.configObj = configObj
      this.activeId = element.id
      this.calcOverPostion()
    },
    calcOverPostion() {
      this.$nextTick(() => {
        const node = document.querySelector(`.${this.activeData.id}`)
        const nodeRect = node.getBoundingClientRect()
        const root = document.querySelector(`#${this.getDocument()}`)
        const rootRect = root.getBoundingClientRect()
        if (node) {
          this.position = {
            width: `${node.offsetWidth}px`,
            height: `${node.offsetHeight}px`,
            transform: `translate(${nodeRect.left - rootRect.left}px, ${nodeRect.top + root.scrollTop - rootRect.top}px)`
          }
        }
      })
    },
    scroll() {
      debugger
      clearTimeout(this.scrolling)
      this.scrolling = setTimeout(() => {
        this.scrolling = null
      }, 50)
      window.share.event.emit("scroll", this.getScrollTop())
    },
    getScrollTop() {
       return this.$refs.document ? this.$refs.document.scrollTop: 0
    },
    onEnd(obj) {
      if (obj.from !== obj.to) {
        this.activeData = tempActiveData
        this.activeId = this.idGlobal
      }
    },
    addComponent(item, event) {
      const clone = this.cloneComponent(item)
      this.drawingList.push(clone)
      this.activeFormItem(clone, event)
    },
    cloneComponent(origin) {
      const clone = deepClone(origin)
      const config = clone.componentConfig
      const configObj = packageJSON[config.tag].config || {}
      this.package.configObj = configObj
      clone.props = parseComponent(configObj)
      config.span = this.formConf.span
      this.createIdAndKey(clone)
      tempActiveData = clone
      return tempActiveData
    },
    createIdAndKey(item) {
      const config = item.componentConfig
      config.formId = ++this.idGlobal
      item.componentName = config.tag
      item.id = uuid(6, '', 'node').replace('-', '_')
      if (item.props && item.props.advanced) {
        item.props.advanced.fieldId = identifiesField(item.componentName)
      }
      config.renderKey = +new Date() // 改变renderKey后可以实现强制更新组件
      if (config.layout === 'colFormItem') {
        item.__vModel__ = `field${this.idGlobal}`
      } else if (config.layout === 'rowFormItem') {
        config.componentName = `row${this.idGlobal}`
        !Array.isArray(config.children) && (config.children = [])
        delete config.label // rowFormItem无需配置label属性
      } else if (config.layout === 'form') {
        item.props.formRef = uuid(6, '', 'elForm_').replace('-', '')
        item.props.formModel = uuid(6, '', 'formModel_').replace('-', '')
        item.props.formRules = uuid(6, '', 'formRules_').replace('-', '')
      }

      if (Array.isArray(config.children)) {
        config.children = config.children.map(childItem => this.createIdAndKey(childItem))
      }
      return item
    },
    AssembleFormData() {
      this.formData = this.schemaConfig
    },
    generate(data) {
      debugger
      const func = this[`exec${titleCase(this.operationType)}`]
      this.generateConf = data
      func && func(data)
    },
    execRun(data) {
      this.AssembleFormData()
      this.drawerVisible = true
    },
    execDownload(data) {
      const codeStr = this.generateCode()
      const blob = new Blob([codeStr], { type: 'text/plain;charset=utf-8' })
      saveAs(blob, data.fileName)
    },
    execCopy(data) {
      document.getElementById('copyNode')
        .click()
    },
    empty() {
      this.$confirm('确定要清空所有组件吗？', '提示', { type: 'warning' })
        .then(
          () => {
            this.drawingList = []
            this.idGlobal = 100
          }
        )
    },
    drawingItemCopy() {
      let clone = deepClone(this.activeData)
      clone = this.createIdAndKey(clone)
      this.activeData.parent.push(clone)
      this.activeFormItem(clone)
    },
    drawingItemDelete() {
      if (this.activeData && this.activeData.parent) {
        this.activeData.parent.splice(this.activeData.index, 1)
      } else {
        this.activeData.parent = []
        const parentId = this.activeData.id

        console.log(this.activeData)
      }

      this.$nextTick(() => {
        const len = this.drawingList.length
        if (len) {
          this.activeFormItem(this.drawingList[len - 1])
        }
      })
    },
    generateCode() {
      const { type } = this.generateConf
      this.AssembleFormData()
      const script = vueScript(makeUpJs(this.formData, type))
      const html = vueTemplate(makeUpHtml(this.formData, type))
      // const css = cssStyle(makeUpCss(this.formData))
      return beautifier.html(html + script, beautifierConf.html)
    },
    run() {
      this.dialogVisible = true
      this.showFileName = false
      this.operationType = 'run'
    },
    copy() {
      this.dialogVisible = true
      this.showFileName = false
      this.operationType = 'copy'
    },
    handleChange(val) {
      this.activeData.props[val.keyChain.join('.')] = val.value
      this.$set(this.activeData.props, val.keyChain.join('.'), val.value)
      console.log('new SchemeConfig', this.schemaConfig)
      this.getSourceCode = this.schemaConfig
    },
    updateDrawingList(newTag, list) {
      const index = list.findIndex(item => item.componentConfig.formId === this.activeId)
      if (index > -1) {
        list.splice(index, 1, newTag)
      } else {
        list.forEach(item => {
          if (Array.isArray(item.componentConfig.children)) this.updateDrawingList(newTag, item.componentConfig.children)
        })
      }
    },
    refreshJson(data) {
      this.drawingList = deepClone(data)
      // delete data.fields
      this.formConf = data
    }
  }
}
</script>

<style lang='scss'>
  @import '@/styles/home';
  @import "@/styles/design";
  #empty-root-view-container {
    height: 100%;
    width: 100%;
    position: absolute;
    background: url(https://img.alicdn.com/tps/TB19YxvOVXXXXXqapXXXXXXXXXX-364-220.png) 50%;
    background-repeat: no-repeat;
    -webkit-background-size: 182px auto;
    background-size: 182px auto;
    top: 0px;
  }
  .engine-selected-outline {
    outline: 2px solid var(--color-brand-light,#197aff);
    z-index: 1;
    outline-offset: -2px;
  }
</style>
