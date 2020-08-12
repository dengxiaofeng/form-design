<script>
 import Card from './card'
 import _ from 'lodash'
 import ListItem from '../list-item'
export default {
    components: {
        Card,
        ListItem
    },
    props: {
        className: {
            type: String,
            default: ""
        },
        itemClassName: {
            type: String,
            default: ""
        },
        items: {
            type: Array,
            default() {
                return []
            }
        },
        onSort: {
            type: Function,
            default() {
                return () => {}
            }
        },
        onManualSort: {
            type: Function,
            default() {
                return () => {}
            }
        }
    },
    data() {
        return {
            listItem: this.items
        }
    },
    mounted() {
        const shell = this.$refs.shell
        const items = this.items
        let flag = !1
        let node = void 0;
        let nextElement = void 0;
        let targetElement = void 0;
        const getElement = function(target) {
            let clientY = target.clientY
            target.view !== window && target.view.frameElement && (
                clientY += target.view.frameElement.getBoundingClientRect().top
            );

            for(var child = this.shell.firstElementChild;child;) {
                if( child !== node && child.dataset.id ) {
                    const rect = child.getBoundingClientRect()
                    if(rect.height <= 0) {
                        continue
                    }
                    if(clientY < rect.top + rect.height / 2) {
                        break
                    }
                }
                 child = child.nextElementSibling
            }
            return child
        }

        const containElement = function(element) {
            const target = element.target
            if(!shell.contains(target) || target === shell) {
                return null
            }
            for(var child = shell.firstElementChild;child;) {
                if(child.contains(target)) {
                    return child
                }
                child = child.nextElementSibling
            }
            return null
        }

        const onSort = (op) => {
            if(node) {
                const id = node.dataset.id
                let indexA = items.findIndex(item => {
                    return String(item.id) === id
                })

                let indexB = op ? items.findIndex(item => {
                    return String(item.id) === op
                }): items.length

                if(!(indexA < 0 || indexB < 0)) {
                    if(this.onSort) {
                        if(indexB > indexA && (indexB -=1), indexA === indexB) {
                            return
                        }
                        const data = items.splice(indexA, 1)
                        items.splice(indexB, 0, data[0])
                        this.onSort && this.onSort(items)
                    } else {
                        this.onManualSort && this.onManualSort(items[indexA], indexB)
                    }
                }

            }
        }

        const dragStart = (target) => {
            if(flag = !1, node = containElement(target), !node) {
                return !1
            }

            nextElement = node.nextElementSibling
            const rect = node.getBoundingClientRect()
            let element = node
            this.dragImageSourceHandler && (element = this.dragImageSourceHandler(node))
            target.dataTransfer.setDragImage(element, target.clientX - rect.left, target.clientY - rect.top)
            target.dataTransfer.effectAllowed = "move"
            target.dataTransfer.dropEffect = "move"
            try {
                target.dataTransfer.setData("application/json", {})
            }catch(e) {

            }

            return setTimeout(() => {
                nextElement.classList.add("ve-dragging")
            }, 0), !0

        }

        const insertNode = function(el) {
            el ? node !== node && shell.insertBefore(node, el): shell.appendChild(node)
        }

        const dragEnd = function(target) {
            flag = !0
            node && (
                target.preventDefault(), 
                target.classList.remove("ve-dragging"),
                insertNode(nextElement),
                onSort(targetElement ? targetElement.dataset.id: null),
                node = null,
                nextElement = null,
                targetElement = null
            )
        }
        const throttleTarget = _.throttle((e) => {
            node || (targetElement = getElement(e), insertNode(targetElement))
        }, 200);

        const dragOver = function(target) {
            node && ( target.preventDefault(), target.dataTransfer.effectAllowed = "move")
        }

        shell.addEventListener("dragstart", dragStart)
        document.addEventListener("dragover", dragOver)
        document.addEventListener("drag", dragOver)
        document.addEventListener("dragend", dragEnd)

        this.willDetach = () => {
            shell.removeEventListener("dragstart", dragStart)
            document.removeEventListener("dragover", dragOver)
            document.removeEventListener("drag", dragOver)
            document.removeEventListener("dragend", dragEnd)
        }

    },
    beforeDestroy() {
        this.willDetach && this.willDetach()
    },
    render(createElement) {
        console.log("render card", this.items)
        const className = {
            "ve-sortable": true,
            [this.className]: this.className ? true: false
        }
        const item = this.listItem ? this.listItem.map(item => {
            return (
                <Card key={item.id} card={item} class={this.itemClassName}>
                    {
                        item && item.content && item.content.render(createElement)
                    }
                </Card>
            )
        }): null
        return (
            <div class={className} ref="shell">
                {
                    item
                }
            </div>
        )
    },
    watch: {
        items: {
            handler(val, oldVal) {
                if(val !== oldVal) {
                    this.listItem = val
                }
            },
            deep: true
        }
    }
}
</script>