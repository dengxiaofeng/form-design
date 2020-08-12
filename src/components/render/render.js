import { deepClone } from "@/utils/index";

const { toString } = Object.prototype
function vModel(self, dataObject, defaultValue) {
  //select 多选
  dataObject.props.value = dataObject.props && dataObject.props.multiple ? (Array.isArray(defaultValue) ? defaultValue: []): defaultValue
  dataObject.on.input = val => {
    self.$emit('input', val)
  }
}

const componentChild = {}
/**
 * 将./slots中的文件挂载到对象componentChild上
 * 文件名为key，对应JSON配置中的componentConfig.tag
 * 文件内容为value，解析JSON配置中的__slot__
 */
const slotsFiles = require.context('./slots', false, /\.js$/)
const keys = slotsFiles.keys() || []
keys.forEach(key => {
  const tag = key.replace(/^\.\/(.*)\.\w+$/, '$1')
  const value = slotsFiles(key).default || slotsFiles(key).title
  componentChild[tag] = value
})
console.log(componentChild)
const transformProps = props => {
  if (!props) {
    return {}
  }
  const keys = ['more']
  let ret = {}
  Object.keys(props).forEach(item => {
    if (keys.indexOf(item)) {
      ret = {
        ...props[item]
      }
    }
  })
  return ret
}
export default {
  render(h) {
    const dataObject = {
      attrs: {},
      props: {},
      nativeOn: {},
      on: {},
      style: {}
    }
    const confClone = deepClone(this.conf)
    const children = []

    // 如果slots文件夹存在与当前tag同名的文件，则执行文件中的代码
    const childObjs = componentChild[confClone.componentConfig.tag]
    if (childObjs) {
      Object.keys(childObjs).forEach(key => {
        const childFunc = childObjs[key]
        if (confClone.props && confClone.props[key]) {
          children.push(childFunc(h, confClone, key))
        } else if ((confClone.props && confClone.componentName === 'el-select') || (confClone.props && confClone.componentName === 'el-radio-group') || (confClone.props && confClone.componentName === 'el-checkbox-group')) {
          children.push(childFunc(h, confClone, key))
        } else if((confClone.props && confClone.componentName === 'el-table')) {
          children.push(childFunc(h, confClone, key))
        }
      })
    }

    // 将json表单配置转化为vue render可以识别的 “数据对象（dataObject）”
    Object.keys(confClone).forEach(key => {
      const val = confClone[key]
      if (key === '__vModel__') {
        // console.log('confClone.componentConfig.defaultValue', confClone.props.defaultValue)
        vModel(this, dataObject, confClone.props && confClone.props.defaultValue)
      } else if (dataObject[key]) {
        dataObject[key] = {
          ...dataObject[key],
          ...val
        }
      }
    })


    confClone.props && Object.keys(confClone.props).forEach(key => {
      if (toString.call(confClone.props[key]) === '[object Object]') {
        const obj = confClone.props[key]
        for (const i in obj) {
          dataObject.attrs[i] = obj[i]
        }
      } else {
        // 处理字段状态
        if (key === 'defaultBehavior') {
          dataObject.attrs[confClone.props[key]] = confClone.props[key]
        }
        dataObject.attrs[key] = confClone.props[key]
      }
    })

    // 



    // 清理属性
    delete dataObject.attrs.componentConfig
    delete dataObject.attrs.__slot__
    delete dataObject.props.datasource

    console.log("dataObject", dataObject)


    return h(this.conf.componentConfig.tag, dataObject, children)
  },
  props: ['conf']
}
