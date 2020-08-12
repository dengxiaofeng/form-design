<template>
  <el-scrollbar class="left-scrollbar">
    <div class="components-list">
      <div v-for="(item, listIndex) in components" :key="listIndex">
        <div class="components-title">
          <svg-icon icon-class="component" />
          {{ item.title }}
        </div>
        <draggable
          class="components-draggable"
          :list="item.list"
          :group="{ name: 'componentsGroup', pull: 'clone', put: false }"
          :clone="cloneComponent"
          draggable=".components-item"
          :sort="false"
          @end="onEnd"
        >
          <div
            v-for="(element, index) in item.list"
            :key="index"
            class="components-item"
            @click="addComponent(element)"
          >
            <div class="components-body">
              <svg-icon :icon-class="element.componentConfig.tagIcon" />
              {{ element.componentConfig.label }}
            </div>
          </div>
        </draggable>
      </div>
    </div>
  </el-scrollbar>
</template>
<script type="text/ecmascript-6">
export default {
  props: {
    components: {
      type: Array,
      default: []
    },
    addComponent: {
      type: Function,
      default() {

      }
    },
    cloneComponent: {
      type: Function,
      default() {

      }
    },
    onEnd: {
      type: Function,
      default() {

      }
    }
  }
}
</script>
