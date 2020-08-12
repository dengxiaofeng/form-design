<script>
import TextArea from '../textarea'
export default {
    functional: true,
    components: {
        TextArea
    },
    props: {
        placeholder: {
            type: String,
            default: ""
        },
        multiline: {
            type: Boolean,
            default: !1
        },
        rows: {
            type: Number,
            default: 10
        },
        required: {
            type: Boolean,
            default: !1
        },
        maxLength: {
            type: Number,
            default: null
        }
    },
    mounted() {
        this.willDetach = this.onValueChange(() => {
            //
        })
    },
    beforeDestroy() {
        this.willDetach && this.willDetach()
    },
    render(createElement, context) {
        return (
            <TextArea {...context.props}></TextArea>
        )
    }
}
</script>