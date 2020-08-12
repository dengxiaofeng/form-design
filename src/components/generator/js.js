import { isArray } from "util";

import {
  deepClone,
  exportDefault
} from "@/utils/index";

import ruleTrigger from "./ruleTrigger";

const units = {
  KB: '1024',
  MB: '1024 / 1024',
  GB: '1024 / 1024 / 1024'
}
let confGlobal
const inheritAttrs = {
  file: '',
  dialog: 'inheritAttrs: false,'
}

/**
 * 组装js 【入口函数】
 * @param {Object} formConfig 整个表单配置
 * @param {String} type 生成类型，文件或弹窗等
 */
function PageConfig(config) {
  this.config = config
}

PageConfig.prototype.getPage = function () {
  return this.config.pages[0]
}

PageConfig.prototype.getActions = function () {
  return this.config.actions
}

PageConfig.prototype.globalDataSource = function () {
  return this.getPage().dataSource
}

PageConfig.prototype.globalParams = function () {
  return this.getPage().params
}

PageConfig.prototype.getPageLayout = function () {
  return this.getPage().layout
}

PageConfig.prototype.getHeader = function () {
  return this.getPageLayout().children[0]
}
PageConfig.prototype.getContent = function () {
  return this.getPageLayout().children[1]
}
PageConfig.prototype.getFooter = function () {
  return this.getPageLayout().children[2]
}
function pageLifeciryMethod(layoutProps, methodList, pageMountMethods, pageWillMountMethods) {
  console.log('layoutProps', layoutProps)
  const { didMount, willUnMount, willMount } = layoutProps.advanced
  if (willMount) {
    methodList.push(willMount.source.replace(/function/, ''))
  }
  if (didMount) {
    methodList.push(didMount.source.replace(/function/, ''))
    pageMountMethods.push('this.didMount()')
  }

  if (willUnMount) {
    methodList.push(willUnMount.source.replace(/function/, ''))
    pageWillMountMethods.push('this.willUnMount()')
  }
}
function transformNormalData(data) {
  if (!data) {
    return []
  }
  return data.substr(0, data.length - 1)
}
let formField = ''
let formRule = ''
export function makeUpJs(formConfig, type) {
  const pageConfig = new PageConfig(formConfig)
  console.log('formConfig', formConfig)
  confGlobal = formConfig = deepClone(formConfig)
  formConfig = confGlobal.pages[0].layout.children[1]

  const dataList = []
  const ruleList = []
  const optionsList = []
  const propsList = []
  const methodList = []
  const uploadVarList = []

  const pageMountMethods = []

  const pageWillMountMethods = []

  const layoutProps = pageConfig.getPageLayout().props

  // 页面加载事件
  pageLifeciryMethod(layoutProps, methodList, pageMountMethods, pageWillMountMethods)

  /**
   * 1、表单 验证
   * 2、非表单
   * @type {Array}
   */
  const dataNormal = []
  const formNormal = []
  const formRules = []
  console.log(pageConfig.getContent())
  pageConfig.getContent().children.forEach((el, index) => {
    debugger
    if (el.componentName === 'el-form') {
      formField = el.props.formModel
      formRule = el.props.formRules
      const { data, rules } = buildAttributes(el, dataList, ruleList, optionsList, methodList, propsList, uploadVarList, formField, formRule)
      let genformField = []
      let genNormalField = []
      data.map(item => {
       genformField.push(...item.formField)
       genNormalField.push(...item.normalField)
      })

      if (data && Array.isArray(genformField) && genformField.length > 0) {
        formNormal.push(`${formField}:{${[...genformField].join('\n')}},`)
      }
      if(data && Array.isArray(genNormalField) && genNormalField.length > 0) {
        dataNormal.push(...genNormalField)
      }
      if (rules && rules.length > 0) {
        formRules.push(`${formRule}:{${[...rules].join('\n')}}`)
      }
      if (el.props.formRef) {
        methodList.push(mixinMethod(el.props.formRef))
      }
      console.log("formNormal", formNormal)
      console.log("dataNormal", dataNormal)
    } else {
      const {
        data, formModel, rules, formRuleObj, formRef
      } = buildAttributes(el, dataList, ruleList, optionsList, methodList, propsList, uploadVarList)
      if (formRuleObj) {
        formRule = formRuleObj
      }

      if (formModel !== '') {
        formNormal.push(`${formModel}:{${[...data.normalField, ...data.formField].join('\n')}},`)
      }
      if (formRuleObj !== '') {
        formRules.push(`${formRule}:{${[...rules].join('\n')}}`)
      }
      if (formRef) {
        methodList.push(mixinMethod(formRef))
      }
      if (formModel === '' && data) {
        dataNormal.push(...data.normalField, ...data.formField)
      }
    }
  })

  const script = buildexport(
    formConfig,
    type,
    formNormal.length > 0 ? transformNormalData(formNormal.concat(dataNormal).join('\n')) : transformNormalData(dataNormal.join('\n')),
    formRule && (formRules.length > 0 ? Array.from(formRules).join('\n') : [`${formRule}:{}`].join('\n')),
    optionsList.join('\n'),
    uploadVarList.join('\n'),
    propsList.join('\n'),
    methodList.join(',\n'),
    pageMountMethods.join('\n'),
    pageWillMountMethods.join('\n')
  )
  confGlobal = null
  return script
}

// 构建组件属性
function buildAttributes(scheme, dataList, ruleList, optionsList, methodList, propsList, uploadVarList, formField, formRule) {
  const config = scheme.componentConfig
  let _formModel_ = ''
  let _formRuleObj_ = ''
  let _formRef_ = ''
  const data = buildData(scheme, dataList, formField)
  const rules = buildRules(scheme, ruleList) || []
  if (scheme.componentName === 'el-form') {
    _formModel_ = scheme.props.formModel
    _formRuleObj_ = scheme.props.formRules
    _formRef_ = scheme.props.formRef
  }



  // 特殊处理options属性
  // if (scheme.options || (slot && slot.options && slot.options.length)) {
  //   buildOptions(scheme, optionsList)
  //   if (config.dataType === 'dynamic') {
  //     const model = `${scheme.__vModel__}`
  //     // Options
  //     const options = titleCase(model)
  //     buildOptionMethod(`get${options}`, model, methodList, scheme)
  //   }
  // }

  // 处理props && scheme.props.props

  // if (scheme.props) {
  //   buildProps(scheme, propsList)
  // }

  // 处理el-upload的action
  // if (scheme.action && config.tag === 'el-upload') {
  //   uploadVarList.push(
  //     `${scheme.__vModel__}Action: '${scheme.action}',
  //     ${scheme.__vModel__}fileList: [],`
  //   )
  //   methodList.push(buildBeforeUpload(scheme))
  //   // 非自动上传时，生成手动上传的函数
  //   if (!scheme['auto-upload']) {
  //     methodList.push(buildSubmitUpload(scheme))
  //   }
  // }

  // 构建子级组件属性
  if (config.children) {
    const ret = []
    const _rules_ = []

    config.children.forEach(item => {
      const {
        data, rules, formModel, formRuleObj, formRef
      } = buildAttributes(item, dataList, ruleList, optionsList, methodList, propsList, uploadVarList, formField, formRule || _formRuleObj_)
      // const concatData = [...data.normalField, ...data.formField]
      ret.push(data)
      _rules_.push(...rules)
      if (formModel) {
        _formModel_ = formModel
        _formRuleObj_ = formRuleObj
        _formRef_ = formRef
      }
    })
    return {
      data: ret,
      rules: _rules_,
      formModel: _formModel_,
      formRuleObj: _formRuleObj_,
      formRef: _formRef_
    }
  }

  return {
    data,
    rules,
    formModel: _formModel_,
    formRuleObj: _formRuleObj_,
    formRef: _formRef_
  }
}

// 混入处理函数
function mixinMethod(formRef) {
  const list = []
  const minxins = {
    submitForm: `submitForm() {
          this.$refs['${formRef}'].validate(valid => {
            if(!valid) return
            // TODO 提交表单
          })
        }`,
    resetForm: `resetForm() {
          this.$refs['${formRef}'].resetFields()
        },`
  }
  Object.keys(minxins).forEach(key => {
    list.push(minxins[key])
  })
  return list
}

// 构建data
function buildData(scheme, dataList, formField) {
  debugger
  const ret = {
    formField: [],
    normalField: []
  }
  const config = scheme.componentConfig
  if (scheme.props && scheme.props.advanced && scheme.props.advanced.fieldId === undefined) return
  const defaultValue = JSON.stringify(scheme.props.defaultValue)
  if (scheme.props && scheme.props.advanced) {
    ret.formField.push(`${scheme.props.advanced.fieldId}: ${defaultValue},`)
  }
  if(scheme.props && scheme.props.dataSource) {
    ret.normalField.push(`${scheme.props.advanced.fieldId}_dataSource: ${JSON.stringify(scheme.props.dataSource)},`)
  }
//${JSON.stringify(scheme.props.columns)}
  if(scheme.componentName === 'pro-table') {
    ret.normalField.push(`${scheme.props.advanced.fieldId}_columns: ${JSON.stringify(scheme.props.columns)} ,`)
  }

  return ret
}

const genRule = {
  required: (item, scheme) => {
    return `{ required: true, message: '${item.message ? item.message: '不能为空'}', trigger: '${ruleTrigger[scheme.componentName]}' }`
  },
  minLength: (item, scheme) => {
    return `{min: ${item.param || 10}, message: '${item.message ? item.message: '最小长度为10个字符'}', trigger: '${ruleTrigger[scheme.componentName]}' }`
  },
  maxLength: (item, scheme) => {
    return `{max: ${item.param}, message: '${item.message ? item.message: '最大长度为10个字符'}', trigger: '${ruleTrigger[scheme.componentName]}' }`
  },
  customValidate: (item, scheme) => {
    return `{validator: ${item.param && item.param.source}, trigger: '${ruleTrigger[scheme.componentName]}'}`
  }

}
// 构建校验规则
function buildRules(scheme, ruleList) {
  const ret = []
  const config = scheme.componentConfig
  if (scheme.__vModel__ === undefined) return
  const rules = []
  if (ruleTrigger[scheme.componentName]) {
    // if (scheme.props.required) {
    //   const type = isArray(config.defaultValue) ? 'type: \'array\',' : ''
    //   let message = isArray(config.defaultValue) ? `请至少选择一个${config.label}` : scheme.props.placeholder
    //   if (message === undefined) message = `${config.label}不能为空`
    //   rules.push(`{ required: true, ${type} message: '${message}', trigger: '${ruleTrigger[scheme.componentName]}' }`)
    // }
    if (scheme.props.validation && isArray(scheme.props.validation)) {
      scheme.props.validation.forEach(item => {
        // if(item.type === 'required') {
        //   rules.push( `{ required: true, message: '不能为空', trigger: '${ruleTrigger[scheme.componentName]}' }`)
        // }
        rules.push(genRule[item.type] && genRule[item.type](item, scheme))
       
        // if (item.enable) {
        //   if (item.type === 'required') {
        //     rules.push(
        //       `{ required: true, message: '${item.param.message}', trigger: '${ruleTrigger[config.tag]}' }`
        //     )
        //   }
        //   if (item.type === 'customValidate') {
        //     rules.push(
        //       `{ validator: ${item.param.handler}, trigger: '${ruleTrigger[config.tag]}' }`
        //     )
        //   }
        //   if (item.param && item.param.pattern) {
        //     rules.push(
        //       `{ pattern: ${item.param.pattern}, message: '${item.param.message}', trigger: '${ruleTrigger[config.tag]}' }`
        //     )
        //   } else {
        //     if (item.param && item.param.max) {
        //       rules.push(
        //         `{max: ${item.param.max}, message: '${item.param.message}', trigger: '${ruleTrigger[config.tag]}' }`
        //       )
        //     }
        //     if (item.param && item.param.min) {
        //       rules.push(
        //         `{min: ${item.param.min}, message: '${item.param.message}', trigger: '${ruleTrigger[config.tag]}' }`
        //       )
        //     }
        //   }
        // }
      })
    }
    if (rules.length > 0) {
      ret.push(`${scheme.props.advanced.fieldId}: [${rules.join(',')}],`)
    }
  }
  return ret
}

// 构建options
function buildOptions(scheme, optionsList) {
  if (scheme.__vModel__ === undefined) return
  // el-cascader直接有options属性，其他组件都是定义在slot中，所以有两处判断
  let { options } = scheme
  if (!options) options = scheme.__slot__.options
  if (scheme.componentConfig.dataType === 'dynamic') { options = [] }
  const str = `${scheme.__vModel__}Options: ${JSON.stringify(options)},`
  optionsList.push(str)
}

function buildProps(scheme, propsList) {
  // const str = `${scheme.__vModel__}Props: ${JSON.stringify(scheme.props.props)},`
  const str = `${scheme.__vModel__}Props: ${JSON.stringify(scheme.props)},`
  propsList.push([])
}

// el-upload的BeforeUpload
function buildBeforeUpload(scheme) {
  const config = scheme.componentConfig.valueObj
  const unitNum = units[config.sizeUnit]; let rightSizeCode = ''; let acceptCode = ''; const
    returnList = []
  if (config.fileSize) {
    rightSizeCode = `let isRightSize = file.size / ${unitNum} < ${config.fileSize}
    if(!isRightSize){
      this.$message.error('文件大小超过 ${config.fileSize}${config.sizeUnit}')
    }`
    returnList.push('isRightSize')
  }
  if (scheme.accept) {
    acceptCode = `let isAccept = new RegExp('${scheme.accept}').test(file.type)
    if(!isAccept){
      this.$message.error('应该选择${scheme.accept}类型的文件')
    }`
    returnList.push('isAccept')
  }
  const str = `${scheme.__vModel__}BeforeUpload(file) {
    ${rightSizeCode}
    ${acceptCode}
    return ${returnList.join('&&')}
  },`
  return returnList.length ? str : ''
}

// el-upload的submit
function buildSubmitUpload(scheme) {
  const str = `submitUpload() {
    this.$refs['${scheme.__vModel__}'].submit()
  },`
  return str
}

function buildOptionMethod(methodName, model, methodList, scheme) {
  console.log(scheme)
  const str = `${methodName}() {
    // TODO 发起请求获取数据
    axios({
      method: '${scheme.props.dataSource.searchConfig.fetchMethod}',
      url: '${scheme.props.dataSource.searchConfig.url}',
      transformResponse: [${scheme.props.dataSource.searchConfig.afterFetch}]
    }).then(res => {
      this.${model}Options = res.data
    })
  },`
  methodList.push(str)
}

// js整体拼接
function buildexport(conf, type, data, rules, selectOptions, uploadVar, props, methods, pageMountMethods, pageWillMountMethods) {
  console.log('buildexport conf', conf)
  // function immediatelyLoad(context) {
  //   debugger
  //   console.log(conf)
  //   const field = conf.fields
  //   const componentMethods = {}
  //   for (let i = 0; i < field.length; i++) {
  //     // eslint-disable-next-line no-shadow
  //     const params = field[i] && field[i].props
  //     if (params && params.dataSource.searchConfig.fetchData) {
  //       const method = `get${titleCase(field[i].__vModel__)}`
  //       componentMethods[`get${titleCase(field[i].__vModel__)}`] = method
  //     }
  //   }
  //   let callMethod = ''
  //   Object.keys(componentMethods).forEach(item => {
  //     callMethod += `this.${componentMethods[item]}()`
  //   })
  //   return callMethod
  // }
  // ${immediatelyLoad(this)}
  const str = `${exportDefault}{
  ${inheritAttrs[type]}
  components: {
  },
  props: [],
  data () {
    return {
        ${data},
        ${rules}
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {
    ${pageMountMethods}
  },
  methods: {
    onBlur(ctx, event){
      console.log('onBlur', event);
    },
    ${methods}
  },
  beforeDestroy() {
    ${pageWillMountMethods}
  }
}`
  return str
}
