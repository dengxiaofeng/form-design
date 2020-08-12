<script>
import _ from 'lodash'
import { defaultRules } from './util'
import ValidateItem from './item'
 function hasOwn(target, keys) {
    var ret = {};
    for (var key in target)
        keys.indexOf(key) >= 0 || Object.prototype.hasOwnProperty.call(target, key) && (ret[key] = target[key]);
    return ret
}
export default {
    props: {
        supports: {
            type: Array,
            default: ["required"]
        },
        enableCustomValidate: {
            type: Boolean,
            default: !0
        },
        value: {
            type: Array,
            default: []
        },
    },
    components: {
        ValidateItem
    },
    created() {
        this.transducer = {
            toHot: function(data) {
                Array.isArray(data) || (data = []);
                return data.map(item => {
                    return item.type && defaultRules[item.type] ? Object.assign({
                        checked: !0
                    }, item): null
                }).filter(item => {
                    return null != item
                })
            },
            toNative: function(data) {
                 Array.isArray(data) || (data = []);
                 return data.filter(item => {
                     return item && item.checked
                 }).map(item => {
                     const ret = (item.checked, hasOwn(item, ["checked"]))
                     return ret
                 })
            }
        }
    },
    render() {
        const helpLink = this.helpLink
        const className = {
            "vs-validation": true,
            [this.className]: this.className ? true: false
        }
        const ret = {};
        (this.value || []).forEach(item => {
            item && item.type && (ret[item.type] = item)
        });
        const validateProp = (this.supports || []).concat(this.enableCustomValidate ? ["customValidate"]: []).map(item => {
            let key = void 0
            let value = void 0
           return "object" === ("undefined" == typeof item ? "undefined": _.isSymbol(item)) ? (key = item.type, value =Object.assign({
                checked: !1
            }, item, ret[key])): (
                key = item,
                value = Object.assign({
                    type: key,
                    checked: !1
                }, ret[key])
            )
            defaultRules.hasOwnProperty(key) ? value: null
        }).filter(item => {
            return null !== item
        })
        const onChange = (param) => {
            const index = validateProp.findIndex(item => {
                return item.type === param.type
            })
            index > - 1 && (validateProp[index] = param)
            const selectReg = validateProp.filter(item => {
                return item.checked === true
            })
            this.$emit("change", selectReg)
           // this.setHotValue(validateProp)
        }

        return (
            <div class={className}>
                {
                    validateProp.map(item => {
                        return (
                            <ValidateItem key={item.type} config={item} handleChange={(param) => onChange(param)} helpLink={helpLink}></ValidateItem>
                        )
                    })
                }
            </div>
        )
    }
}
</script>

<style lang="scss">
    .vs-validation {
        margin: 6px;
        .vs-validation-ruleitem {
            border-top: 1px solid #fff;
            position: relative;
            display: flex;
            align-items: center;
            &:first-child {
                border-top: 1px solid transparent;
            }
            .vs-ruleitem-body {
                height: 30px;
                line-height: 30px;
                flex: 1;
                overflow: hidden;
                text-overflow: ellipsis;
                padding-left: 10px;
            }
            .vs-ruleitem-actions{
                width: 50px;
                > * {
                    margin-left: 5px;
                }
            }
        }

    }
</style>