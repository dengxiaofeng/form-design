export default {
  options(h, conf, key) {
    const list = []
    console.log("select props", conf)
    const options = conf.props.multiple ? conf.props.dataSource.multiOptions: conf.props.dataSource.options
    
    options.forEach((item, index) => {
      list.push(<el-option label={item.text} value={item.value} disabled={item.disabled} key={index}/>)
    })
    return list
  }
}
