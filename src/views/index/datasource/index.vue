<template>
  <div class="engine-datapool-view-group">
    <div class="engine-datapool-view-group-title">
      数据源
    </div>
    <div class="engine-datapool-view-operation-group">
      <div class="engine-datapool-view-search-group">
        <div class="ve-select-control">
          <el-select size="mini" />
        </div>
        <div class="ve-search-control">
          <el-input size="mini" />
        </div>
      </div>
      <div class="engine-datapool-view-button-group">
        <span>
          <el-button type="primary" class="engine-uxcore-button engine-uxcore-button-primary engine-uxcore-button-sm" style="margin-right: 8px; width: 64px;">
            添加
          </el-button>
        </span>
        <el-button type="button" class="engine-uxcore-button engine-uxcore-button-outline engine-uxcore-button-sm">
          全局配置
        </el-button>
      </div>
    </div>
    <group-list />
  </div>
</template>

<script type="text/ecmascript-6">
import GroupList from './group-list'

export default {
  components: {
    GroupList
  }
}
</script>
