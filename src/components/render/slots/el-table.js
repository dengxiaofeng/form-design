export default {
    options(h, conf, key) {
      console.log("conf columns", conf)
      const list = []
      conf.props.columns.forEach(item => {
        // if (conf.__config__.optionType === 'button') {
        //   list.push(<el-checkbox-button label={item.value}>{item.label}</el-checkbox-button>)
        // } else {
        //   list.push(<el-checkbox label={item.value} border={conf.border}>{item.label}</el-checkbox>)
        // }
        list.push(<el-table-column prop={item.prop} label={item.label}></el-table-column>)
      })
  
      return list
    }
  }