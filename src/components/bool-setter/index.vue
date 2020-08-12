<script>
import BoolControl from '../bool-control'
export default {
    components: {
        BoolControl
    },
    props: {
        value: {
            type: Boolean,
            default: false
        },
        onChange: {
            type: Function,
            default() {
                return () => {}
            }
        }
    },
    render() {
        return  (
            <BoolControl value={this.value} onChange={(param) => this.onChange(param)}></BoolControl>
        )
    }
}
</script>