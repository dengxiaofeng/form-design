<template>
  <div class="engine-slate engine-slate-default" style="width: 300px;">
    <div v-if="title" class="engine-slate-header">
      <div class="engine-slate-tabs">
        <div class="engine-slate-title engine-active">
          <div class="engine-slate-title-wrap">
            <div>{{ title }}</div>
          </div>
        </div>
      </div>
      <CloseIcon @click.stop="handleClose" />
    </div>
    <div class="engine-slate-content">
      <slot />
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
import CloseIcon from '@/components/SvgIcon/close'

export default {
  components: {
    CloseIcon
  },
  props: {
    title: {
      type: String,
      default: ''
    }
  },
  methods: {
    handleClose() {
      this.$emit('close')
    }
  }
}
</script>
