<script type="text/ecmascript-6">
import Icon from '@/engine-components/engine-icon'
import svgList from '@/engine-components/engine-icon/icons/icon'
export default {
  components: {
    Icon
  },
  props: {
    selected: {
      type: String,
      default: ""
    },
    handlerSelect: {
      type: Function,
      default() {
        return () => {}
      }
    }
  },
  methods: {
    getList() {
      let ret = []
      for(let key in svgList) {
        if(svgList.hasOwnProperty(key)) {
          const item = svgList[key]
          ret.push({
            name: key,
            icon: item,
            svg: item,
            title: item.title
          })
        }
      }
      return ret
    }
  },
  render() {
    const handlerSelect = this.handlerSelect
    return (
      <div class="vs-icon-list">
        {
          this.getList().map(item => {
            return (
                <el-tooltip class="item" effect="dark" content={item.title} placement="top">
                   <i key={item.name} class="vs-icon-list-item" onClick={() => {
                        handlerSelect(item.name)
                  }}>
                  <Icon name={item.name} width="20" height="20"></Icon>
              </i>
                </el-tooltip>
            )
          })
        }
      </div>
    )
  }
}
</script>

<style lang="scss">
.vs-icon-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    padding: 10px;
    .vs-icon-list-item {
      display: flex;
      height: 40px;
      width: 25%;
      cursor: pointer;
      align-items: center;
      justify-content: center;
      // border: 1px solid transparent;
      &.vs-selected, &:hover {
        border-color: hsla(0,0%,100%,.4);
      }
      >svg {
        opacity: .8;
        path {
          fill: var(--color-icon-normal,rgba(31,56,88,.4))!important;
        }
      }
    }
}


</style>