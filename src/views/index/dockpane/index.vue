<template>
  <div class="engine-pane engine-dockpane">
    <div class="engine-dockpane-docks">
      <div class="engine-dockpane-docks-top">
        <div class="engine-dock">
          <div class="engine-docktray " :class="currentIndex === 0 ? 'engine-active': ''" @click="handlerMenuDock(0)">
            <el-tooltip class="item" effect="dark" content="组件" placement="right">
              <div class="engine-dock-menu">
                <svg fill="currentColor" preserveAspectRatio="xMidYMid meet" width="30" height="30"
                     viewBox="0 0 1024 1024" class="ve-svgicon" style="vertical-align: middle;"
                >
                  <path
                    d="M128 64h288a64 64 0 0 1 64 64v288a64 64 0 0 1-64 64H128a64 64 0 0 1-64-64V128a64 64 0 0 1 64-64z m32 64a32 32 0 0 0-32 32v224a32 32 0 0 0 32 32h224a32 32 0 0 0 32-32V160a32 32 0 0 0-32-32H160z m448-64h288a64 64 0 0 1 64 64v288a64 64 0 0 1-64 64h-288a64 64 0 0 1-64-64V128a64 64 0 0 1 64-64z m32 64a32 32 0 0 0-32 32v224a32 32 0 0 0 32 32h224a32 32 0 0 0 32-32V160a32 32 0 0 0-32-32h-224z m-32 416h288a64 64 0 0 1 64 64v288a64 64 0 0 1-64 64h-288a64 64 0 0 1-64-64v-288a64 64 0 0 1 64-64z m32 64a32 32 0 0 0-32 32v224a32 32 0 0 0 32 32h224a32 32 0 0 0 32-32v-224a32 32 0 0 0-32-32h-224zM128 544h288a64 64 0 0 1 64 64v288a64 64 0 0 1-64 64H128a64 64 0 0 1-64-64v-288a64 64 0 0 1 64-64z m32 64a32 32 0 0 0-32 32v224a32 32 0 0 0 32 32h224a32 32 0 0 0 32-32v-224a32 32 0 0 0-32-32H160z"
                  />
                </svg>
              </div>
            </el-tooltip>
            <slate v-if="currentIndex === 0" id="components" title="组件" @close="handlerMenuDock(-1)">
              <div class="engine-trunklist engine-trunklist-components">
                <trunk-list :components="components" :add-component="addComponent" :clone-component="cloneComponent" />
              </div>
            </slate>
          </div>
        </div>
        <!-- <div class="engine-dock">
          <div class="engine-docktray" :class="currentIndex === 1 ? 'engine-active': ''" @click="handlerMenuDock(1)">
            <el-tooltip class="item" effect="dark" content="数据源" placement="right">
              <div class="engine-dock-menu">
                <DataPool />
              </div>
            </el-tooltip>
            <slate v-if="currentIndex === 1" id="datasource" @close="handlerMenuDock(-1)">
              <div class="engine-datapool" style="width: 710px">
                <data-pools />
                <data-remote/>
                <global-config :config="pageDataSource.globalConfig" />
              </div>
            </slate>
          </div>
        </div> -->
        <!-- <div class="engine-dock">
          <div class="engine-docktray" :class="currentIndex === 2 ? 'engine-active': ''" @click="handlerMenuDock(2)">
            <el-tooltip class="item" effect="dark" content="页面JS" placement="right">
              <div class="engine-dock-menu" data-tip="动作面板">
                <svg fill="currentColor"
                     preserveAspectRatio="xMidYMid meet"
                     width="30"
                     height="30"
                     viewBox="0 0 1024 1024"
                     class="ve-svgicon"
                     style="vertical-align: middle;"
                >
                  <path
                    d="M726.4 515.2c-12.8-6.4-41.6-16-83.2-28.8-28.8-9.6-48-16-54.4-19.2-16-6.4-22.4-19.2-22.4-32 0-16 6.4-25.6 19.2-32 9.6-6.4 25.6-9.6 44.8-9.6 22.4 0 41.6 3.2 54.4 12.8 12.8 9.6 19.2 22.4 25.6 41.6h51.2c-3.2-35.2-16-57.6-38.4-73.6-22.4-16-51.2-22.4-89.6-22.4-35.2 0-64 6.4-86.4 22.4-25.6 16-35.2 38.4-35.2 64s12.8 48 35.2 60.8c9.6 6.4 35.2 12.8 73.6 25.6 35.2 9.6 54.4 16 60.8 19.2 19.2 9.6 28.8 22.4 28.8 38.4 0 12.8-6.4 22.4-19.2 32-12.8 6.4-32 12.8-54.4 12.8-25.6 0-44.8-3.2-57.6-12.8-12.8-9.6-22.4-25.6-25.6-51.2h-51.2c3.2 38.4 16 67.2 44.8 86.4 22.4 16 54.4 22.4 92.8 22.4 41.6 0 73.6-9.6 96-22.4 22.4-16 32-38.4 32-64 0-32-12.8-54.4-41.6-70.4zM406.4 563.2c0 22.4-3.2 38.4-12.8 48-9.6 9.6-22.4 16-38.4 16-32 0-48-19.2-48-54.4v-9.6H256v12.8c0 28.8 9.6 54.4 25.6 70.4 16 16 41.6 25.6 73.6 25.6 38.4 0 64-9.6 80-25.6s22.4-41.6 22.4-80v-208h-51.2v204.8z"
                  />
                  <path
                    d="M896 128H128c-35.2 0-64 28.8-64 64v640c0 35.2 28.8 64 64 64h768c35.2 0 64-28.8 64-64V192c0-35.2-28.8-64-64-64z m0 672c0 16-12.8 32-32 32H160c-19.2 0-32-16-32-32V224c0-16 12.8-32 32-32h704c19.2 0 32 16 32 32v576z"
                  />
                </svg>
              </div>
            </el-tooltip>
            <div v-if="currentIndex === 2" class="engine-slate engine-slate-bottom" style="width: 100%; height: 300px;">
              <div class="engine-slate-content">
                <action-pane :value="actions.module.source" @close="handlerMenuDock(-1)" />
              </div>
            </div>
          </div>
        </div> -->
        <div class="engine-dock">
          <div class="engine-docktray" :class="currentIndex === 3 ? 'engine-active': ''" @click="handlerMenuDock(3)">
            <div class="engine-dock-menu" data-tip="页面管理">
              <svg fill="currentColor" preserveAspectRatio="xMidYMid meet" width="30" height="30"
                   viewBox="0 0 1024 1024" class="ve-svgicon" style="vertical-align: middle;"
              >
                <path
                  d="M576 448l-64 0 0-64L512 128c-91.212 0-287 0-287 0-17.672 0-32 14.326-32 32l0 704c0 17.674 14.328 32 32 32l576 0c17.672 0 32-14.326 32-32 0 0 0-300.605 0-416L576 448zM576 384l255.045 0c-6.257-49.186-26.765-60.72-50.043-83.998-26.377-26.376-44.635-44.635-56.93-56.93 0.004 0.004 0.009 0.009 0.013 0.014-0.027-0.028-0.062-0.062-0.09-0.09 0.024 0.025 0.052 0.052 0.077 0.077-0.242-0.242-0.513-0.512-0.81-0.809-10.642-10.642-16.656-16.656-19.525-19.525-0.297-0.297-0.567-0.567-0.81-0.809 0.025 0.025 0.053 0.052 0.077 0.077-0.028-0.028-0.062-0.062-0.09-0.09 0.004 0.004 0.009 0.009 0.013 0.014-12.295-12.295-30.553-30.554-56.93-56.93-18.663-18.664-33.207-31.254-69.998-35.454L575.999 384z"
                />
              </svg>
            </div>
            <slate v-if="currentIndex === 3" id="pages">
              <Page @selectPage="handlerPage"/>
            </slate>
          </div>
        </div>
      </div>
      <div class="engine-dockpane-docks-bottom">
        <div class="engine-dock">
          <div class="engine-docktray" :class="codeActive ? 'engine-active': ''">
            <div class="engine-dock-menu" data-tip="页面源码" data-dir="right" @click.stop="handlerCodeDock">
              <Code />
            </div>
            <slate id="pageCode" title="页面源码" style="width: 720px">
              <div class="dataProcess">
                <editor ref="editor" class="monaco-export-schema-editor" :value="sourceCode" :editor-config="editorConfig" custom-style="height: calc(100% - 80px);" />
              </div>
            </slate>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import CloseIcon from '@/components/SvgIcon/close'
import DataPool from '@/components/SvgIcon/datapool'
import Code from '@/components/SvgIcon/code'
import TrunkList from './trunklist'
import Slate from './slate'
import GlobalConfig from '../datasource/globalConfig'
import DataPools from '../datasource'
import Page from '../page'
import Editor from '@/components/editor'
import ActionPane from '@/components/action-pane'
import DataRemote from '../datasource/datapool'

export default {
  components: {
    CloseIcon,
    TrunkList,
    Slate,
    GlobalConfig,
    DataPool,
    Code,
    DataPools,
    Page,
    Editor,
    ActionPane,
    DataRemote
  },
  props: {
    components: {
      type: Array,
      default: []
    },
    addComponent: {
      type: Function,
      default() {

      }
    },
    cloneComponent: {
      type: Function,
      default() {

      }
    },
    onEnd: {
      type: Function,
      default() {

      }
    },
    sourceCode: {
      type: String,
      default: ''
    },
    pageDataSource: {
      type: Object,
      default() {
        return {}
      }
    },
    actions: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      currentIndex: -1,
      codeActive: false,
      editorConfig: {}
    }
  },
  mounted() {
    const simulator = document.querySelector('.engine-simulator')
    if (simulator) {
      simulator.addEventListener('mousedown', event => {
        const componentEl = document.querySelector('#components')
        const pageCode = document.querySelector('#pageCode')
        const pages = document.querySelector('#pages')
        const datasource = document.querySelector('#datasource')
        if (componentEl && !componentEl.contains(event.target)) {
          this.handlerMenuDock(-1)
        }
        if (pages && !pages.contains(event.target)) {
          this.handlerMenuDock(-1)
        }

        if (datasource && !datasource.contains(event.target)) {
          this.handlerMenuDock(-1)
        }

        if (pageCode && !pageCode.contains(event.target)) {
          this.codeActive = false
        }
      })
    }
  },
  methods: {
    handlerMenuDock(index) {
      this.currentIndex = index
    },
    handlerCodeDock() {
      this.codeActive = !this.codeActive
      if (this.codeActive) {
        this.editorConfig = {
          value: this.sourceCode,
          language: 'json'
        }
        this.$refs.editor.initMonaco()
      }
    },
    handlerPage(id) {
      this.$emit("selectPage", id)
    }
  }
}
</script>
