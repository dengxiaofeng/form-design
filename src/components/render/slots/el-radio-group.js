export default {
  options(h, conf, key) {
    const list = []
    conf.props.dataSource.options.forEach(item => {
      // if (conf.__config__.optionType === 'button') {
      //   list.push(<el-radio-button label={item.value}>{item.text}</el-radio-button>)
      // } else {
      //   list.push(<el-radio label={item.value} border={conf.border}>{item.text}</el-radio>)
      // }
      list.push(<el-radio label={item.value} border={conf.border}>{item.text}</el-radio>)
    })
    return list
  }
}
