<template>
  <div class="engine-pages" style="width: 300px;">
    <div class="engine-pages-view-group">
      <div class="engine-pages-view-group-title">
        页面管理
      </div>
      <div class="engine-pages-view-group-buttons">
        <el-popover
          placement="bottom"
          width="260"
          trigger="click"
        >
          <div>
            <div class="dlg-body">
              <label class="kuma-label">页面名称</label>
              <div class="kuma-uxform-field-content edit-mode">
                <el-input v-model="pageName" size="mini" @change="handlePageChange" />
              </div>
            </div>
            <div class="popover-button-group">
              <el-button type="button" size="mini" class="engine-uxcore-button engine-uxcore-button-outline engine-uxcore-button-sm" style="margin-right: 8px; width: 64px;">
                取消
              </el-button>
              <el-button type="primary" size="mini" class="engine-uxcore-button engine-uxcore-button-primary engine-uxcore-button-sm" @click="savePage">
                确定
              </el-button>
            </div>
          </div>
          <button slot="reference" type="button" class="engine-uxcore-button engine-uxcore-button-outline engine-uxcore-button-secondary engine-pages-view-group-button engine-uxcore-button-sm">
            新建页面
          </button>
        </el-popover>
        <button type="button" class="engine-uxcore-button engine-uxcore-button-outline engine-pages-view-group-button engine-uxcore-button-sm">
          新建分组
        </button>
      </div>
    </div>
    <div class="nav-body">
      <div class="navDesignPage">
        <div class="rootDocument">
          <div class="lego-root">
            <div v-for="(item, index) in pages" :key="item.id" class="lego-base-item display" @click="handlerPage(item, index)" >
               <div class="lego-base-item-head lego-nav-item-trigger" :class="currentIndex === index ? 'active bg-primary-color': ''">
                  <i class="iconfont icon-display" />
                  <span>{{ item.name }}</span>
                </div>
                <div class="actions">
                  <div class="action">
                    <i class="iconfont icon-gear" />
                  </div>
                </div>
                <div class="lego-base-item-body" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import { newPage, uuid } from './createPage'

export default {
  data() {
    return {
      pageName: '',
      pages: JSON.parse(localStorage.getItem('schemaPageConfig')) || [],
      currentIndex: -1
    }
  },

  methods: {
    handlePageChange(val) {
      this.pageName = val
    },
    savePage() {
      const pageId =  uuid(8, '', 'page')
      const pageSchemaVersion = newPage()
      // const schema = localStorage.getItem('drawingItems') || [];
      // schema.push({
      //   [pageId]: pageSchemaVersion
      // })
      localStorage.setItem('drawingItems', JSON.stringify(pageSchemaVersion))
      this.pages.push({
        id: pageId,
        name: this.pageName
      })
      localStorage.setItem('schemaPageConfig', JSON.stringify(this.pages))
      window.location.reload()
    },
    handlerPage(item, index) {
      this.currentIndex = index
      this.$emit("selectPage", item.id)
    }
  }
}
</script>
<style lang="scss" type="text/scss">
  .kuma-label {
    margin-bottom: 4px;
  }
  .popover-button-group {
    padding: 6px 0 0;
    text-align: right;
    background: #fff;
    .engine-uxcore-button {
      padding: 0 16px;
      height: 32px;
      border-width: 1px;
      border-style: solid;
      border-radius: 3px;
      font-size: 12px;
      line-height: 30px;
      box-sizing: border-box;
      transition: all 0.3s ease;
      cursor: pointer;
    }
    .engine-uxcore-button-secondary {
      background-color: #ffffff;
      border-color: rgba(31, 56, 88, 0.3);
      color: rgba(31, 56, 88, 0.6);
    }
    .engine-uxcore-button-sm {
      padding: 0 8px;
      height: 28px;
      line-height: 26px;
      font-size: 12px;
    }
    .engine-uxcore-button-primary {
      background-color: #0079F2;
      border-color: #0079F2;
      color: #fff;
    }
  }
  .lego-base-item .lego-base-item-head:not(.active):hover {
    background: rgba(0, 0, 0, 0.1);
    cursor: pointer;
  }
  .lego-base-item .lego-base-item-head.active.bg-primary-color {
    background: #0079F2;
}
</style>
