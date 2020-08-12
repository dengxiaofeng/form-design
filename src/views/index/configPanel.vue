<script>
import { isArray } from 'util'
import TreeNodeDialog from '@/views/index/TreeNodeDialog'
import EventDialog from '@/views/index/eventDialog'
import { isNumberStr } from '@/utils/index'
import IconsDialog from './IconsDialog'
import Action from '@/components/action'
import Block from '@/components/block'
import TextInput from '@/components/text'
import Field from '@/components/filed-layout/inline-filed'
import ListItem from '@/components/list-item'
import VCButton from '@/components/button'
import ChoiceGroup from '@/components/choice-control/choice-group'
import ChoiceItem from '@/components/choice-control/choice-item'
import InlineField from '@/components/filed-layout/inline-filed'
import IconList from '@/components/icon-list'
// import StyleLayout from '@/components/style-layout'
import {
  inputComponents, selectComponents, layoutComponents
} from '@/components/generator/config'
import { saveFormConf } from '@/utils/db'
import ParseComponent from './parse/index'


// 使changeRenderKey在目标组件改变时可用
const needRerenderList = ['tinymce']

export default {
  components: {
    TreeNodeDialog,
    IconsDialog,
    Action,
    Block,
    TextInput,
    EventDialog,
    Field,
    ListItem,
    VCButton,
    ParseComponent,
    ChoiceGroup,
    ChoiceItem,
    InlineField,
    IconList
    // StyleLayout
  },
  props: ['showField', 'activeData', 'formConf', 'configObj'],
  data() {
    return {
      currentTab: 'field',
      currentNode: null,
      dialogVisible: false,
      eventVisible: false,
      iconsVisible: false,
      currentIconModel: null,
      display: false,
      childConfig: {},
      childValue: "",
      setOnSync: ""
    }
  },
  watch: {
    formConf: {
      handler(val) {
        saveFormConf(val)
      },
      deep: true
    }
  },
  methods: {
    handlerChange(val, key) {
      this.$emit('change', val)
    },
    handlerAddEvent() {
      this.eventVisible = true
    },
    handleDisplay(config, valueObj, callback) {
      this.display = !this.display
      this.childConfig = config
      this.childValue = valueObj
      this.setOnSync = callback
    }
  },
  render(createElement) {
    return (
      <div class="engine-pane engine-tabpane engine-single">
          <div class="engine-tabs">
            <div class="engine-tab engine-active">设置</div>
          </div>
          <div class="engine-tab-contents">
              <div class="engine-tab-content engine-tabcontent-settings engine-visible">
                <div class="engine-settings">
                    <div class="engine-navigator">
                      <div class="engine-navigator-path">
                        <div class="ve-icon-button ve-icon-button-default engine-toggle-tree">
                          <span class="ve-icon-contents">大纲树</span>
                        </div>
                        <div class="engine-navigator-segment">
                          <a class="engine-segment-title">页面</a>
                        </div>
                      </div>
                    </div>
                     <div class="engine-settings-content">
                        <div class={this.display? 'engine-settings-stage engine-stageout-left': 'engine-settings-stage'}>
                            <div class="engine-stage-content">
                              <parse-component config-obj={this.configObj} value-obj={this.activeData.props} onChange={(param) => this.handlerChange(param)} handlerDisplay={(config, valueObj, callback) => this.handleDisplay(config, valueObj, callback)}/>
                            </div>
                        </div>
                        <div class={!this.display ? 'engine-settings-stage engine-has-backer engine-stageout-right': 'engine-settings-stage engine-has-backer'}>
                            <div class="engine-settings-stagebacker">
                              <svg fill="currentColor" preserveAspectRatio="xMidYMid meet" onClick={() => this.handleDisplay({})} width="12px" height="12px" viewBox="0 0 1024 1024" class="ve-svgicon engine-field-arrow" style="vertical-align: middle;" data-spm-anchor-id="0.0.0.i20.b2b37783qklmht"><path d="M512.002047 771.904425c-10.152221 0.518816-20.442588-2.800789-28.202319-10.598382L77.902254 315.937602c-14.548344-14.618952-14.548344-38.318724 0-52.933583 14.544251-14.614859 38.118156-14.614859 52.662407 0l381.437385 418.531212L893.432269 263.004019c14.544251-14.614859 38.125319-14.614859 52.662407 0 14.552437 14.614859 14.552437 38.314631 0 52.933583L540.205389 761.307066C532.451798 769.103636 522.158361 772.424264 512.002047 771.904425z"></path></svg>
                              <span class="engine-field-title">{this.childConfig.name}</span>
                            </div>
                            <div class="engine-stage-content">
                              {
                                this.childConfig.items && this.childConfig.items.map(item => {
                                  return item.setter.render(createElement)
                                })
                              }
                              {
                                this.childConfig.setter && this.childConfig.setter.render(createElement, {value: this.childValue, handlerSelect: (event) => this.setOnSync(event) })
                              }
                            </div>
                        </div>
                </div>
                </div>
              </div>
          </div>
      </div>
    )
  }
}
</script>

<style lang="scss" scoped>
.right-board {
  /*width: 350px;*/
  position: absolute;
  right: 0;
  top: 0;
  left: 0;
  padding-top: 3px;
  .field-box {
    position: relative;
    height: 100%;
    box-sizing: border-box;
    overflow: hidden;
  }
  .el-scrollbar {
    height: 100%;
  }
}
.right-board {
  ::v-deep .el-input__inner {
    height: 28px!important;
    line-height: 28px!important;
    /*width: 180px;*/
  }
  ::v-deep .el-collapse-item__header {
    color: rgba(0,0,0,.6) !important;
    background-color: rgba(31,56,88,.06) !important;
    height: 32px!important;
    line-height: 32px!important;
    padding-left: 10px;
  }
  ::v-deep .el-collapse {
    margin-bottom: 6px;
    .el-collapse-item__content {
      padding-bottom: 0px!important;
    }
  }
}
.select-item {
  display: flex;
  border: 1px dashed #fff;
  box-sizing: border-box;
  & .close-btn {
    cursor: pointer;
    color: #f56c6c;
  }
  & .el-input + .el-input {
    margin-left: 4px;
  }
}
.select-item + .select-item {
  margin-top: 4px;
}
.select-item.sortable-chosen {
  border: 1px dashed #409eff;
}
.select-line-icon {
  line-height: 32px;
  font-size: 22px;
  padding: 0 4px;
  color: #777;
}
.option-drag {
  cursor: move;
}
/*.time-range {*/
/*  .el-date-editor {*/
/*    width: 227px;*/
/*  }*/
/*  ::deep .el-icon-time {*/
/*    display: none;*/
/*  }*/
/*}*/
.document-link {
  position: absolute;
  display: block;
  width: 26px;
  height: 26px;
  top: 0;
  left: 0;
  cursor: pointer;
  background: #409eff;
  z-index: 1;
  border-radius: 0 0 6px 0;
  text-align: center;
  line-height: 26px;
  color: #fff;
  font-size: 18px;
}
.node-label{
  font-size: 14px;
}
.node-icon{
  color: #bebfc3;
}
</style>
