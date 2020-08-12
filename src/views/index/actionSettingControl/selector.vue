<template>
  <div class="ve-action-setting-selector">
    <div class="ve-action-setting-title">
      响应动作
    </div>
    <div class="ve-action-setting-selector-inner">
      <ul class="ve-action-setting-selector-category ve-action-setting-ul">
        <li v-for="(item, index) in actionTypes" :key="item.value" @click="onActionTypeChange(index, item)">
          {{ item.text }}
          <div v-if="currentIndex === index" class="ve-icon-button ve-icon-button-default active">
            <svg fill="currentColor" preserveAspectRatio="xMidYMid meet" width="16" height="16" viewBox="0 0 1024 1024" class="ve-svgicon" style="vertical-align: middle;"><path d="M886.4 240c-12.8-12.8-32-12.8-44.8 0L364.8 716.8l-182.4-182.4c-12.8-12.8-32-12.8-44.8 0-12.8 12.8-12.8 32 0 44.8l204.8 204.8c6.4 6.4 12.8 9.6 22.4 9.6 9.6 0 16-3.2 22.4-9.6L886.4 284.8c12.8-12.8 12.8-32 0-44.8z" /></svg>
          </div>
        </li>
      </ul>
      <div class="vs-code-actions-items-container">
        <ul class="vs-code-actions-items ve-action-setting-ul">
          <li class="active" title="添加新动作">
            添加新动作
            <div class="ve-icon-button ve-icon-button-default active">
              <svg fill="currentColor"
                   preserveAspectRatio="xMidYMid meet"
                   width="16"
                   height="16"
                   viewBox="0 0 1024 1024"
                   class="ve-svgicon"
                   style="vertical-align: middle;"
              >
                <path d="M886.4 240c-12.8-12.8-32-12.8-44.8 0L364.8 716.8l-182.4-182.4c-12.8-12.8-32-12.8-44.8 0-12.8 12.8-12.8 32 0 44.8l204.8 204.8c6.4 6.4 12.8 9.6 22.4 9.6 9.6 0 16-3.2 22.4-9.6L886.4 284.8c12.8-12.8 12.8-32 0-44.8z" />
              </svg>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
const NEW_ACTION_ID = '__newId__'
export default {
  data() {
    return {
      ACTION_TYPES: [
        {
          value: 'page',
          text: '页面 JS'
        },
        {
          value: 'global',
          text: '项目 JS'
        },
        {
          value: 'custom',
          text: '自定义动作'
        }
      ],
      currentIndex: 0,
      actionType: 'page'
    }
  },
  methods: {
    onActionTypeChange(index, type) {
      this.currentIndex = index
      this.actionType = type
    }
  }
}
</script>
