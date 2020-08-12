<script>
import VCIcon from '@/engine-components/engine-icon'
export default {
    components: {
        VCIcon
    },
    props: {
        accordion: {
            type: Boolean,
            default: true,
        },
        highlight: {
            type: Boolean,
            default: false,
        },
        title: {
            type: String,
            default: ""
        },
        className: {
            type: String,
            default: ""
        }
    },
    data() {
        return {
            collapsed: this.accordion
        }
    },
    render() {
        const className = {
            "engine-accordion-field": true,
            [this.className]: true,
             "engine-collapsed": this.collapsed,
             "engine-highlight": this.highlight
        }

        return (
            <div class={className}>
                <div class="engine-field-head" onClick={() => this.collapsed = !this.collapsed}>
                    <VCIcon className="engine-field-arrow" name="arroCollaps"></VCIcon>
                    <span class="engine-field-title">{this.title}</span>
                </div>
                <div class="engine-field-body">
                    {
                        this.$slots.default
                    }
                </div>
            </div>
        )
    }
}
</script>