<template>
  <wrapper :type="type" :class-name="titleStyle" :no-decoration="noDecoration">
    <span class="vc-title-text" v-html="title" />
  </wrapper>
</template>

<script type="text/ecmascript-6">
import VuePropTypes from '../vue-types'
import Wrapper from './wrapper'

export default {
  components: {
    Wrapper
  },
  props: {
    componentId: VuePropTypes.string,
    className: VuePropTypes.string.def('vc-title'),
    type: VuePropTypes.string,
    text: VuePropTypes.string.def('标题'),
    noDecoration: VuePropTypes.bool.def(!1),
    anchor: VuePropTypes.string
  },
  computed: {
    titleStyle() {
      return ['vc-title', this.componentId, this.className].join(' ')
    },
    title() {
      return `<span>${this.text}</span>`
    }
  },
  methods: {
    renderTitle() {
      const children = {
        __html: "<span id=" + (this.anchor || "") + " class='" + (this.anchor ? "vc-title-anchor" : "") + "'>" + this.text + "</span>"
      }

      return (
        <span class="vc-title-text" data-setter-prop="text" dangerouslySetInnerHTML={children}></span>
      )
    }
  },
  render() {
    return (
      <Wrapper type={this.type} className={this.titleStyle} noDecoration={this.noDecoration}>
        {
          this.renderTitle()
        }
      </Wrapper>
    )
  }
}
</script>
