<script>
import Layer from '../layer'
import Search from './search'
export default {
    components: {
        Layer,
        Search
    },
    props: {
        list: {
            type: Object,
            default() {
                return {}
            }
        },
        options: {
            type: [Array, Function],
            default: []
        },
        onAddOptionData: {
            type: Function,
            default() {
                return () => {}
            }
        },
        addable: {
            type: Boolean,
            default: !1
        },
        layer: {
            type: Function,
            default() {
                return () => {}
            }
        }
    },
    data() {
        return {
            searchReg: []
        }
    },
    methods: {
        addItemHandler() {

        },
        addItem() {
            debugger
            this.addable && this.options.length ? "": this.list.addItem()
        }
    },
    render() {
        const addItem =  this.addable ? (
            <button class="vs-code-button" ref="layerTarget" onClick={() => {this.addItem()}}>添加一项</button>
        ): ""
    
        return (
            <div>
                {
                    addItem
                }
                <Layer className="ve-i18n-table" 
                       target={this.$refs.layerTarget} 
                       ref="layer" syncTargetWidth={!0} position="bottom left">
                    <div class="vs-action-contrainer">
                        <Search></Search>
                        <ul class="vs-list-panel">
                            
                        </ul>
                        <button class="vs-action-add-contrainer"></button>
                    </div>
                </Layer>
            </div>
        )
    }
}
</script>