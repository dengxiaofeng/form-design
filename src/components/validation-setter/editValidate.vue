<script>
import BaseValidate from './baseValidate'
import InlineField from '../filed-layout/inline-filed'
import BoolControl from '../bool-control'
export default {
    // extends: BaseValidate,
     props: {
        rule: {
            type: Object,
            default() {
                return {}
            }
        }
    },
    components: {
        InlineField,
        BoolControl
    },
    data() {
        return {
            param: "",
            message: ""
        }
    },
    created() {
        this.willDetach = this.rule && this.rule.onChange(() => {
            console.log("forceUpdate")
        })
        const rule = this.rule
        this.validateContext = {
            getHotValue: function() {
                const value = rule.getParam("message") 
                return value === undefined ? "": value
            },
            getHotParam: function() {
                const value = rule.getParam("param") 
                return value === undefined ? "": value
            }
        }
        this.param = this.validateContext.getHotParam() || "";
        this.message = this.validateContext.getHotValue() || "";

    },
    render() {
        const rule = this.rule
       
        return (
            <div class="vs-rule-editor">
                <InlineField title={rule.getDescription()}>
                    <el-input placeholder={"请输入" +rule.getDescription()} vModel={this.param} {...{on:{change: (value) => {
                        console.log("value", value)
                        rule.setParam("param", value),
                        this.param = value
                    }}}}/>
                </InlineField>
                <InlineField title="错误提示">
                    <el-input placeholder={"请输入" +rule.getDescription()} vModel={this.message} {...{on:{change: (value) => rule.setParam("message", value)}}}/>
                </InlineField>
                <InlineField title="启用">
                    <BoolControl value={rule.isChecked()} handlerChange={(value) => rule.setCheck(value)}/>
                </InlineField>
            </div>
        )
    }
}
</script>