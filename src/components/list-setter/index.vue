<script>
import Sortable from '../sortable'
import AddItem from './addListItem'
import ListUtil from './util'
import _ from 'lodash'
export default {
    components: {
        Sortable,
        AddItem
    },
    props: {
        prop: {
            type: Object,
            default() {
                return {}
            }
        },
        configure: {
            type: Array,
            default: [{
                name: "id",
                titlle: "ID",
                display: "none",
                initial: function(value) {
                    return _.uniqueId(value, "item", "list")
                }
            }, {
                name: "title",
                title: "标题",
                initialValue: "新项目"
            }, {
                name: 'defaultChecked',
                title: '选中',
                display: "none",
                initialValue: !1
            }, {
                name: 'badge',
                title: '角标',
                display: "inline",
                initialValue: "",
            }]
        },
        addable: {
            type: Boolean,
            default: !0
        },
        deletable: {
            type: Boolean,
            default: !0
        },
        descriptor: {
            type:[String, Function],
            default: "title"
        },
        checkField: {
            type: String,
            default: "defaultChecked"
        },
        display: {
            type: String,
            default: ""
        },
        className: {
            type: String,
            default: ""
        },
        options: {
            type: [Array, Function],
            default() {
                return []
            }
        },
        onAddOptionData: {
            type: Function,
            default() {
                return () => {}
            }
        },
        onEdit: {
            type: Function,
            default() {
                return () => {}
            }
        },
        editable: {
            type: [Boolean, Function],
            default: !0
        },
        draggable: {
            type: [Boolean, Function],
            default: false
        },
        minLength: {
            type: Number,
            default: null
        },
        maxLength: {
             type: Number,
            default: null
        },
    },
    data() {
        return {
            listOptions: ("function" == typeof this.options ? this.options(this) : this.options) || [],
            searchReg: null,
            layerRef: null,
            renderItems: [],
            list: null
        }
    },
    beforeMount() {
        this.list = new ListUtil(this.prop, this, () => {
            this.$forceUpdate()
        })
        this.renderItems = this.list.getItems()
        console.log("this.renderItems", this.renderItems)
    },
    methods: {
        setOptions(config) {
            this.listOptions = ("function" === typeof config.options ? config.options(config): config.options) || []
        },
        getLayerRef(ref) {
            this.layerRef = ref
        }
    },
    render() {
        let flag = !1
        const style = {}
        // this.draggable && (style.paddingLeft = "21px")
        style.paddingLeft = "21px"
        style.paddingRight = 7 + (this.deletable ? 19: 0) + (this.editable ? 19: 0) + (this.checkField ? 19: 0) + "px"

        const children =  this.list.editItemsNum ? (
            <ul class="vs-list-title" style={style}>
                {
                    this.list.configure.map(item => {
                        return item && item.editable ? flag = !0 && (
                            <li style={{width:  100 / this.list.editItemsNum + '%'}} key={item.title} class="vs-title-li">{item.title}</li>
                        ): null
                    })
                }
            </ul>
        ): "";
        const className = {
            "vs-list": true,
            [this.className]: this.className ? true: false,
            "vs-list-thin": flag ? "": true
        }
        // this.list.items.length ? 
        return (
            <div class={className}>
                {
                   this.list.items.length ? children: ""
                }
                <Sortable class="vs-list-box" items={this.list.getItems()}></Sortable>
                <AddItem options={this.listOptions} 
                         list={this.list} 
                         layerTarget={this.layerTarget} 
                         layer={this.getLayerRef} 
                         addable={this.addable} 
                         onAddOptionData={this.onAddOptionData}></AddItem>
            </div>
        )
    },
    watch: {
        options(val, oldVal) {
            if(val !== oldVal) {
                this.listOptions = this.setOptions(this)
            }
        },
        checkField(val, oldVal) {
            debugger
            console.log('checkField', val)
            if(val !== oldVal) {
                this.list && this.list.setCheckField(this.checkField)
                this.renderItems = this.list.getItems()
                this.list.updateItems(this.prop)
            }
        }
    }
}
</script>