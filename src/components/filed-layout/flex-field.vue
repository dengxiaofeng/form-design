<template>
  <div class="ve-field ve-plain-field vs-flex-field">
    <slot />
  </div>
</template>

<style scoped lang="scss">
  .ve-field {
    white-space: nowrap;
    position: relative;
    color: var(--color-text, rgba(0, 0, 0, 0.6));
    &.vs-flex-field {
      display: flex;
    }
  }
</style>
