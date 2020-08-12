
<script type="application/ecmascript">
import Block from '@/components/block'
import InlineField from '@/components/filed-layout/inline-filed'
import Validation from '@/components/validation'
import VCButton from '@/components/button'
import EventList from '@/components/event-list'
import BodyField from '@/components/body-field'
import ListItem from '@/components/list-item'
import EngineSwitch from '@/components/switch'
import ChoiceGroup from '../../../components/choice-control/choice-group'
import ChoiceItem from '../../../components/choice-control/choice-item'
import PageAction from '../pageConfig'
import EventConfig from '../actionSettingControl'
import Dialog from '@/components/dialog'
import Action from '@/components/action'
import ActionSetter from '@/components/action-setter'
import StyleLayout from '@/components/style-layout'
import ActionSettingControl from '../actionSettingControl'
import EventSetter from '@/components/event-setter'
import ValidationSetter from '@/components/validation-setter'
import ListSetter from '@/components/list-setter'
import OptionsSetter from '@/components/options-setter'
import IconSetter from '@/components/icon-setter'
import Accordion from '@/components/accordion'
import EntryField from '@/components/entry-field'
import BoolControl from '@/components/bool-control'
import ColorControl from '@/components/color-control'

import { Sketch } from 'vue-color'
import _ from 'lodash'

const supportTypes = ['page', 'global', 'custom']
const customSupportTypes = ['builtIn', 'page']
const display = {
  "group": Accordion,
  "entry": EntryField

}
export default {
  components: {
    ChoiceGroup,
    ChoiceItem,
    Block,
    InlineField,
    Validation,
    VCButton,
    EventList,
    BodyField,
    ListItem,
    EngineSwitch,
    PageAction,
    EventConfig,
    Dialog,
    Action,
    ActionSetter,
    StyleLayout,
    ActionSettingControl,
    EventSetter,
    ValidationSetter,
    OptionsSetter,
    ListSetter,
    IconSetter,
    Accordion,
    EntryField,
    BoolControl,
    ColorControl,
    SketchPicker: Sketch
  },
  props: {
    params: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      configObj: this.params.config,
      valueObj: this.params.value,
      currentEvent: '',
      dialogConfig: {
        eventVisible: false,
        title: ''
      },
      isNewAction: !0,
      supportTypes: ['page', 'global', 'custom'],
      customSupportTypes,
      visible: false
    }
  },
  computed: {
    isBindEvent() {
      return val => {
        console.log('val', val)
        if (val && !val.hasOwnProperty('source')) {
          return false
        }
        return !_.isString(val) && _.isObject(val)
      }
    }
  },
  watch: {
    params(newVal, oldVal) {
      if (newVal !== oldVal) {
        this.configObj = newVal.config
        this.valueObj = newVal.value
      }
    }

  },
  mounted() {
    console.log('params', this.params)
  },
  methods: {
    handleChange(value, keyChain) {
      debugger
     this.params && this.params.handleValueChange && this.params.handleValueChange(value, undefined, keyChain)
    },
    selectEvent(event) {
      this.visible = !this.visible
    },
    handleEvent(configObj, valueObj) {
      this.dialogConfig = {
        title: configObj.name,
        eventVisible: !this.dialogConfig.eventVisible,
        defaultCode: valueObj && valueObj.source || configObj.default,
        actionType: configObj.eventType,
        defaultActionName: configObj.actionName,
        supportActionParam: false,
        supportTypes: ['page', 'global', 'custom']
      }
    },
    handleActionEditor(item, configObj, valueObj) {
      console.log(item, configObj, valueObj)
      this.handleEvent(configObj, valueObj)
    },
    handleDeleteAction(item, configObj, valueObj) {
      this.handleChange('')
    },
    handleCustomEvent(item, configObj) {

    },
    handleCloseEvent() {

    },
    handleSubmit() {
      this.$refs.event.handleBindSave()
    },
    handleEventChange(obj) {
      this.handleChange(obj)
    },

    setAction() {

    },
    getEventTypes() {

    },
    getHotValue() {

    },
    setHotValue() {

    },
    addAction() {
      this.isNewAction = !0
      this.currentAction = ''
    },
    editAction() {

    },
    deleteAction() {

    },
    locate() {

    },
    handleDisplay() {
    
      this.params && this.params.handlerDisplay && this.params.handlerDisplay(this.configObj, this.valueObj, this.handleChange)
    },
    renderComposite(createElement, data, rootKey) {
      return (data || []).map((item, index) => {
          if(item.type === 'composite') {
            return (
              <Accordion title={item.title} className="engine-setting-field">
                {
                  item && item.items && this.renderComposite(createElement, item.items, item.name)
                }
              </Accordion>
            )
          }
          return item && item.setter && item.setter.render(createElement, {
            config: item,
            defaultValue: item.defaultValue,
            value:this.valueObj[item.name],
            hotValue: this.valueObj[item.name],
            getPropValue: (key) => this.getPropValue(key),
            setHotValue: (param) => this.handleChange(param, rootKey ? [this.params.key, rootKey, item.name]:[this.params.key, item.name]),
            childrenValue: rootKey ? this.valueObj[rootKey][item.name]: this.valueObj
          })
      })
    },
    getPropValue(key) {
      const prop = this.params.getRootValue()
      return prop[key]
    }
  },
  render(createElement) {
    const configObj = this.configObj
    const component = display[configObj.type]
    return (<div>
      {
        this.configObj.type === 'el-input' && (
          <inline-field  class-names="engine-setting-field engine-inline-field" title={this.configObj.name}>  
            <el-input vModel={this.valueObj} {...{on:{input: (param) => this.handleChange(param)}}}/>
          </inline-field>)
      }

      {
        this.configObj.type === 'el-switch' && (
          <inline-field class-names="engine-setting-field engine-inline-field" title={this.configObj.name}>
              <engine-switch value={this.valueObj} {...{on:{change: (param) => this.handleChange(param)}}}/>
          </inline-field>)
      }

      {
         this.configObj.type === 'el-input-number' && (
           <inline-field class-names="engine-setting-field engine-inline-field" title={this.configObj.name}>
              <el-input vModel={this.valueObj} type="number" {...{on:{input: (param) => this.handleChange(param)}}} />
           </inline-field>
         )
      }


      {
        this.configObj.type === 'el-slider' && (
          <inline-field class-names="engine-setting-field engine-inline-field" title={this.configObj.name}>
              <el-slider vModel={this.valueObj} max={24} min={1} style="width: 180px" {...{on:{change: (param) => this.handleChange(param)}}}/>
          </inline-field>
        )
      }

      {
        this.configObj.type === 'el-select' && (
          <inline-field class-names="engine-setting-field engine-inline-field" title={this.configObj.name}>
              <el-select vModel={this.valueObj} {...{on:{change: (param) => this.handleChange(param)}}}>
                {
                  configObj.options.map((item, index) => {
                    return (
                       <el-option
                          key={index}
                          label={item.text}
                          value={item.value}
                        />
                    )
                  })
                }
              </el-select>
            </inline-field>
          )
      }
      {
       this.configObj.type === 'customEvent' && ( 
            <div class="ve-event-setter">
              <div class="ve-event-add-action">
                <EventSetter events={this.configObj.events} value={this.valueObj} />
              </div>
            </div>
       )
      }

      {
       this.configObj.type === 'choice' && (
          <inline-field class-names="engine-setting-field engine-inline-field" title={this.configObj.name}>
            <choice-group value={this.valueObj} style="width: 180px" {...{on:{change: (param) => this.handleChange(param)}}}>
              {
                this.configObj.options.map((item, index) => {
                  return (
                    <choice-item key={index} label={item.value}>{item.text}</choice-item>
                  )
                })
              }
            </choice-group>
          </inline-field>
       )
      }

      {
        this.configObj.type === 'list-item' && (<list-item value={this.valueObj} title={this.configObj.name} {...{on:{input: (param) => this.handleChange(param)}}} />)
      }


      {
        this.configObj.type === 'reg' && (
          <Accordion title={this.configObj.name} className="engine-setting-field">
              <ValidationSetter supports={this.configObj.supports} value={this.valueObj} {...{on:{change: (param) => this.handleChange(param)}}}/>
          </Accordion>
        )
      }

      {
        this.configObj.type === 'style' && (
          <Accordion title={this.configObj.name} className="engine-setting-field">
            <style-layout />
          </Accordion>
        )
      }

      {
       this.configObj.type === 'event' && (
         <Block title={this.configObj.name}>
              <action-setter title={this.configObj.name}
                            support-types={this.supportTypes}
                            default-action-name={this.configObj.actionName}
                            default-code={this.valueObj && this.valueObj.source || this.configObj.default} handleChange={(params) => this.handleChange(params)}
              />
        </Block>)
      }

      {
        this.configObj.type === 'composite' && (
          <div>
            {
              this.renderComposite(createElement,this.configObj.items || this.configObj.configure)
            }
          </div>
        )
      }


      {
        this.configObj.type === 'entry' && (
          <EntryField title={this.configObj.name} className="engine-setting-field" {...{on:{click: (event) => this.handleDisplay()}}}></EntryField>
        )
      }
      {
        this.configObj.type === 'icon' && (
            <inline-field class-names="engine-setting-field engine-inline-field" title={this.configObj.name}>
               <IconSetter value={this.valueObj} {...{on:{select: (event) => this.handleDisplay()}}}></IconSetter>
            </inline-field>
        )
      }

      {
        this.configObj.type === 'accordion' && (
          <Accordion title={this.configObj.name} className="engine-setting-field">
            {
              this.configObj.setter && this.configObj.setter.render && this.configObj.setter.render(createElement)
            }
          </Accordion>
        )
      }

      {
        this.configObj.type === 'block' && this.configObj.setter && this.configObj.setter.render && this.configObj.setter.render(createElement, {
          value: this.valueObj,
          handleChange: this.handleChange,
          keyChain: ["advanced", "renderLabel"]
        })
      }

      {
        this.configObj.type === 'color' &&  (
          <inline-field title={this.configObj.name} class-names="engine-setting-field engine-inline-field">
            <ColorControl value={this.valueObj} handleChange={(value) => this.handleChange(value)}></ColorControl>
          </inline-field>
        )
      }
      
       
    </div>)
  }
}
</script>
