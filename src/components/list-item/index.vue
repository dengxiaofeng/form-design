<script type="application/ecmascript">
import Field from '../field'
import TextInput from '../text'
import Block from '../block'
import Icon from '@/engine-components/engine-icon'
import InlineField from '../filed-layout/inline-filed'
export default {
  components: {
    Field,
    TextInput,
    Block,
    InlineField
  },
  props: {
    listItem: {
      type: Object,
      default() {
        return {}
      }
    },
    display: {
      type: String,
      default: ''
    }
  },
  beforeMount() {
    debugger
    console.log("update render")
    const self= this
    this.willDetach = [
      this.listItem.onChange(() => {
        self.$forceUpdate()
      })
    ]
  },
  data() {
    return {
      multiple: this.listItem.isMultiple()
    }
  },
  beforeDestroy() {
    this.willDetach && this.willDetach.forEach((item) => {
      return item()
    })
  },
  render(createElement) {
    const { listItem, display } = this
    const isDraggable = listItem.isDraggable()
    const dragHandler = isDraggable ? (
      <div draggable={isDraggable} class="ve-icon-button ve-icon-button-default vs-listitem-handler">
        <svg fill="currentColor" preserveAspectRatio="xMidYMid meet" width="16" height="16" viewBox="0 0 5 16" class="ve-svgicon" style="vertical-align: middle;">
          <path d="M0.499972716,6 L1.50002728,6 C1.77615459,6 2,6.22384541 2,6.49997272 C2,6.77610002 1.77615459,6.99994543 1.50002728,6.99994543 L0.499972716,6.99994543 C0.22384541,6.99994543 3.38158422e-17,6.77610002 0,6.49997272 C-3.38158422e-17,6.22384541 0.22384541,6 0.499972716,6 Z M0.499972716,3 L1.50002728,3 C1.77615459,3 2,3.22384541 2,3.49997272 C2,3.77610002 1.77615459,3.99994543 1.50002728,3.99994543 L0.499972716,3.99994543 C0.22384541,3.99994543 3.38158422e-17,3.77610002 0,3.49997272 C-3.38158422e-17,3.22384541 0.22384541,3 0.499972716,3 Z M0.499972716,7.28787148e-18 L1.50002728,5.55666624e-14 C1.77615459,7.07214574e-14 2,0.22384541 2,0.499972716 C2,0.776100022 1.77615459,0.999945432 1.50002728,0.999945432 L0.499972716,0.999945432 C0.22384541,0.999945432 3.38158422e-17,0.776100022 0,0.499972716 C-3.38158422e-17,0.22384541 0.22384541,5.0723721e-17 0.499972716,0 Z M0.5,9.00002729 L1.5,9.00002729 C1.77614237,9.00002729 2,9.22388491 2,9.50002729 C2,9.77616966 1.77614237,10.0000273 1.5,10.0000273 L0.5,10.0000273 C0.223857625,10.0000273 3.38176876e-17,9.77616966 0,9.50002729 C-3.38176876e-17,9.22388491 0.223857625,9.00002729 0.5,9.00002729 Z M0.5,12.0000273 L1.5,12.0000273 C1.77614237,12.0000273 2,12.2238849 2,12.5000273 C2,12.7761697 1.77614237,13.0000273 1.5,13.0000273 L0.5,13.0000273 C0.223857625,13.0000273 3.38176876e-17,12.7761697 0,12.5000273 C-3.38176876e-17,12.2238849 0.223857625,12.0000273 0.5,12.0000273 Z M0.5,15.0000273 L1.5,15.0000273 C1.77614237,15.0000273 2,15.2238849 2,15.5000273 C2,15.7761697 1.77614237,16.0000273 1.5,16.0000273 L0.5,16.0000273 C0.223857625,16.0000273 3.38176876e-17,15.7761697 0,15.5000273 C-3.38176876e-17,15.2238849 0.223857625,15.0000273 0.5,15.0000273 Z M3.49997272,6 L4.50002728,6 C4.77615459,6 5,6.22384541 5,6.49997272 C5,6.77610002 4.77615459,6.99994543 4.50002728,6.99994543 L3.49997272,6.99994543 C3.22384541,6.99994543 3,6.77610002 3,6.49997272 C3,6.22384541 3.22384541,6 3.49997272,6 Z M3.49997272,3 L4.50002728,3 C4.77615459,3 5,3.22384541 5,3.49997272 C5,3.77610002 4.77615459,3.99994543 4.50002728,3.99994543 L3.49997272,3.99994543 C3.22384541,3.99994543 3,3.77610002 3,3.49997272 C3,3.22384541 3.22384541,3 3.49997272,3 Z M3.49997272,7.28787148e-18 L4.50002728,5.55666624e-14 C4.77615459,7.07214574e-14 5,0.22384541 5,0.499972716 C5,0.776100022 4.77615459,0.999945432 4.50002728,0.999945432 L3.49997272,0.999945432 C3.22384541,0.999945432 3,0.776100022 3,0.499972716 C3,0.22384541 3.22384541,5.0723721e-17 3.49997272,0 Z M3.5,9.00002729 L4.5,9.00002729 C4.77614237,9.00002729 5,9.22388491 5,9.50002729 C5,9.77616966 4.77614237,10.0000273 4.5,10.0000273 L3.5,10.0000273 C3.22385763,10.0000273 3,9.77616966 3,9.50002729 C3,9.22388491 3.22385763,9.00002729 3.5,9.00002729 Z M3.5,12.0000273 L4.5,12.0000273 C4.77614237,12.0000273 5,12.2238849 5,12.5000273 C5,12.7761697 4.77614237,13.0000273 4.5,13.0000273 L3.5,13.0000273 C3.22385763,13.0000273 3,12.7761697 3,12.5000273 C3,12.2238849 3.22385763,12.0000273 3.5,12.0000273 Z M3.5,15.0000273 L4.5,15.0000273 C4.77614237,15.0000273 5,15.2238849 5,15.5000273 C5,15.7761697 4.77614237,16.0000273 4.5,16.0000273 L3.5,16.0000273 C3.22385763,16.0000273 3,15.7761697 3,15.5000273 C3,15.2238849 3.22385763,15.0000273 3.5,15.0000273 Z" id="Combined-Shape"></path>
        </svg>
      </div>
    ): "";

    const delHandler = listItem.isAbleToDelete() ? (
      <div class="ve-icon-button ve-icon-button-default vs-action-remove" onClick={(event) => {
        this.listItem.remove(), 
        event.stopPropagation()
      }}>
        <svg fill="currentColor" preserveAspectRatio="xMidYMid meet" width="16" height="16" viewBox="0 0 1024 1024" class="ve-svgicon" style="vertical-align: middle;">
          <path d="M224 256v639.84A64 64 0 0 0 287.84 960h448.32A64 64 0 0 0 800 895.84V256h64a32 32 0 1 0 0-64H160a32 32 0 1 0 0 64h64zM384 96c0-17.664 14.496-32 31.904-32h192.192C625.696 64 640 78.208 640 96c0 17.664-14.496 32-31.904 32H415.904A31.872 31.872 0 0 1 384 96z m-96 191.744C288 270.208 302.4 256 320.224 256h383.552C721.6 256 736 270.56 736 287.744v576.512C736 881.792 721.6 896 703.776 896H320.224A32.224 32.224 0 0 1 288 864.256V287.744zM352 352c0-17.696 14.208-32.032 32-32.032 17.664 0 32 14.24 32 32v448c0 17.664-14.208 32-32 32-17.664 0-32-14.24-32-32V352z m128 0c0-17.696 14.208-32.032 32-32.032 17.664 0 32 14.24 32 32v448c0 17.664-14.208 32-32 32-17.664 0-32-14.24-32-32V352z m128 0c0-17.696 14.208-32.032 32-32.032 17.664 0 32 14.24 32 32v448c0 17.664-14.208 32-32 32-17.664 0-32-14.24-32-32V352z"></path>
        </svg>
      </div>
    ): "";
    let getEdit = this.listItem.getParent().getOnEdit()
    let handler = void 0;
    // handler = "function" == typeof getEdit ? () => {
    //   return getEdit(this.listItem)
    // }: () => {

    // }
    const editHandler = listItem.isEditable() ? ( 
      <div class="ve-icon-button ve-icon-button-default vs-action-edit" onClick={() => console.log('123')}>
        <svg fill="currentColor" preserveAspectRatio="xMidYMid meet" width="16" height="16" viewBox="0 0 1024 1024" class="ve-svgicon" style="vertical-align: middle;">
          <path d="M707.872 289.6l-256.32 256.32 56.576 33.952 33.92 56.576 256.32-256.32-90.496-90.528z m45.28-45.248l90.496 90.496 22.624-22.624a32 32 0 0 0 0-45.248L821.024 221.76a32 32 0 0 0-45.248 0l-22.624 22.624z m-346.88 346.848l-15.168 15.2v90.496h90.496l15.2-15.2-33.92-56.544-56.576-33.952zM843.68 153.856l90.496 90.496a64 64 0 0 1 0 90.496L508.16 760.896h-181.024v-181.024L753.152 153.856a64 64 0 0 1 90.496 0zM576 96a32 32 0 0 1-32 32H160c-17.696 0-32 14.208-32 31.744v704.512c0 17.184 14.336 31.744 32 31.744h704c17.696 0 32-14.208 32-31.744V608a32 32 0 0 1 64 0v287.84C960 931.264 931.2 960 896.288 960H127.68C92.512 960 64 931.296 64 895.84V128.16C64 92.736 92.8 64 127.712 64H544a32 32 0 0 1 32 32z"></path>
        </svg>
      </div>
    ): "";

    const activeClass = {
      "ve-icon-button ve-icon-button-default vs-action-check": true,
      "vs-checked": this.listItem.isChecked(),
      active: this.listItem.isChecked()
    }
    const selectTypeName = (this.listItem.isMultiple() ? "checkbox" : "radio") + (this.listItem.isChecked() ? "Active": "Normal")
    const checkHandler = listItem.isCheckable() ? (
      <div class={activeClass} onClick={() => this.listItem.toggleCheck()}>
          <Icon width="16" height="16" name={selectTypeName}></Icon>
      </div>
    ): "";
    const style = {};
    
    style.marginRight = 19 + 19 + 7 + 'px'
    const params = this.listItem.getParams() || []

    const optionRender = () => {
      return <el-popover
            placement="left"
            width="264"
            trigger="click" ref="ve-popup">
            <div class="ve-stage-box vs-list-stagebox" v-if="">
                              <div class="ve-stage">
                                  <div class="ve-stage-content">
                                      {
                                        params.map(item => {
                                          if(item && item.config && item.config.display === 'inline') {
                                            return item && item.config && item.config.setter.render(createElement, {title: item.config.title, value: item.value, ...item})
                                          }
                                        })
                                      }
                                  </div>
                              </div>
            </div>
            
            <template slot="reference">
                <div ref="shell" class="vs-listitem">
                    {
                      dragHandler
                    }
                    {
                      checkHandler
                    }
                  <div class="vs-listitem-body" style={style}>
                    {
                      this.listItem.parent.editItemsNum ? this.listItem.getEditItem(createElement): this.listItem.getDescription()
                    }
                  </div>
                  <div class="vs-listitem-actions">
                    {
                      editHandler
                    }
                    {
                      delHandler
                    }
                  </div>
                </div>
            </template>
        </el-popover>
     
    }
    const editItemRender = () => {
       return (
         <div ref="shell" class="vs-listitem">
                    {
                      dragHandler
                    }
                    {
                      checkHandler
                    }
                  <div class="vs-listitem-body" style={style}>
                    {
                      this.listItem.parent.editItemsNum ? this.listItem.getEditItem(createElement): this.listItem.getDescription()
                    }
                  </div>
                  <div class="vs-listitem-actions">
                    {
                      editHandler
                    }
                    {
                      delHandler
                    }
                  </div>
          </div>
       )
    }
    return this.listItem.parent.editItemsNum ? editItemRender(): optionRender()
  },
  watch: {
    listItem(val, old) {
      console.log("update")
      if(val !== old) {
        this.multiple = val.isMultiple()
        
      }
    }
  }
}
</script>

<style type="text/scss" lang="scss">
.list-box {
  position: relative;
  .sortable-card {
    background: transparent;
    border: 1px solid rgba(31,56,88,.2);
    border-radius: 3px;
    margin-bottom: 8px;
    box-sizing: border-box;
    &:before {
      content: "";
      display: table;
    }
    &:after {
      content: "";
      display: table;
      clear: both;
    }
    &.sortable-ghost {
      outline:2px dashed #006cff;
      outline-offset:-2px;
      border-color:transparent!important;
      box-shadow:none!important;
      background:transparent!important;
    }
    .list-item {
      position: relative;
      outline: none;
      display: flex;
      align-items: center;
      padding-left: 4px;
      .option-drag {
        cursor: move;
      }
      ::v-deep .el-checkbox {
        margin-left: 3px;
        margin-right: 8px;
      }
      .icon-button-default {
        max-height: 100%;
        overflow: hidden;
        opacity: 0.6;
      }
      .listitem-body {
        line-height: 28px;
        flex: 1;
        overflow: hidden;
        text-overflow: ellipsis;
        margin-right: 45px;
        font-size: 12px;
        color: rgba(0, 0, 0, .6);
      }
      .listitem-actions {
        position: absolute;
        right: 6px;
        top: 7px;
        display: inline-flex;
        > * {
          margin-left: 3px;
        }
        .icon-button {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          box-sizing: border-box;
          cursor: pointer;
          border-radius: 2px;
          &.icon-button-default {
            max-height: 100%;
            overflow: hidden;
            opacity: 0.6;
          }
        }
      }
    }

  }
}

</style>
