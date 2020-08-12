<script>
export default {
    props: {
        className: {
            type: String,
            default: ""
        },
        handlerChange: {
            type: Function,
            default() {
                return () => {}
            }
        },
        value: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            on: !!this.value
        }
    },
    watch: {
        value(value) {
            this.on = value
        }
    },
    render() {
        const value = this.handlerChange ? this.value: this.on
        const className = {
            "ve-bool-control": true,
            "ve-on": value,
            [this.className]: this.className ? true: false
        }
        const handlClick = () => {
            debugger
            this.handlerChange ? this.handlerChange(!value): (this.on = !value)
        }
        return (
            <div class={className}>
                <div class="ve-slider" onClick={() => handlClick()}>
                    <i class="ve-block"></i>
                </div>
            </div>
        )
    }
}
</script>

<style type="text/scss" lang="scss">
  .ve-bool-control {
    box-sizing: border-box;
    width: 40px;
    height: 24px;
    border-radius: 20px;
    position: relative;
    overflow: hidden;
    .ve-slider {
      position: absolute;
      width: 85px;
      height: 24px;
      left: -37px;
      background-color: var(--color-block-background-disabled,rgba(31,56,88,.2));
      cursor: pointer;
      transition: left .13s ease;
      .ve-block {
        position: absolute;
        height: 18px;
        width: 18px;
        background-color: var(--color-block-background-normal,#fff);
        top: 0;
        left: 50%;
        margin-left: -1px;
        margin-top: 3px;
        border-radius: 18px;
      }
    }
    &.ve-on {
      .ve-slider {
        left: -24px;
        background-color: var(--color-function-success,#66bc5c);
      }
    }
  }
</style>
