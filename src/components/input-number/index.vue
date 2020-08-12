<template>
  <div class="ve-number-control" :class="units ? `ve-has-units ${classNames}`: `${classNames}`">
    <input type="text" class="ve-input" placeholder="" :min="min" :max="max">
    <div v-if="units" class="ve-units">
      <el-popover v-model="visible"
                  placement="bottom-end"
                  width="80"
                  popper-class="number-units-layer"
                  :visible-arrow="arrow"
      >
        <span slot="reference" class="ve-units-select">{{ currentUnit }}</span>
        <div class="vu-layer ve-units-layer vu-visible" style="max-height: 181px;">
          <div class="vu-layer-content">
            <div v-for="(item, index) in units" :key="index" class="ve-unit-item" @click="handleUnit(item)">
              {{ item }}
            </div>
          </div>
        </div>
      </el-popover>
    </div>
    <div class="ve-ticks">
      <i class="ve-tick ve-tick-up" />
      <i class="ve-tick ve-tick-down" />
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
const units = ['-', 'px', '%', 'em']
export default {
  props: {
    min: {
      type: Number,
      default: 0
    },
    max: {
      type: Number
    },
    unitsVisible: {
      type: Boolean,
      default: false
    },
    value: {
      type: Number,
      default: 0
    },
    classNames: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      arrow: false,
      units,
      currentUnit: '-',
      visible: false
    }
  },
  methods: {
    handleUnit(unit) {
      this.currentUnit = unit
      this.visible = !this.visible
    }
  }
}
</script>

<style scoped lang="scss" type="text/scss">
  .ve-number-control {
    width: 100%;
    position: relative;
    box-sizing: border-box;
    background: transparent;
    height: 28px;
    border-radius: 3px;
    border: 1px solid var(--color-field-border, rgba(31, 56, 88, .3));

    > input {
      &.ve-input {
        box-sizing: border-box;
        padding: 4px;
        display: block;
        font-size: 12px;
        font-family: PingFang SC, Hiragino Sans GB, Microsoft YaHei, Helvetica, Arial, sans-serif;
        border: 0;
        margin: 0;
        background: transparent;
        color: var(--color-text, rgba(0, 0, 0, .6));
        outline: none;
        height: 28px;
        line-height: 28px;
        width: calc(100% - 14px);
      }
    }

    &.ve-has-units {
      > .ve-input {
        width: calc(100% - 28px);
      }
    }

    .ve-units {
      position: absolute;
      right: 14px;
      top: 2px;
      background: var(--color-block-background-light, rgba(31, 56, 88, .04));
      bottom: 2px;
      border-radius: 3px;

      .ve-units-selected, > span {
        display: inline-flex;
        height: 100%;
        text-transform: lowercase;
        padding: 0 4px;
        color: var(--color-text, rgba(0, 0, 0, .6));
        font-family: Monaco, monospace;
        font-size: 12px;
        align-items: center;
        cursor: pointer;
      }
    }

    .ve-ticks {
      box-sizing: border-box;
      position: absolute;
      top: 0;
      right: 0;

      .ve-tick {
        box-sizing: border-box;
        display: block;
        font-size: 12px;
        color: var(--color-text, rgba(0, 0, 0, .6));
        line-height: 12px;
        text-align: center;
        font-style: normal;
        padding: 0 1px;
        cursor: pointer;

        &.ve-tick-up {
          &:after {
            content: "\25B2";
            display: inline-block;
            transform: scale(.8, .6);
          }
        }

        &.ve-tick-down {
          &:after {
            content: "\25B2";
            display: inline-block;
            transform: rotate(180deg) scale(.8, .6);
          }
        }
      }
    }

  }
</style>
