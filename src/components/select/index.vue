<template>
  <div class="ve-select-control" :class="classNames">
    <el-select v-bind="$attrs" popper-class="select-popper" :popper-append-to-body="appendTo" v-on="$listeners">
      <el-option v-for="(item, index) in data"
                 :key="index"
                 :label="item.label"
                 :value="item.value"
      />
    </el-select>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  props: {
    classNames: {
      type: String,
      default: ''
    },
    data: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      appendTo: false
    }
  }
}
</script>

<style type="text/scss" lang="scss">
  .vs-style-font-family {
    width: 100%;
    ::v-deep .el-select {
      width: 100%!important;
    }
    ::v-deep .el-input__inner {
      width: 100% !important;
    }
    ::v-deep .el-input__icon {
      line-height: 30px!important;
    }
  }
  .ve-select-control {
    ::v-deep .el-select {
      width: 100%!important;
    }
  }
  .select-popper {
    border-radius: 2px!important;
    margin-top: 0!important;
    margin-left: -4px;
    width: 100%;
    ::v-deep .el-select-dropdown__empty {
      padding: 6px 0!important;
      font-size: 12px!important;
    }
    ::v-deep .popper__arrow {
      display: none;
    }
    ::v-deep .el-select-dropdown__item  {
      height: 28px!important;
      line-height: 28px!important;
      padding: 0 10px!important;
      font-size: 12px!important;
    }
  }
</style>
