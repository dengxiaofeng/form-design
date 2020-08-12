/* eslint-disable max-len */
import ruleTrigger from "./ruleTrigger";

let confGlobal
let someSpanIsNot24

export function dialogWrapper(str) {
  return `<el-dialog v-bind="$attrs" v-on="$listeners" @open="onOpen" @close="onClose" title="Dialog Titile">
    ${str}
    <div slot="footer">
      <el-button @click="close">取消</el-button>
      <el-button type="primary" @click="handelConfirm">确定</el-button>
    </div>
  </el-dialog>`
}

export function vueTemplate(str) {
  return `<template>
    <div>
      ${str}
    </div>
  </template>`
}

export function vueScript(str) {
  return `<script>
    ${str}
  </script>`
}

export function cssStyle(cssStr) {
  return `<style>
    ${cssStr}
  </style>`
}

function buildFormTemplate(scheme, child, type) {
  if (Array.isArray(scheme)) {
    const str = scheme.map(item => {
      let children = []
      item.componentConfig && item.componentConfig.children && item.componentConfig.children.forEach(el => {
        if (layouts[el.componentConfig.layout]) {
          children.push(layouts[el.componentConfig.layout](el, item))
        }
      })

      children = children.join('\n')
      const scheme = item
      if (item.props && item.props.componentName === 'el-form') {
        let labelPosition = ''
        if (scheme && scheme.props && scheme.props.batchAll && scheme.props.batchAll.labelPosition !== 'right') {
          labelPosition = `label-position="${scheme.props.batchAll.labelPosition}"`
        }
        const disabled = scheme.disabled ? `:disabled="${scheme.disabled}"` : ''
        let str = `<${item.componentName} ref="${scheme.props.formRef}" :model="${scheme.props.formModel}" :rules="${scheme.props.formRules}" size="${scheme.props.batchAll.size}" ${disabled} label-width="${scheme.props.batchAll.labelWidth}px" ${labelPosition}>
                     ${children}
            </${item.componentName}>`
        if (someSpanIsNot24) {
          str = `<el-row :gutter="${scheme.props.batchAll.gutter}">
                    ${str}
            </el-row>`
        }
        return str
      }
      return layouts[item.componentConfig.layout] && layouts[item.componentConfig.layout](item)
    })
    return str.join('\n')
  }
}

function buildFromBtns(scheme, type) {
  let str = ''
  if (scheme.formBtns && type === 'file') {
    str = `<el-form-item size="large">
          <el-button type="primary" @click="submitForm">提交</el-button>
          <el-button @click="resetForm">重置</el-button>
        </el-form-item>`
    if (someSpanIsNot24) {
      str = `<el-col :span="24">
          ${str}
        </el-col>`
    }
  }
  return str
}

// span不为24的用el-col包裹
function colWrapper(scheme, str) {
  if (someSpanIsNot24 || scheme.props.span !== 24) {
    return `<el-col :span="${scheme.props.span}">
      ${str}
    </el-col>`
  }
  return str
}

const layouts = {
  colFormItem(scheme, item) {
    const config = scheme.componentConfig
    if (item) {
      let labelWidth = ''
      let label = `label="${scheme.props.label}"`
      if (scheme.props.labelWidth && scheme.props.labelWidth !== item.props.batchAll.labelWidth) {
        labelWidth = `label-width="${scheme.props.labelWidth}px"`
      }
      if (scheme.props.showLabel === false) {
        labelWidth = 'label-width="0"'
        label = ''
      }
      const required = !ruleTrigger[config.tag] && scheme.props.required ? 'required' : ''
      const tagDom = tags[config.tag] ? tags[config.tag](scheme, item) : null

      let str = `<el-form-item ${labelWidth} ${label} prop="${scheme.props.advanced.fieldId}" ${required}>
        ${tagDom}
      </el-form-item>`
      return str = colWrapper(scheme, str)
    }
    const tagDom = tags[config.tag] ? tags[config.tag](scheme, item) : null
    const labelWidth = scheme.props && scheme.props.labelWidth ? `style="width: ${scheme.props.labelWidth}px"` : ''
    const str = `<el-col>
                    <div class="engine-field" style="margin-bottom: 15px">
                        <label class="engine-field-label" ${labelWidth}>${scheme.props.label}</label>
                        ${tagDom}
                    </div>
                </el-col>`
    return colWrapper(scheme, str)
  },
  rowFormItem(scheme) {
    const config = scheme.componentConfig
    const type = scheme.props.type === 'default' ? '' : `type="${scheme.props.type}"`
    const justify = scheme.props.type === 'default' ? '' : `justify="${scheme.props.justify}"`
    const align = scheme.props.type === 'default' ? '' : `align="${scheme.props.align}"`
    const gutter = scheme.props.gutter ? `:gutter="${scheme.props.gutter}"` : ''
    const children = config.children.map(el => layouts[el.componentConfig.layout] && layouts[el.componentConfig.layout](el))
    let str = `<el-row ${type} ${justify} ${align} ${gutter}>
            ${children.join('\n')}
    </el-row>`
    str = colWrapper(scheme, str)
    return str
  },
  retouch(scheme) {
    const text = scheme.props.text ? `text="${scheme.props.text}"` : ''
    return `<div style="float:left;display:inline-block;width: 100%">
        <${scheme.componentName} ${text}></${scheme.componentName}>
    </div>`
  },
  button(scheme) {
    const tagDom = tags[scheme.componentName] ? tags[scheme.componentName](scheme) : null
    return ` ${tagDom}`
  },
  form(scheme) {
    const config = scheme.componentConfig
    const disabled = scheme.props.batchAll.fieldBehavior !== 'normal' ? `:disabled="${scheme.disabled}"` : ''
    const children = config.children.map(el => layouts[el.componentConfig.layout] && layouts[el.componentConfig.layout](el, scheme))
    console.log('form props', scheme.props)
    // :rules="${scheme.props.formRules}"
    return `<el-form ref="${scheme.props.formRef}" 
               :model="${scheme.props.formModel}" 
               :rules="${scheme.props.formRules}"
               id="${scheme.id}"
               size="${scheme.props.batchAll.size}"
               label-position="${scheme.props.batchAll.labelPosition}"
               label-width="${`${scheme.props.batchAll.labelWidth}px`}"
               ${disabled}>
        ${children.join('\n')}
      </el-form>`
  },
  block(scheme) {
    const config = scheme.componentConfig
    const children = config.children.map(el => layouts[el.componentConfig.layout] && layouts[el.componentConfig.layout](el, scheme))
    return ` <${scheme.componentName} id="${scheme.id}">${children}</${scheme.componentName}>`
  }
}

const tags = {
  'el-button': (el, item) => {
    const {
      tag, disabled
    } = attrBuilder(el, item)
    const type = el.props.type ? `type="${el.props.type}"` : ''
    const icon = el.props.icon ? `icon="${el.props.icon}"` : ''
    const round = el.props.round ? 'round' : ''
    const size = el.props.size ? `size="${el.props.size}"` : ''
    const plain = el.props.plain ? 'plain' : ''
    const circle = el.props.circle ? 'circle' : ''
    let child = buildElButtonChild(el)
    const action = '@click="onBlur"'
    if (child) child = `\n${child}\n` // 换行
    return `<${tag} ${type} ${icon} ${round} ${size} ${plain} ${disabled} ${circle} ${action}>${child}</${tag}>`
  },
  'el-input': (el, item) => {
    const {
      tag, disabled, vModel, clearable, placeholder, width
    } = attrBuilder(el, item)
    const maxlength = el.props.maxlength ? `:maxlength="${el.props.maxlength}"` : ''
    const showWordLimit = el.props['show-word-limit'] ? 'show-word-limit' : ''
    const readonly = el.props.readonly ? 'readonly' : ''
    const prefixIcon = el.props['prefix-icon'] ? `prefix-icon='${el.props['prefix-icon']}'` : ''
    const suffixIcon = el.props['suffix-icon'] ? `suffix-icon='${el.props['suffix-icon']}'` : ''
    const showPassword = el.props.more['show-password'] ? 'show-password' : ''
    const type = el.props.type ? `type="${el.props.type}"` : ''
    const size = el.props.size ? `size="${el.props.size}"` : 'mini'
    const autosize = el.autosize && el.autosize.minRows
      ? `:autosize="{minRows: ${el.autosize.minRows}, maxRows: ${el.autosize.maxRows}}"`
      : ''
    let child = buildElInputChild(el)

    if (child) child = `\n${child}\n` // 换行
    return `<${tag} ${vModel} ${type} ${placeholder} ${maxlength} ${size} ${showWordLimit} ${readonly} ${disabled} ${clearable} ${prefixIcon} ${suffixIcon} ${showPassword} ${autosize} ${width}>${child}</${tag}>`
  },
  'el-input-number': (el, item) => {
    const {
      tag, disabled, vModel, placeholder
    } = attrBuilder(el, item)
    const controlsPosition = el['controls-position'] ? `controls-position=${el['controls-position']}` : ''
    const min = el.min ? `:min='${el.min}'` : ''
    const max = el.max ? `:max='${el.max}'` : ''
    const step = el.step ? `:step='${el.step}'` : ''
    const stepStrictly = el['step-strictly'] ? 'step-strictly' : ''
    const precision = el.precision ? `:precision='${el.precision}'` : ''

    return `<${tag} ${vModel} ${placeholder} ${step} ${stepStrictly} ${precision} ${controlsPosition} ${min} ${max} ${disabled}></${tag}>`
  },
  'el-select': (el, item) => {
    const {
      tag, disabled, vModel, clearable, placeholder, width
    } = attrBuilder(el, item)
    const filterable = el.filterable ? 'filterable' : ''
    const multiple = el.multiple ? 'multiple' : ''
    let child = buildElSelectChild(el)

    if (child) child = `\n${child}\n` // 换行
    return `<${tag} ${vModel} ${placeholder} ${disabled} ${multiple} ${filterable} ${clearable} ${width}>${child}</${tag}>`
  },
  'el-radio-group': (el, item) => {
    const { tag, disabled, vModel } = attrBuilder(el, item)
    const size = `size="${el.size}"`
    let child = buildElRadioGroupChild(el)

    if (child) child = `\n${child}\n` // 换行
    return `<${tag} ${vModel} ${size} ${disabled}>${child}</${tag}>`
  },
  'el-checkbox-group': (el, item) => {
    const { tag, disabled, vModel } = attrBuilder(el, item)
    const size = `size="${el.size}"`
    const min = el.props.min ? `:min="${el.props.min}"` : ''
    const max = el.props.max ? `:max="${el.props.max}"` : ''
    let child = buildElCheckboxGroupChild(el)

    if (child) child = `\n${child}\n` // 换行
    return `<${tag} ${vModel} ${min} ${max} ${size} ${disabled}>${child}</${tag}>`
  },
  'el-switch': (el, item) => {
    const { tag, disabled, vModel } = attrBuilder(el, item)
    const activeText = el.props['active-text'] ? `active-text="${el.props['active-text']}"` : ''
    const inactiveText = el.props['inactive-text'] ? `inactive-text="${el.props['inactive-text']}"` : ''
    const activeColor = el.props['active-color'] ? `active-color="${el.props['active-color']}"` : ''
    const inactiveColor = el.props['inactive-color'] ? `inactive-color="${el.props['inactive-color']}"` : ''
    const activeValue = el.props['active-value'] !== true ? `:active-value='${JSON.stringify(el.props['active-value'])}'` : ''
    const inactiveValue = el.props['inactive-value'] !== false ? `:inactive-value='${JSON.stringify(el.props['inactive-value'])}'` : ''

    return `<${tag} ${vModel} ${activeText} ${inactiveText} ${activeColor} ${inactiveColor} ${activeValue} ${inactiveValue} ${disabled}></${tag}>`
  },
  'el-cascader': (el, item) => {
    const {
      tag, disabled, vModel, clearable, placeholder, width
    } = attrBuilder(el, item)
    const options = el.options ? `:options="${el.props.advanced.fieldId}_dataSource"` : ''
    // const props = el.props ? `:props="${el.props.advanced.fieldId}"` : ''
    const showAllLevels = el['show-all-levels'] ? '' : ':show-all-levels="false"'
    const filterable = el.filterable ? 'filterable' : ''
    const separator = el.separator === '/' ? '' : `separator="${el.separator}"`

    return `<${tag} ${vModel} ${options} ${width} ${showAllLevels} ${placeholder} ${separator} ${filterable} ${clearable} ${disabled}></${tag}>`
  },
  'el-slider': (el, item) => {
    const { tag, disabled, vModel } = attrBuilder(el, item)
    const min = el.min ? `:min='${el.min}'` : ''
    const max = el.max ? `:max='${el.max}'` : ''
    const step = el.step ? `:step='${el.step}'` : ''
    const range = el.range ? 'range' : ''
    const showStops = el['show-stops'] ? `:show-stops="${el['show-stops']}"` : ''

    return `<${tag} ${min} ${max} ${step} ${vModel} ${range} ${showStops} ${disabled}></${tag}>`
  },
  'el-time-picker': (el, item) => {
    const {
      tag, disabled, vModel, clearable, placeholder, width
    } = attrBuilder(el, item)
    const startPlaceholder = el['start-placeholder'] ? `start-placeholder="${el['start-placeholder']}"` : ''
    const endPlaceholder = el['end-placeholder'] ? `end-placeholder="${el['end-placeholder']}"` : ''
    const rangeSeparator = el['range-separator'] ? `range-separator="${el['range-separator']}"` : ''
    const isRange = el['is-range'] ? 'is-range' : ''
    const format = el.format ? `format="${el.format}"` : ''
    const valueFormat = el['value-format'] ? `value-format="${el['value-format']}"` : ''
    const pickerOptions = el['picker-options'] ? `:picker-options='${JSON.stringify(el['picker-options'])}'` : ''

    return `<${tag} ${vModel} ${isRange} ${format} ${valueFormat} ${pickerOptions} ${width} ${placeholder} ${startPlaceholder} ${endPlaceholder} ${rangeSeparator} ${clearable} ${disabled}></${tag}>`
  },
  'el-date-picker': (el, item) => {
    const {
      tag, disabled, vModel, clearable, placeholder, width
    } = attrBuilder(el, item)
    const startPlaceholder = el.props['start-placeholder'] ? `start-placeholder="${el.props['start-placeholder']}"` : ''
    const endPlaceholder = el.props['end-placeholder'] ? `end-placeholder="${el.props['end-placeholder']}"` : ''
    const rangeSeparator = el.props['range-separator'] ? `range-separator="${el.props['range-separator']}"` : ''
    const format = el.props.format ? `format="${el.props.format}"` : ''
    const size = el.props.size ? `size="${el.props.size}"` : ''
    const valueFormat = el.props['value-format'] ? `value-format="${el.props['value-format']}"` : ''
    const type = el.props.type === 'date' ? '' : `type="${el.props.type}"`
    const readonly = el.props.readonly ? 'readonly' : ''

    return `<${tag} ${type} ${vModel} ${format} ${size} ${valueFormat} ${width} ${placeholder} ${startPlaceholder} ${endPlaceholder} ${rangeSeparator} ${clearable} ${readonly} ${disabled}></${tag}>`
  },
  'el-rate': (el, item) => {
    const { tag, disabled, vModel } = attrBuilder(el, item)
    const max = el.max ? `:max='${el.max}'` : ''
    const allowHalf = el['allow-half'] ? 'allow-half' : ''
    const showText = el['show-text'] ? 'show-text' : ''
    const showScore = el['show-score'] ? 'show-score' : ''

    return `<${tag} ${vModel} ${max} ${allowHalf} ${showText} ${showScore} ${disabled}></${tag}>`
  },
  'el-color-picker': (el, item) => {
    const { tag, disabled, vModel } = attrBuilder(el, item)
    const size = `size="${el.size}"`
    const showAlpha = el['show-alpha'] ? 'show-alpha' : ''
    const colorFormat = el['color-format'] ? `color-format="${el['color-format']}"` : ''

    return `<${tag} ${vModel} ${size} ${showAlpha} ${colorFormat} ${disabled}></${tag}>`
  },
  'el-upload': (el, item) => {
    const { tag } = el.componentConfig
    const disabled = el.disabled ? ':disabled=\'true\'' : ''
    const action = el.action ? `:action="${el.__vModel__}Action"` : ''
    const multiple = el.multiple ? 'multiple' : ''
    const listType = el['list-type'] !== 'text' ? `list-type="${el['list-type']}"` : ''
    const accept = el.accept ? `accept="${el.accept}"` : ''
    const name = el.name !== 'file' ? `name="${el.name}"` : ''
    const autoUpload = el['auto-upload'] === false ? ':auto-upload="false"' : ''
    const beforeUpload = `:before-upload="${el.__vModel__}BeforeUpload"`
    const fileList = `:file-list="${el.__vModel__}fileList"`
    const ref = `ref="${el.__vModel__}"`
    let child = buildElUploadChild(el)

    if (child) child = `\n${child}\n` // 换行
    return `<${tag} ${ref} ${fileList} ${action} ${autoUpload} ${multiple} ${beforeUpload} ${listType} ${accept} ${name} ${disabled}>${child}</${tag}>`
  },
  'pro-table': (el, item) => {
    const { componentName } = el
    const mock = [{
      prop: "name",
      label: '姓名',
      width: 130
    }, {
      prop: 'entryDate',
      label: '入职日期'
    }, {
      prop: 'email',
      label: '邮箱'
    }]
    const columns = el.props.columns ?`:columns="${el.props.advanced.fieldId}_columns"`: ''
    return `<${componentName} ${columns}></${componentName}>`
  },
  tinymce: (el, item) => {
    const { tag, vModel, placeholder } = attrBuilder(el, item)
    const height = el.height ? `:height="${el.height}"` : ''
    const branding = el.branding ? `:branding="${el.branding}"` : ''
    return `<${tag} ${vModel} ${placeholder} ${height} ${branding}></${tag}>`
  }
}

function attrBuilder(el, item) {
  console.log('attrBuilder', el)
  const model = item && item.props && item.props.formModel ? `${item.props.formModel}.${el.props.advanced.fieldId}` : `${el.props.advanced.fieldId}`
  return {
    tag: el.componentConfig.tag,
    vModel: `v-model="${model}"`,
    clearable: el.props && el.props.clearable ? 'clearable' : '',
    placeholder: el.props && el.props.placeholder ? `placeholder="${el.props.placeholder}"` : '',
    width: el.style && el.style.width ? ':style="{width: \'100%\'}"' : '',
    disabled: el.props && el.props.disabled ? ':disabled=\'true\'' : ''
  }
}

// el-buttin 子级
function buildElButtonChild(scheme) {
  const children = []
  const slot = scheme.__slot__ || {}
  if (scheme.props.title) {
    children.push(scheme.props.title)
  }
  return children.join('\n')
}

// el-input 子级
function buildElInputChild(scheme) {
  const children = []
  const slot = scheme.__slot__
  if (slot && slot.prepend) {
    children.push(`<template slot="prepend">${slot.prepend}</template>`)
  }
  if (slot && slot.append) {
    children.push(`<template slot="append">${slot.append}</template>`)
  }
  return children.join('\n')
}

// el-select 子级
function buildElSelectChild(scheme) {
  const children = []
  const slot = scheme.__slot__
  if (slot && slot.options && slot.options.length) {
    children.push(`<el-option v-for="(item, index) in ${scheme.__vModel__}Options" :key="index" :label="item.label" :value="item.value" :disabled="item.disabled"></el-option>`)
  }
  return children.join('\n')
}

// el-radio-group 子级
function buildElRadioGroupChild(scheme) {
  const children = []
  // const slot = scheme.__slot__
  const config = scheme.componentConfig
  if (scheme && scheme.props && scheme.props.dataSource) {
    const tag = config.optionType === 'button' ? 'el-radio-button' : 'el-radio'
    const border = config.border ? 'border' : ''
    children.push(`<${tag} v-for="(item, index) in ${scheme.props.advanced.fieldId}_dataSource.options" :key="index" :label="item.value" :disabled="item.disabled" ${border}>{{item.text}}</${tag}>`)
  }
  return children.join('\n')
}

// el-checkbox-group 子级
function buildElCheckboxGroupChild(scheme) {
  const children = []
  const slot = scheme.__slot__
  const config = scheme.componentConfig
  if (slot && slot.options && slot.options.length) {
    const tag = config.optionType === 'button' ? 'el-checkbox-button' : 'el-checkbox'
    const border = config.border ? 'border' : ''
    children.push(`<${tag} v-for="(item, index) in ${scheme.__vModel__}Options" :key="index" :label="item.value" :disabled="item.disabled" ${border} v-html="item.label"></${tag}>`)
  }
  return children.join('\n')
}

// el-upload 子级
function buildElUploadChild(scheme) {
  const list = []
  const config = scheme.componentConfig
  if (scheme['list-type'] === 'picture-card') list.push('<i class="el-icon-plus"></i>')
  else list.push(`<el-button size="small" type="primary" icon="el-icon-upload">${config.buttonText}</el-button>`)
  if (config.showTip) list.push(`<div slot="tip" class="el-upload__tip">只能上传不超过 ${config.fileSize}${config.sizeUnit} 的${scheme.accept}文件</div>`)
  return list.join('\n')
}

export function buildPageTemplate(config, htmlStr, type) {
  const { layout } = config
  const layoutId = layout.id.replace('node', 'root')
  const { pageStyle } = layout.props
  const pageLayout = {
    pageHeader: layout.children[0],
    pageContent: layout.children[1],
    pageFoot: layout.children[2]
  }
  const child = buildFormTemplate(pageLayout.pageContent.children, htmlStr, type)
  const transformClass = value => `vc-${value.toLocaleLowerCase()}`
  return `<div class="render-engine-container">
                <div class="render-engine-page-container">
                     <div  class="${transformClass(layout.componentName)} ${layoutId}">
                           <div class="${transformClass(pageLayout.pageHeader.componentName)}"></div>
                           <div class="${transformClass(pageLayout.pageContent.componentName)}">
                                  ${child}
                            </div>
                            <div class="${transformClass(pageLayout.pageFoot.componentName)}"></div>
                     </div>
                </div>
         </div>`
}
/**
 * 组装html代码。【入口函数】
 * @param {Object} formConfig 整个表单配置
 * @param {String} type 生成类型，文件或弹窗等
 */
export function makeUpHtml(formConfig, type) {
  const pageConfig = formConfig.pages[0]
  const htmlList = []
  confGlobal = pageConfig
  // 判断布局是否都沾满了24个栅格，以备后续简化代码结构
  // someSpanIsNot24 = config.children.some(item => item.componentConfig.span !== 24)

  // 遍历渲染每个组件成html
  // config.children.forEach(el => {
  //   if (layouts[el.componentConfig.layout]) {
  //     htmlList.push(layouts[el.componentConfig.layout](el))
  //   }
  // })
  const htmlStr = htmlList.join('\n')
  // 将组件代码放进form标签
  // let temp = buildFormTemplate(config.props.form, htmlStr, type)
  let temp = buildPageTemplate(pageConfig)

  // dialog标签包裹代码
  if (type === 'dialog') {
    temp = dialogWrapper(temp)
  }
  confGlobal = null
  return temp
}
