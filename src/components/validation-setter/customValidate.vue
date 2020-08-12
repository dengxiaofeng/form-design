<script>
import BaseValidate from './baseValidate'
import InlineField from '../filed-layout/inline-filed'
import BlockField from '../block-field'
import BoolControl from '../bool-control'
import CodeControl from '../editor'
import babel from "@babel/core";
const editorConfig ={
    language: 'javascript',
    // lineNumbers: true,
    // minimap: {
    //     enabled: false
    // }
}
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
        BlockField,
        BoolControl,
        CodeControl
    },
    created() {
        const rule = this.rule
        this.codeProp = {
            getHotValue: function() {
                return void 0 === rule.getParam("param") ? "function validateRule(rule, value, callback) {\n }": rule.getParam("param").source
            },
            setHotValue: function(value) {
                const param = {
                    type: "js",
                    source: value,
                    compiled: "",
                    error: ""
                }
                return rule.setParam("param", param)
            },
            onValueChange: function(value) {
                return rule.onChange(value)
            },
            getDefaultValue: function() {
                return "function validateRule(rule, value, callback) {\n }"
            }
        }
    },
    render() {
        //
        const rule = this.rule
        return (
            <div class="vs-rule-editor">
                <InlineField title="启用">
                    <BoolControl value={rule.isChecked()} handlerChange={(value) => rule.setCheck(value)}/>
                </InlineField>
                <BlockField title="自定义函数">
                    <CodeControl editor-config={editorConfig} custom-style="width: 100%; height: 150px;" value={this.codeProp.getHotValue()} handlerBlur={(value) => this.codeProp.setHotValue(value)}></CodeControl>
                </BlockField>
                <InlineField title="错误提示">
                    <el-input/>
                </InlineField>
            </div>
        )
    }
}
</script>