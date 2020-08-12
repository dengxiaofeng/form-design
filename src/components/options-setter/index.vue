<script>
import ListSetter from '../list-setter'
import _ from 'lodash'
import InlineField from '../filed-layout/inline-filed'
import BoolControl from '../bool-control'
export default {
    components: {
        ListSetter,
        InlineField,
        BoolControl
    },
    props: {
        multiple: {
            type: Boolean,
            default: !1
        },
        prop: {
            type: Object,
            default() {
                return {}
            }
        }
    },
    data() {
        return {
            options: [],
            searchReg: null
        }
    },
    render() {
        const configure = [{
            name: "sid",
            display: "none",
            initial: function(value) {
                return e || _.uniqueId(null, "opt")
            }
        }, {
            name: "text",
            title: '显示值',
            initialValue:'新选项',
            display: "inline",
            setter: {
                render(h, prop) {
                    return (
                        <InlineField title={prop.title}>
                            <el-input value={prop.value}/>
                        </InlineField>
                    )
                }
            }
        }, {
            name: "value",
            title: '选项值',
            initial: function(value) {
                return value ? value :_.uniqueId(value, "option", "optionsId")
            },
            display: "inline",
            setter: {
                render(h, prop) {
                    return (
                        <InlineField title={prop.title}>
                            <el-input value={prop.value}/>
                        </InlineField>
                    )
                }
            }
        }, {
            name: "defaultChecked",
            title: '默认选中',
            initialValue: !1,
            display: "inline",
            setter: {
                render(h, prop) {
                    return (
                        <InlineField title={prop.title}>
                            <BoolControl value={prop.value}/>
                        </InlineField>
                    )
                }
            }
        }]
        return (
            <ListSetter descriptor="text" checkField={this.multiple ? "*defaultChecked" : "defaultChecked"} configure={configure} prop={this.prop}></ListSetter>
        )   
    }

}
</script>

<style lang="scss" scoped>
.vs-list-box {
    position: relative;
}
.ve-sortable .ve-sortable-card:after, .ve-sortable .ve-sortable-card:before {
    content: "";
    display: table;
}
.vs-list-thin .ve-sortable-card {
    background: transparent;
    border: 1px solid rgba(31,56,88,.2)!important;
}
.vs-list .ve-sortable-card {
    border-top: 1px solid #fff;
    background-color: var(--color-block-background-light,rgba(31,56,88,.04));
    border-radius: 3px;
    margin-bottom: 8px;
}
.vs-list .ve-sortable-card .vs-listitem {
    position: relative;
    outline: none;
    display: flex;
    align-items: stretch;
    padding-left: 4px;
}
.vs-list .ve-sortable-card .vs-listitem .vs-action-check {
    margin-left: 3px;
    margin-right: 8px;
}
.ve-icon-button.ve-icon-button-default {
    max-height: 100%;
    overflow: hidden;
    opacity: 0.6;
}
.vs-list .ve-sortable-card .vs-listitem .vs-listitem-body {
    line-height: 28px;
    flex: 1;
    overflow: hidden;
    text-overflow: ellipsis;
}
.vs-list-thin .ve-sortable-card .vs-listitem .vs-listitem-actions {
    top: 7px;
}
.vs-list .ve-sortable-card .vs-listitem .vs-listitem-actions {
    position: absolute;
    right: 6px;
    top: 6px;
}
</style>