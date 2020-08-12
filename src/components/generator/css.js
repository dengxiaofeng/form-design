const styles = {
  'el-rate': '.el-rate{display: inline-block; vertical-align: text-top;}',
  'el-upload': '.el-upload__tip{line-height: 1.2;}'
}

function addCss(cssList, el) {
  const css = styles[el.componentConfig.tag]
  css && cssList.indexOf(css) === -1 && cssList.push(css)
  if (el.componentConfig.children) {
    el.componentConfig.children.forEach(el2 => addCss(cssList, el2))
  }
}

export function makeUpCss(conf) {
  console.log('makeUpCss', conf)
  const cssConfig = conf.pages[0].layout.children[1]
  const cssList = []
  cssConfig.children.forEach(el => addCss(cssList, el))
  return cssList.join('\n')
}
