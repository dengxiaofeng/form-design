<script>
export default {
    props: {
        className: {
            type: String,
            default: ""
        },
        card: {
            type: Object,
            default() {
                return {}
            }
        }
    },
    render() {
        return (
            <div class={"ve-sortable-card " + this.className} data-id={this.card.id}>
                {
                    this.$slots.default
                }
            </div>
        )
    }
}
</script>