<script>
import draggable from 'vuedraggable'
import render from '@/components/render/render'
import VCContainer from '@/engine-components/engine-container'

const components = {
  itemBtns(h, element, index, parent) {
    // {components.itemBtns.apply(this, arguments)}
    const { copyItem, deleteItem } = this.$listeners
    return (
      <div class="engine-outline-actions">
        <div data-tip="复制" className="ve-icon-button ve-icon-button-default engine-action-clone">
          <svg fill="currentColor" preserveAspectRatio="xMidYMid meet" width="16" height="16" viewBox="0 0 1024 1024"
               className="ve-svgicon" style="vertical-align: middle;">
            <path
              d="M192 256.16C192 220.736 220.704 192 256.16 192h639.68C931.264 192 960 220.704 960 256.16v639.68A64.16 64.16 0 0 1 895.84 960H256.16A64.16 64.16 0 0 1 192 895.84V256.16z m64 31.584v576.512a32 32 0 0 0 31.744 31.744h576.512a32 32 0 0 0 31.744-31.744V287.744A32 32 0 0 0 864.256 256H287.744A32 32 0 0 0 256 287.744zM288 192v64h64V192H288z m128 0v64h64V192h-64z m128 0v64h64V192h-64z m128 0v64h64V192h-64z m128 0v64h64V192h-64z m96 96v64h64V288h-64z m0 128v64h64v-64h-64z m0 128v64h64v-64h-64z m0 128v64h64v-64h-64z m0 128v64h64v-64h-64z m-96 96v64h64v-64h-64z m-128 0v64h64v-64h-64z m-128 0v64h64v-64h-64z m-128 0v64h64v-64h-64z m-128 0v64h64v-64H288z m-96-96v64h64v-64H192z m0-128v64h64v-64H192z m0-128v64h64v-64H192z m0-128v64h64v-64H192z m0-128v64h64V288H192z m160 416c0-17.664 14.592-32 32.064-32h319.872a31.968 31.968 0 1 1 0 64h-319.872A31.968 31.968 0 0 1 352 704z m0-128c0-17.664 14.4-32 32.224-32h383.552c17.792 0 32.224 14.208 32.224 32 0 17.664-14.4 32-32.224 32H384.224A32.032 32.032 0 0 1 352 576z m0-128c0-17.664 14.4-32 32.224-32h383.552c17.792 0 32.224 14.208 32.224 32 0 17.664-14.4 32-32.224 32H384.224A32.032 32.032 0 0 1 352 448z m512 47.936V192h-64V159.968A31.776 31.776 0 0 0 768.032 128H160A31.776 31.776 0 0 0 128 159.968V768c0 17.92 14.304 31.968 31.968 31.968H192v64h303.936H128.128A63.968 63.968 0 0 1 64 799.872V128.128C64 92.704 92.48 64 128.128 64h671.744C835.296 64 864 92.48 864 128.128v367.808z"></path>
          </svg>
        </div>
        <div data-tip="删除" className="ve-icon-button ve-icon-button-default engine-action-remove">
          <svg fill="currentColor" preserveAspectRatio="xMidYMid meet" width="16" height="16" viewBox="0 0 1024 1024"
               className="ve-svgicon" style="vertical-align: middle;">
            <path
              d="M224 256v639.84A64 64 0 0 0 287.84 960h448.32A64 64 0 0 0 800 895.84V256h64a32 32 0 1 0 0-64H160a32 32 0 1 0 0 64h64zM384 96c0-17.664 14.496-32 31.904-32h192.192C625.696 64 640 78.208 640 96c0 17.664-14.496 32-31.904 32H415.904A31.872 31.872 0 0 1 384 96z m-96 191.744C288 270.208 302.4 256 320.224 256h383.552C721.6 256 736 270.56 736 287.744v576.512C736 881.792 721.6 896 703.776 896H320.224A32.224 32.224 0 0 1 288 864.256V287.744zM352 352c0-17.696 14.208-32.032 32-32.032 17.664 0 32 14.24 32 32v448c0 17.664-14.208 32-32 32-17.664 0-32-14.24-32-32V352z m128 0c0-17.696 14.208-32.032 32-32.032 17.664 0 32 14.24 32 32v448c0 17.664-14.208 32-32 32-17.664 0-32-14.24-32-32V352z m128 0c0-17.696 14.208-32.032 32-32.032 17.664 0 32 14.24 32 32v448c0 17.664-14.208 32-32 32-17.664 0-32-14.24-32-32V352z"></path>
          </svg>
        </div>
      </div>
    )
  }
}
const layouts = {
  colFormItem(h, element, index, parent, native) {
    const { activeItem } = this.$listeners
    const config = element.componentConfig
    let className = this.activeId === element.componentConfig.formId
      ? `drawing-item active-from-item ${element.id} unfocus-bordered`
      : `drawing-item ${element.id} unfocus-bordered`
    // if (this.formConf.unFocusedComponentBorder) className += ' unfocus-bordered'

    let labelWidth = element.props && element.props.labelWidth ? `${element.props.labelWidth}px` : null
    if (element.props && element.props.showLabel === false) labelWidth = '0'
    const formItem = () => {
      if (native) {
        return <el-form-item label-width={labelWidth}
                      label={element.props && element.props.showLabel ? element.props.label : ''}
                      required={element.props && element.props.required || false} prop={element.__vModel__}>
                  <render key={config.renderKey} conf={element} onInput={ event => {
                    this.$set(element.props, 'defaultValue', event)
                  }} />
        </el-form-item>
      }

      className += ' non-form'
      if(element.componentName === 'el-table') {
          return <div class="engine-field"> 
                  <render key={config.renderKey} conf={element} onInput={ event => {
                    this.$set(element.props, 'defaultValue', event)
                  }} ></render>
          </div>
      } else {
          return <div class="engine-field"> 
                  <label class="engine-field-label" style={{ width: `${element.props.labelWidth}px` }}>{element.props.label}</label>
                  <render key={config.renderKey} conf={element} onInput={ event => {
                    this.$set(element.props, 'defaultValue', event)
                  }} ></render>
          </div>
      }
      
    }
    className += (!native ? ' non-form' : '')
    return (
      <el-col span={element.props && element.props.span || 24} class={className}
        nativeOnClick={event => {
          activeItem(element, parent, index, event)
          event.stopPropagation()
        }}>
        {formItem()}
      </el-col>
    )
  },
  rowFormItem(h, element, index, parent, native) {
    const { activeItem } = this.$listeners
    const className = this.activeId === element.componentConfig.formId
      ? `drawing-row-item active-from-item ${element.id}`
      : `drawing-row-item ${element.id}`
    let child = renderChildren.apply(this, arguments, native)
    if (element.props.type === 'flex') {
      child = <el-row type={element.props.type} justify={element.props.justify} align={element.props.align}>
              {child}
      </el-row>
    }
    return (
      <el-col span={element.props.span}>
        <el-row gutter={element.props.gutter} class={className}
          nativeOnClick={event => {
            activeItem(element, parent, index, event)
            event.stopPropagation()
          }}>
          <draggable list={element.componentConfig.children}
                     animation={340} group="componentsGroup" class="drag-wrapper"
                     >
            {child}
          </draggable>
        </el-row>
      </el-col>
    )
  },
  form(h, element, index, parent, native) {
    const { activeItem } = this.$listeners
    const className = this.activeId === element.componentConfig.formId
      ? `drawing-row-item active-from-item ${element.id}`
      : `drawing-row-item ${element.id}`
    // require={element.props.require}
    const child = renderChildren.apply(this, arguments)
    const fieldBehavior = element.props.batchAll.fieldBehavior !== 'normal'
    return (
      <el-form style="min-height: 100px;" class={className} id={element.id}
               size={element.props.batchAll.size}
               label-position={element.props.batchAll.labelPosition}
               label-width={`${element.props.batchAll.labelWidth}px`}
               disabled={fieldBehavior}

               nativeOnClick={event => {
                 activeItem(element, parent, index, event)
                 event.stopPropagation()
               }}>
        <draggable list={element.componentConfig.children} animation={340} group="componentsGroup"
                   className={element.componentConfig.children.length ? 'drag-wrapper' : 'engine-empty'}>
          {child}
        </draggable>
      </el-form>
    )
  },
  block(h, element, index, parent) {
    const child = renderChildren.apply(this, arguments)
    return (
      <VCContainer id={element.id}>
        {
          child
        }
      </VCContainer>
    )
  },
  button(h, element, index, parent) {
    const { activeItem } = this.$listeners
    const config = element.componentConfig
    const className = this.activeId === element.componentConfig.formId
      ? `drawing-row-item active-from-item ${element.id}`
      : `drawing-row-item ${element.id}`
    return (
      <div class={className} style="display: inline-block" onClick={event => {
        activeItem(element, parent, index, event)
        event.stopPropagation()
        event.preventDefault()
      }}>
        <render key={config.renderKey} conf={element} />
      </div>
    )
  },
  retouch(h, element, index, parent) {
    const { activeItem } = this.$listeners
    const className = this.activeId === element.componentConfig.formId
      ? `drawing-row-item active-from-item ${element.id}`
      : `drawing-row-item ${element.id}`
    const config = element.componentConfig
    return <div class={className} style="float:left;display:inline-block;width: 100%" onClick={event => {
      activeItem(element, parent, index, event)
      event.stopPropagation()
    }}>
      <render key={config.renderKey} conf={element} />
    </div>
  },
  table(h, element, index, parent) {

  }

}

function renderChildren(h, element, index, parent, native) {
  const config = element.componentConfig
  if (!Array.isArray(config.children)) return null
  return config.children.map((el, i) => {
    const layout = layouts[el.componentConfig.layout]
    if (layout && config.layout === 'form') {
      return layout.call(this, h, el, i, config.children, true)
    }
    return layout.call(this, h, el, i, config.children, false)

    return layoutIsNotFound.call(this)
  })
}

function layoutIsNotFound() {
  throw new Error(`没有与${this.element.componentConfig.layout}匹配的layout`)
}

export default {
  components: {
    render,
    draggable,
    VCContainer
  },
  props: [
    'element',
    'index',
    'drawingList',
    'activeId',
    'formConf'
  ],
  render(h) {
    const layout = layouts[this.element.componentConfig.layout]

    if (layout) {
      return layout.call(this, h, this.element, this.index, this.drawingList)
    }
    return layoutIsNotFound.call(this)
  }
}
</script>
