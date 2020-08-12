<script>
import Icon from '@/engine-components/engine-icon'
import iconList from '@/engine-components/engine-icon/icons/icon'
export default {
    components: {
        Icon
    },
    props: {
        value: {
            type: String,
            default: ""
        }
    },
    methods: {
        hasIcon(icon) {
            return iconList.hasOwnProperty(icon)
        },
        delIcon() {

        },
        select() {
            this.$emit('select')
        }
    },
    render() {
        return (
            <div class="vs-icon">
                <div class="vs-icon-blank" onClick={() => this.select()}>
                    <Icon name={this.value && this.hasIcon(this.value) ? this.value: 'smile'} width="20px" height="20px" className="vs-icon-selected"></Icon>
                    <span class="vs-icon-text">{this.value || '请选择'}</span>
                </div>
                {
                    this.value && this.hasIcon(this.value) && (
                        <a class="vs-icon-del-wrapper" onClick={() => this.delIcon()}>
                            <Icon name="close" width="20px" height="20px" className="vs-icon-del"></Icon>
                        </a>
                    )
                }
                <Icon name="jiantouyou" width="20px" height="20px" className="vs-icon-entry"></Icon>
            </div>
        )
    }
}
</script>

<style lang="scss">
    .vs-icon {
        height: 26px;
        display: flex;
        align-items: center;
        cursor: pointer;
        .vs-icon-blank {
            flex: 1;
            display: flex;
            align-items: center;
        }
        .vs-icon-selected {
            margin-left: 5px;
            fill: var(--color-icon-normal,rgba(31,56,88,.4))!important;
        }
        .vs-icon-text {
            margin-left: 5px;
            font-size: 12px;
        }
        .vs-icon-del, .vs-icon-entry {
                width: 10px;
                height: 10px;
                fill: var(--color-icon-normal,rgba(31,56,88,.4))!important;
                opacity: .8;
                margin-right: 5px;
        }
        .vs-icon-del-wrapper {
            margin-left: 5px;
            line-height: 0;
        }
    }

</style>