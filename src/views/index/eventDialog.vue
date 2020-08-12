<template>
  <div>
    <el-dialog v-bind="$attrs" width="930px"
               :modal-append-to-body="false"
               :title="title"
               v-on="$listeners"
               @open="onOpen" @close="onClose"
    >
      <el-row>
        <el-col :span="8">
          <div>响应动作</div>
        </el-col>
        <el-col :span="16">
          <div>动作名称</div>
        </el-col>
      </el-row>
    </el-dialog>
  </div>
</template>

<script>
// import loadMonaco from '@/utils/loadMonaco'

export default {
  props: {
    title: {
      type: String,
      default: ''
    }
  },
  methods: {
    onOpen() {
    },
    onClose() {}
  }
}
</script>
