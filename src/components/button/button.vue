<script>
    export default {
        props: {
            type: {
                type: String,
                default: "primary"
            },
            size: {
                type: String,
                default: "sm"
            },
            styles: {
                type: [String, Object],
                default: ""
            }
        },
        render() {
            const prefix="engine-uxcore-button"
            const className = {
                [prefix]: true,
                [`${prefix}-${this.type}`]: this.type,
                [`${prefix}-${this.size}`]: this.size
            }
            return (
                <button type="button" style={this.styles} class={className}>{this.$slots.default}</button>
            )
        }
    }
</script>
<style lang="scss" scoped>
    .engine-uxcore-button {
        padding: 0 16px;
        height: 32px;
        border-width: 1px;
        border-style: solid;
        border-radius: 3px;
        font-size: 12px;
        line-height: 30px;
        box-sizing: border-box;
        transition: all 0.3s ease;
        &-primary {
            background-color: #0079F2;
            border-color: #0079F2;
            color: #fff;
        }
        &-outline {
            background-color: #fff;
            border-color: #0079F2;
            color: #0079F2;
        }
        &-sm {
            padding: 0 8px;
            height: 28px;
            line-height: 26px;
            font-size: 12px;
        }
    }
</style>

