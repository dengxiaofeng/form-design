<template>
  <div class="ve-field ve-plain-field">
    <slot />
  </div>
</template>

<style scoped lang="scss">
  .ve-field {
    white-space: nowrap;
    position: relative;
    color: var(--color-text, rgba(0, 0, 0, 0.6))
  }
</style>
