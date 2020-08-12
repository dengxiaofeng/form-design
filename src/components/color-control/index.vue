<script type="text/ecmascript-6">
import { Sketch } from 'vue-color'

export default {
  components: {
    SketchPicker: Sketch
  },
  props: {
    value: {
      type: String,
      default: ''
    },
    className: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: ''
    },
    closeOnSelect: {
      type: Boolean,
      default: !1
    },
    handleChange: {
      type: Function,
      default() {
        return () => {}
      }
    },
    handleBlur: {
      type: Function,
      default() {
        return () => {}
      }
    }
  },
  data() {
    return {
      color: this.value,
      focused: !1,
      visible: !1,
      presetColors: ["#ff6f00", "#0079f2", "#40b370", "#F04631", "#F9BD0F", "#66BC5C", "#3C99D8", "#ffffff"]
    }
  },
  methods: {
    onPickerChange(value) {
      this.color = value.hex
      this.handleChange && this.handleChange(this.color)
    }
  },
  render() {
    const className = {
      "ve-color-control": true,
      [this.className]: this.className ? true: false,
      "ve-focused": this.focused,
      "ve-invalid": false
    }
    const value = this.value || ""
    const isEmpty = !value || "transparent" === value
    const triggerClassName = {
      "ve-color-trigger": true,
      "ve-empty": isEmpty
    }
    const triggerStyle = isEmpty ? null: {
      backgroundColor: value
    }
   
    return (
      <el-popover placement="left" popper-class="ve-color-popover" trigger="click" width="200">
        <SketchPicker presetColors={this.presetColors} vModel={this.color} 
            {...{on: {
              input: (value) => this.onPickerChange(value),
              change:  (value) => this.onPickerChange(value)
          }}}></SketchPicker>
        <div slot="reference" style="width: 100%">
          <div class={className}>
            <span class={triggerClassName} style={triggerStyle}></span>
            <input class="ve-input" type="text" spellCheck={!1} value={this.color} placeholder={this.placeholder}/>
          </div>
        </div>
      </el-popover>
    )
  },
  watch: {
    value(val, old) {
      if(val !== old) {
        this.color = val
      }
    }
  }
}
</script>

<style scoped lang="scss" type="text/scss">
  .ve-color-control {
    position: relative;
    box-sizing: border-box;
    height: 28px;
    border: 1px solid var(--color-field-border,rgba(31,56,88,.3));
    white-space: normal;
    display: flex;
    width: 100%;
    border-radius: 3px;
    .ve-color-trigger {
      display: inline-block;
      box-sizing: border-box;
      width: 16px;
      height: 16px;
      border-radius: 3px;
      margin: 4px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
      &.ve-empty {
        background: transparent;
        border: 1px solid var(--color-field-border,rgba(31,56,88,.3));
      }
    }
    .ve-input {
      box-sizing: border-box;
      padding: 4px;
      display: block;
      font-size: 12px;
      font-family: PingFang SC,Hiragino Sans GB,Microsoft YaHei,Helvetica,Arial,sans-serif;
      border: 0;
      margin: 0;
      background: transparent;
      color: var(--color-text,rgba(0,0,0,.6));
      outline: none;
      height: 28px;
      line-height: 28px;
      width: calc(100% - 24px);
    }
  }
</style>
