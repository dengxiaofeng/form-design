<script>
export default {
    props: {
        onSearch: {
            type: Function,
            default() {
                return () => {}
            }
        },
        placeholder: {
            type: String,
            default: ""
        },
        searchText: {
            type: String,
            default: ""
        }
    },
    data() {
        return {
            isEmpty: !0,
            value: ""
        }
    },
    render() {
        return (
            <div class="ve-search-control">
                <input class="ve-input" value={this.value} placeholder={this.placeholder || '搜索'}/>
            </div>
        )
    }
}
</script>