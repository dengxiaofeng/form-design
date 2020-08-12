<script>
import InlineField from '../filed-layout/inline-filed'
export default {
    components: {
        InlineField
    },
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
            
        }
    },
    created() {
        const rule = this.rule
        let param = rule && rule.getParam("param")
        param || rule.setParam("param", {
            types: ["ipv4", "ipv6"]
        })
    },
    methods: {
        setType(type) {
            const rule = this.rule
            let param = rule && rule.getParam("param") || {};
            param.types = param.types || ["ipv4", "ipv6"]
            param.types.indexOf(type) >= 0 ? param.types.splice(param.types.indexOf(type), 1): param.types.push(type)
            rule.setParam("param", Object.assign({}, param))
        }
    },
    render() {
        const rule = this.rule
        const param = rule && rule.getParam("param") || {};
        const isIpv4 = param.types.indexOf("ipv4") >= 0
        const isIpv6 = param.types.indexOf("ipv6") >= 0
        const checkedIpv4 = {
            "ve-icon-button ve-icon-button-default vs-action-check": true,
            "vs-checked": isIpv4,
            "active": isIpv4
        }
        const checkedIpv6 = {
            "ve-icon-button ve-icon-button-default vs-action-check": true,
            "vs-checked": isIpv6,
            "active": isIpv6
        }
        return (
            <div class="vs-rule-editor">
                <InlineField title="支持类型">
                    <div class="vs-ip-rule-editor-type" onClick={() => this.setType("ipv4")}>
                        <div class={checkedIpv4}><svg fill="currentColor" preserveAspectRatio="xMidYMid meet" width="16" height="16" viewBox="0 0 1024 1024" class="ve-svgicon" style="vertical-align: middle;"><path d="M0.00064 192.640399A192.19176 192.19176 0 0 1 192.640399 0.00064h638.719202A192.19176 192.19176 0 0 1 1023.99936 192.640399v638.719202A192.19176 192.19176 0 0 1 831.359601 1023.99936H192.640399A192.19176 192.19176 0 0 1 0.00064 831.359601V192.640399z m421.503473 436.351455L240.448339 448.00008 149.952453 538.495967l271.55166 271.55166 452.479435-452.543434-90.431887-90.495887-362.047548 361.983548z"></path></svg></div>
                        ipv4
                    </div>
                    <div class="vs-ip-rule-editor-type" onClick={() => this.setType("ipv6")}>
                        <div class={checkedIpv6}><svg fill="currentColor" preserveAspectRatio="xMidYMid meet" width="16" height="16" viewBox="0 0 1024 1024" class="ve-svgicon" style="vertical-align: middle;"><path d="M0.00064 192.640399A192.19176 192.19176 0 0 1 192.640399 0.00064h638.719202A192.19176 192.19176 0 0 1 1023.99936 192.640399v638.719202A192.19176 192.19176 0 0 1 831.359601 1023.99936H192.640399A192.19176 192.19176 0 0 1 0.00064 831.359601V192.640399z m421.503473 436.351455L240.448339 448.00008 149.952453 538.495967l271.55166 271.55166 452.479435-452.543434-90.431887-90.495887-362.047548 361.983548z"></path></svg></div>
                        ipv6
                    </div>
                </InlineField>
                <InlineField title="错误提示">
                    <el-input placeholder="请输入"/>
                </InlineField>
                 <InlineField title="启用">
                    <el-checkbox value={rule.isChecked()}/>
                </InlineField>
            </div>
        )
    }
}
</script>