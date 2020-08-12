<template>
  <div>
    <div class="vs-style-border">
      <div class="vs-style-border-style">
        <div class="vs-style-border-setter-left-pane">
          <div class="vs-style-border-setter-row">
            <div class="">
              <span data-tip="左边框">┣</span>
            </div>
          </div>
          <div class="vs-style-border-setter-row">
            <div class="">
              <span data-tip="上边框">┳</span>
            </div>
            <div class="">
              <span data-tip="全部">╋</span>
            </div>
            <div class="">
              <span data-tip="下边框">┻</span>
            </div>
          </div>
          <div class="vs-style-border-setter-row">
            <div class="vs-style-border-selected">
              <span data-tip="右边框">┫</span>
            </div>
          </div>
        </div>
        <div class="vs-style-border-setter-right-pane">
          <inline-filed title="线形" compact>
            <Select />
          </inline-filed>
          <inline-filed title="宽" compact>
            <input-number units-visible />
          </inline-filed>
          <inline-filed title="颜色" compact>
            <Color />
          </inline-filed>
        </div>
      </div>
    </div>
    <div class="vs-style-border-radius">
      <div class="vs-style-border-setter-left-pane">
        <div class="vs-style-border-setter-row">
          <div class="">
            <span data-tip="左上角">┏</span>
          </div>
          <div class="">
            <span data-tip="右下角">┗</span>
          </div>
        </div>
        <div class="vs-style-border-setter-row">
          <div class="vs-style-border-selected">
            <span data-tip="全部">╋</span>
          </div>
        </div>
        <div class="vs-style-border-setter-row">
          <div class="">
            <span data-tip="右上角">┓</span>
          </div>
          <div class="">
            <span data-tip="右下角">┛</span>
          </div>
        </div>
      </div>
      <div class="vs-style-border-setter-right-pane">
        <inline-filed title="圆角" compact>
          <input-number units-visible />
        </inline-filed>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import Collapsed from '../collapsed'
import InlineFiled from '../filed-layout/inline-filed'
import Select from '../select'
import InputNumber from '../input-number'
import Color from '../color-control'

export default {
  components: {
    InlineFiled,
    Collapsed,
    Select,
    InputNumber,
    Color
  }
}
</script>
<style scoped lang="scss">
  @import "./index.scss";
</style>
