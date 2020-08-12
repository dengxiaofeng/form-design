export default {
  options(h, conf, key) {
    console.log("conf", conf)
    const list = []
    conf.props.dataSource.options.forEach(item => {
      // if (conf.__config__.optionType === 'button') {
      //   list.push(<el-checkbox-button label={item.value}>{item.label}</el-checkbox-button>)
      // } else {
      //   list.push(<el-checkbox label={item.value} border={conf.border}>{item.label}</el-checkbox>)
      // }
      list.push(<el-checkbox label={item.value}>{item.text}</el-checkbox>)
    })

    return list
  }
}
