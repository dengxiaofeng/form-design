<template>
  <ul class="event-list">
    <li v-for="(item, index) in data" :key="index" @click="handleClick(item)">
      {{ item.name }}
    </li>
  </ul>
</template>

<script type="application/ecmascript">
export default {
  props: {
    data: {
      type: [Array, Object],
      default() {
        return []
      }
    }
  },
  methods: {
    handleClick(item) {
      this.$emit('change', item)
    }
  }
}
</script>

<style type="text/scss" lang="scss">
  .event-list {
    margin: 0 auto;
    padding: 0;
    li {
      list-style: none;
      height: 28px;
      line-height: 28px;
      padding: 0 12px;
      cursor: pointer;
      position: relative;
      &:hover {
        background: rgba(31, 56, 88, .04);
      }
    }
  }
</style>
