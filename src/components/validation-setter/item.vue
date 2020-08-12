<script>
import Validator from './util'
import BaseValidate from './baseValidate'
import EditValidate from './editValidate'
import CustomValidate from './customValidate'
import EditValidateIP from './editValidatorIP'
export default {
    components: {
        BaseValidate,
        EditValidate,
        CustomValidate,
        EditValidateIP
    },
    props: {
        config: {
            type: Object,
            default() {
                return {}
            }
        },
        handleChange: {
            type: Function,
            default() {
                return () => {}
            }
        }
    },
    data() {
        return {
            rule: null,
            children: null
        }
    },
    created() {
        debugger
        this.rule = new Validator(this.config, this.helpLink)
        this.willDetach = this.rule.onChange((params) => {
            this.handleChange && this.handleChange(params)
        })
    },
    watch: {
        config(val, oldVal) {
            if(val !== oldVal) {
                this.rule && this.rule.receiveConfig(val)
            }
        }
    },
    render(createElment) {
        const rule = this.rule
        const checked = rule && rule.isChecked()
        const checkClassName = {
            "ve-icon-button ve-icon-button-default": true,
            "vs-action-check vs-checked active": checked
        }
        const pathActive = "M0.00064 192.640399A192.19176 192.19176 0 0 1 192.640399 0.00064h638.719202A192.19176 192.19176 0 0 1 1023.99936 192.640399v638.719202A192.19176 192.19176 0 0 1 831.359601 1023.99936H192.640399A192.19176 192.19176 0 0 1 0.00064 831.359601V192.640399z m421.503473 436.351455L240.448339 448.00008 149.952453 538.495967l271.55166 271.55166 452.479435-452.543434-90.431887-90.495887-362.047548 361.983548z" 
        const path = "M0.00064 192.640399A192.19176 192.19176 0 0 1 192.640399 0.00064h638.719202A192.19176 192.19176 0 0 1 1023.99936 192.640399v638.719202A192.19176 192.19176 0 0 1 831.359601 1023.99936H192.640399A192.19176 192.19176 0 0 1 0.00064 831.359601V192.640399z m63.99992-0.255999v639.2312C64.00056 902.591512 121.472488 959.99944 192.3844 959.99944h639.2312A128.31984 128.31984 0 0 0 959.99944 831.6156V192.3844A128.31984 128.31984 0 0 0 831.6156 64.00056H192.3844A128.31984 128.31984 0 0 0 64.00056 192.3844z"
        let children = null
        return (
             <el-popover
                    placement="left"
                    width="264"
                    trigger="click" ref="popup">
                    {
                        this.children
                    }
                    <template slot="reference">

                        <div class="vs-validation-ruleitem" ref="shell" >
                            <div class="vs-ruleitem-body" 
                                onDoubleClick={
                                    () =>  children = rule.popedit(createElment, this.$refs.shell)
                                }>
                                {
                                    rule.getDescription()
                                }
                            </div>
                            <div class="vs-ruleitem-actions">
                                <div class="ve-icon-button ve-icon-button-default vs-action-edit" data-tip="编辑" onClick={() => {
                                    this.children = rule.popedit(createElment, this.$refs.popup)
                                }}>
                                        <svg fill="currentColor" 
                                            preserveAspectRatio="xMidYMid meet" 
                                            width="16" 
                                            height="16" 
                                            viewBox="0 0 1024 1024" 
                                            class="ve-svgicon" 
                                            style="vertical-align: middle;">
                                                <path d="M707.872 289.6l-256.32 256.32 56.576 33.952 33.92 56.576 256.32-256.32-90.496-90.528z m45.28-45.248l90.496 90.496 22.624-22.624a32 32 0 0 0 0-45.248L821.024 221.76a32 32 0 0 0-45.248 0l-22.624 22.624z m-346.88 346.848l-15.168 15.2v90.496h90.496l15.2-15.2-33.92-56.544-56.576-33.952zM843.68 153.856l90.496 90.496a64 64 0 0 1 0 90.496L508.16 760.896h-181.024v-181.024L753.152 153.856a64 64 0 0 1 90.496 0zM576 96a32 32 0 0 1-32 32H160c-17.696 0-32 14.208-32 31.744v704.512c0 17.184 14.336 31.744 32 31.744h704c17.696 0 32-14.208 32-31.744V608a32 32 0 0 1 64 0v287.84C960 931.264 931.2 960 896.288 960H127.68C92.512 960 64 931.296 64 895.84V128.16C64 92.736 92.8 64 127.712 64H544a32 32 0 0 1 32 32z" data-spm-anchor-id="0.0.0.i52.b2b37783EQtGD1"></path>
                                        </svg>
                                    </div>

                                    <div class={checkClassName} onClick={(event) => {
                                        rule.toggleCheck(), 
                                        event.stopPropagation();
                                    }}>
                                        <svg fill="currentColor" 
                                            preserveAspectRatio="xMidYMid meet" 
                                            width="16" 
                                            height="16" 
                                            viewBox="0 0 1024 1024" 
                                            class="ve-svgicon" 
                                            style="vertical-align: middle;">
                                            <path d={checked ? pathActive: path}></path>
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </template>
                     
                </el-popover>
          
        )
    },
    beforeDestroy() {
        this.willDetach && this.willDetach()
    }
}
</script>
<style lang="scss" scoped>
.vs-action-check.vs-checked svg>path:first-child {
    fill: var(--color-icon-active,#006cff);
    opacity: 1;
}
</style>