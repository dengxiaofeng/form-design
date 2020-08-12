<script type="text/ecmascript-6">
import VuePropTypes from '../vue-types'
import getIconList from './icons/icon'
const otherProps = function (props, otherProps) {
  const ret = {}
  for (const key in props) {
    otherProps.indexOf(key) >= 0 || Object.prototype.hasOwnProperty.call(props, key) && (ret[key] = props[key])
  }
  return ret
}
// const size = {
//   xsmall: 8,
//   small: 16,
//   medium: 20,
//   large: 30,
//   xlarge: 48
// }
export default {
  functional: true,
  props: {
    className: VuePropTypes.string,
    fill: VuePropTypes.string,
    viewBox: VuePropTypes.string,
    style: VuePropTypes.object,
    name: VuePropTypes.string,
    width: VuePropTypes.string,
    height: VuePropTypes.string
  },
  render(createElement, context) {
    
    // const baseProps = otherProps(context.props, ['fill', 'size', 'viewBox', 'style', 'children'])
    const { props } = context
    // size.hasOwnProperty(props.size) && (
    //   props.size = size[props.size]
    // )
   
    const svgRect = getIconList[context.props.name]
    console.log(svgRect)
    return createElement('svg', {
      attrs: {
        fill: 'currentColor',
        preserveAspectRatio: 'xMidYMid meet',
        width: props.width || '12px',
        height: props.height || '12px',
        viewBox: svgRect.viewBox
      },
      class: "ve-svgicon " + props.className,
      style: {
        verticalAlign: 'middle',
        color: props.fill,
        ...props.style
      }
    }, [
      createElement('path', {
        attrs: {
          d: svgRect.d
        }
      })
    ])
  }
}
</script>
