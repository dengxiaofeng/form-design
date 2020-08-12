<script>
export default {
    props: {
        content: {
            type: String,
            default: ""
        },
        customStyle: {
            type: Object,
            default() {
                return {}
            }
        },
        componentId: {
            type: String,
            default: "" 
        }
    },
    methods: {
        trans2Str(content) {
            return null != content ? (content + " ").trim(): ""
        },
        renderPreview(content) {
            const value = content.split(/\n/)
            const html ={
                _html: value.join("<br/>")
            }
            return (
                <div dangerouslySetInnerHTML={html}></div>
            )
        }

    },
    render() {
        const content = this.trans2Str(this.content)
        const className = "vc-text " + this.componentId
        return (
            <div class={className} data-setter-prop="content">
                {
                    /\n/.test(content) ? this.renderPreview(content): content
                }
            </div>
        )
    }
}
</script>