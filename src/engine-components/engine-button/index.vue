<template>
  <el-button v-bind="$listener" v-on="$attr">
    {{ title }}
  </el-button>
</template>
<script type="text/ecmascript-6">
export default {
  props: {
    title: {
      type: String,
      default: ''
    }
  }
}
</script>
