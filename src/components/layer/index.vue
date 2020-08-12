<script>
import { getRect, resolveLayerPosition, getTarget, getBoundsParent } from './node'
export default {
    props: {
        className: {
            type: String,
            default: ""
        },
        target: {
            type: [Object, Function],
            default: null
        },
        styles: {
            type: Object,
            default: null
        },
        closeOnClickOutside: {
            type: Boolean,
            default: !0
        },
        position: {
            type: String,
            default: "bottom right"
        },
        visible: {
            type: Boolean,
            default: !1
        },
        showClose: {
            type: Boolean,
            default: !1
        },
        syncTargetWidth: {
            type: Boolean,
            default: !1
        },
        onHide: {
            type: Function,
            default(){
                return () => {}
            }
        },
        onShow: {
            type: Function,
            default(){
                return () => {}
            }
        },
        offset: {
            type: Object,
            default: null
        },
        noLimitOnMaxHeight: {
            type: Boolean,
            default: !1
        },
        maxHeight: {
            type: Number,
            default: null
        }
    },
    data() {
        return {
            layerVisible: this.visible
        }
    },
    mounted() {
        this.update()
    },
    methods: {
        update(){
            this.widthDetach && this.widthDetach.forEach(item => {
                return item()
            })
            this.widthDetach = []
            this.target && this.target.classList.remove("vu-layer-active")
            const shell = this.$refs.shell
            if(shell) {
                shell.classList.remove("vu-visible")
                if(this.target = getTarget(this.target) || this.target) {
                    this.target.classList.add("vu-layer-active")
                    const parent =getBoundsParent(shell) || document
                    if(this.boundsParent = parent, this.updatePosition(), shell.classList.add('vu-visible')) {
                        const mouseDown = (event) => {
                            !event.target || shell.contains(event.target) || this.target.contains(event.target) || this.hide()
                        }

                        document.addEventListener('mousedown', mouseDown)
                        this.widthDetach.push(() => {
                            document.removeEventListener('mousedown', mouseDown)
                        })
                    }
                }
            }
        },
        updatePosition() {
            if(this.target) {
                const shell = this.$refs.shell
                const rect = getRect(this.boundsParent)
                const targetRect = this.target.getBoundingClientRect()
                this.syncTargetWidth && (shell.style.width = targetRect.width + 'px')
                const shellRect = shell.getBoundingClientRect()
                const resolvePosition = resolveLayerPosition(shellRect, targetRect, rect, this.position)
                shell.style.top = parseInt(resolvePosition.top, 10) + (this.offset ? this.offset.top: 0) + 'px'
                shell.style.left = parseInt(resolvePosition.left, 10) + (this.offset ? this.offset.left: 0) + 'px'
                this.noLimitOnMaxHeight || (shell.style.maxHeight = (resolvePosition.height < (this.maxHeight || 300) ? resolvePosition.height: this.maxHeight|| 300) + 'px')
            }
        },
        hide() {
            this.layerVisible = !1
            this.onHide && this.onHide()
        },
        show() {
            this.layerVisible = !0
            this.onShow && this.onShow()
        },
        toggle() {
            this.layerVisible ? this.hide(): this.show()
        }
    },
    updated() {
        this.update()
    },
    beforeDestroy() {
        this.widthDetach && this.widthDetach.forEach(item => {
            return item()
        })
    },
    render() {
        if(!this.visible) {
            return null
        }
        const className = {
            "vu-layer": true,
            [this.className]: this.className ? true: false
        }
        return (
            <div class={className} ref="shell">
                {
                    this.showClose && (
                        <div class="vu-layer-close" onClick={() => this.hide()}>
                            <svg fill="currentColor" preserveAspectRatio="xMidYMid meet" width="12px" height="12px" viewBox="0 0 1024 1024" class="ve-svgicon" style="vertical-align: middle;"><path d="M556.8 512l272-272c12.8-12.8 12.8-32 0-44.8-12.8-12.8-32-12.8-44.8 0L512 467.2 240 195.2c-12.8-12.8-32-12.8-44.8 0-12.8 12.8-12.8 32 0 44.8l272 272-272 272c-12.8 12.8-12.8 32 0 44.8 12.8 12.8 32 12.8 44.8 0l272-272 272 272c12.8 12.8 32 12.8 44.8 0 12.8-12.8 12.8-32 0-44.8L556.8 512z"></path></svg>
                        </div>
                    )
                }
                <div class="vu-layer-content">{this.$slots.default}</div>
            </div>
        )
    },
    watch: {
        visible(val, oldVal) {
            if(val !== oldVal) {
                this.layerVisible = val
            }
        }
    }
}
</script>