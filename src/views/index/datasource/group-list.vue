<template>
  <div class="engine-datapool-view-group-list">
    <draggable
      :data="data"
      :animation="340"
      group="selectItem"
      handle=".option-drag"
      class="list-box"
    >
      <div class="sortable-card">
        <div class="engine-datapool-list-item">
          <div class="engine-datapool-list-item-title engine-datapool-list-item-title-editing">
            <div class="ve-icon-button ve-icon-button-default engine-datapool-list-item-title-icon engine-datapool-list-item-title-icon-arrow">
              <svg fill="currentColor"
                   preserveAspectRatio="xMidYMid meet"
                   width="16" height="16" viewBox="0 0 1024 1024" class="ve-svgicon" style="vertical-align: middle;" data-spm-anchor-id="0.0.0.i144.10754098lnJnrX"
              ><path d="M342.016 214.016l468.010667 297.984-468.010667 297.984 0-596.010667z" /></svg>
            </div>
            <div class="engine-datapool-list-item-title-protocal VALUE">
              变量
            </div>
            <div class="engine-datapool-list-item-title-name">
              <span title="dp2 ">dp2</span>
            </div>
            <div class="engine-datapool-list-item-title-right-icons">
              <div class="ve-icon-button ve-icon-button-default engine-datapool-list-item-title-icon engine-datapool-list-item-title-icon-edit">
                <svg fill="currentColor"
                     preserveAspectRatio="xMidYMid meet"
                     width="16"
                     height="16"
                     viewBox="0 0 1024 1024"
                     class="ve-svgicon"
                     style="vertical-align: middle;"
                >
                  <path d="M707.872 289.6l-256.32 256.32 56.576 33.952 33.92 56.576 256.32-256.32-90.496-90.528z m45.28-45.248l90.496 90.496 22.624-22.624a32 32 0 0 0 0-45.248L821.024 221.76a32 32 0 0 0-45.248 0l-22.624 22.624z m-346.88 346.848l-15.168 15.2v90.496h90.496l15.2-15.2-33.92-56.544-56.576-33.952zM843.68 153.856l90.496 90.496a64 64 0 0 1 0 90.496L508.16 760.896h-181.024v-181.024L753.152 153.856a64 64 0 0 1 90.496 0zM576 96a32 32 0 0 1-32 32H160c-17.696 0-32 14.208-32 31.744v704.512c0 17.184 14.336 31.744 32 31.744h704c17.696 0 32-14.208 32-31.744V608a32 32 0 0 1 64 0v287.84C960 931.264 931.2 960 896.288 960H127.68C92.512 960 64 931.296 64 895.84V128.16C64 92.736 92.8 64 127.712 64H544a32 32 0 0 1 32 32z" />
                </svg>
              </div>
              <div class="ve-icon-button ve-icon-button-default engine-datapool-list-item-title-icon engine-datapool-list-item-title-icon-copy">
                <svg fill="currentColor"
                     preserveAspectRatio="xMidYMid meet"
                     width="16"
                     height="16"
                     viewBox="0 0 1024 1024"
                     class="ve-svgicon"
                     style="vertical-align: middle;"
                >
                  <path d="M192 256.16C192 220.736 220.704 192 256.16 192h639.68C931.264 192 960 220.704 960 256.16v639.68A64.16 64.16 0 0 1 895.84 960H256.16A64.16 64.16 0 0 1 192 895.84V256.16z m64 31.584v576.512a32 32 0 0 0 31.744 31.744h576.512a32 32 0 0 0 31.744-31.744V287.744A32 32 0 0 0 864.256 256H287.744A32 32 0 0 0 256 287.744zM288 192v64h64V192H288z m128 0v64h64V192h-64z m128 0v64h64V192h-64z m128 0v64h64V192h-64z m128 0v64h64V192h-64z m96 96v64h64V288h-64z m0 128v64h64v-64h-64z m0 128v64h64v-64h-64z m0 128v64h64v-64h-64z m0 128v64h64v-64h-64z m-96 96v64h64v-64h-64z m-128 0v64h64v-64h-64z m-128 0v64h64v-64h-64z m-128 0v64h64v-64h-64z m-128 0v64h64v-64H288z m-96-96v64h64v-64H192z m0-128v64h64v-64H192z m0-128v64h64v-64H192z m0-128v64h64v-64H192z m0-128v64h64V288H192z m160 416c0-17.664 14.592-32 32.064-32h319.872a31.968 31.968 0 1 1 0 64h-319.872A31.968 31.968 0 0 1 352 704z m0-128c0-17.664 14.4-32 32.224-32h383.552c17.792 0 32.224 14.208 32.224 32 0 17.664-14.4 32-32.224 32H384.224A32.032 32.032 0 0 1 352 576z m0-128c0-17.664 14.4-32 32.224-32h383.552c17.792 0 32.224 14.208 32.224 32 0 17.664-14.4 32-32.224 32H384.224A32.032 32.032 0 0 1 352 448z m512 47.936V192h-64V159.968A31.776 31.776 0 0 0 768.032 128H160A31.776 31.776 0 0 0 128 159.968V768c0 17.92 14.304 31.968 31.968 31.968H192v64h303.936H128.128A63.968 63.968 0 0 1 64 799.872V128.128C64 92.704 92.48 64 128.128 64h671.744C835.296 64 864 92.48 864 128.128v367.808z" />
                </svg>
              </div>
              <div class="ve-icon-button ve-icon-button-default engine-datapool-list-item-title-icon">
                <svg fill="currentColor"
                     preserveAspectRatio="xMidYMid meet"
                     width="16"
                     height="16"
                     viewBox="0 0 1024 1024"
                     class="ve-svgicon"
                     style="vertical-align: middle;"
                >
                  <path d="M224 256v639.84A64 64 0 0 0 287.84 960h448.32A64 64 0 0 0 800 895.84V256h64a32 32 0 1 0 0-64H160a32 32 0 1 0 0 64h64zM384 96c0-17.664 14.496-32 31.904-32h192.192C625.696 64 640 78.208 640 96c0 17.664-14.496 32-31.904 32H415.904A31.872 31.872 0 0 1 384 96z m-96 191.744C288 270.208 302.4 256 320.224 256h383.552C721.6 256 736 270.56 736 287.744v576.512C736 881.792 721.6 896 703.776 896H320.224A32.224 32.224 0 0 1 288 864.256V287.744zM352 352c0-17.696 14.208-32.032 32-32.032 17.664 0 32 14.24 32 32v448c0 17.664-14.208 32-32 32-17.664 0-32-14.24-32-32V352z m128 0c0-17.696 14.208-32.032 32-32.032 17.664 0 32 14.24 32 32v448c0 17.664-14.208 32-32 32-17.664 0-32-14.24-32-32V352z m128 0c0-17.696 14.208-32.032 32-32.032 17.664 0 32 14.24 32 32v448c0 17.664-14.208 32-32 32-17.664 0-32-14.24-32-32V352z" />
                </svg>
              </div>
            </div>
          </div>
          <div class="engine-datapool-list-item-content">
            <div>
              <div class="engine-datapool-desc-item">
                <div class="engine-datapool-desc-item-label">
                  描述
                </div>
                <div class="engine-datapool-desc-item-content">
                  暂无描述
                </div>
              </div>
              <div class="engine-datapool-desc-item">
                <div class="engine-datapool-desc-item-label">
                  初始值
                </div>
                <div class="engine-datapool-desc-item-content" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </draggable>
  </div>
</template>
<script type="text/ecmascript-6">
export default {
  props: {
    data: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      currentIndex: -1
    }
  }
}
</script>
