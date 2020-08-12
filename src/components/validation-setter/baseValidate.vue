<script>
import InlineField from '../filed-layout/inline-filed'
import BoolControl from '../bool-control'
export default {
    props: {
        rule: {
            type: Object,
            default() {
                return {}
            }
        }
    },
    data() {
        return {
            message: ''
        }
    },
    components: {
        InlineField,
        BoolControl
    },
    created() {
        this.willDetach = this.rule && this.rule.onChange(() => {
            console.log("forceUpdate")
        })
        const rule = this.rule
        this.validateContext = {
            getHotValue: function() {
                return rule.getParam("message")
            },
            setHotValue: function(value) {
                return rule.setParam("message", value)
            },
            onValueChange: function(param) {
                return rule.onChange(param)
            },
            getDefaultValue: function(params) {
                 return ""
            }
        }
         this.message = this.validateContext.getHotValue() || ""
    },
    methods: {
        getValue() {
            return this.validateContext.getHotValue() || ""
        }
    },
    beforeDestroy() {
        this.willDetach && this.willDetach()
    },
    render() {
        const rule = this.rule
        return (
            <div class="vs-rule-editor">
                <InlineField title="启用">
                    <BoolControl value={rule.isChecked()} handlerChange={(value) => rule.setCheck(value)}/>
                </InlineField>
                <InlineField title="错误提示">
                    <el-input placeholder="请输入" vModel={this.message} {...{on:{change: (value) => rule.setParam("message", value)}}}/>
                </InlineField>
            </div>
        )
    }
}
</script>