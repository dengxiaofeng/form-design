<script>
const textRang = function(element, len) {
    if(!element) {
        return !1
    }
    if("selectionStart" in element) {
        element.selectionStart = len
        element.selectionEnd = len
        element.focus()
    } else if(element.createTextRange) {
        const createRange = element.createTextRange()
        createRange.collapse(!0)
        createRange.moveEnd("character", len)
        createRange.moveStart("character", len)
        createRange.select()
    }
    return !1
}
export default {
    props: {
        className: {
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
        placeholder: {
           type: String,
            default: "" 
        },
        maxLength: {
            type: Number,
            default: null
        },
        onChange: {
            type: Function,
            default() {
                return () => {}
            }
        },
        onBlur: {
            type: Function,
            default() {
                return () => {}
            }
        },
        value: {
            type: String,
            default: ""
        },
        autoFocus: {
            type: Boolean,
            default: !1
        },
        readOnly: {
             type: Boolean,
            default: !1
        },
        disabled: {
              type: Boolean,
            default: !1
        },
        valid: {
            type: Boolean,
            default: !1
        }
    },
    data() {
        return {
            focused: !1,
            inputValue: this.value
        }
    },
    watch: {
        value(val, oldVal) {
            if(val !== oldVal) {
                this.inputValue = val
            }
        }
    },
    mounted() {
        this.autoFocus && this.focus()
    },
    methods: {
        focus() {
            const value = "number" == typeof this.inputValue ? String(this.inputValue): this.inputValue
            this.$refs.input && (this.$refs.input.focus(), value && textRang(this.$refs.input, value.length))
            document.activeElement !== this.$refs.input && setTimeout(() => {
                this.$refs.input && (this.$refs.focus(), value && textRang(this.$refs.input, value.length))
            }, 2)
        },
        handleChange(value) {
            this.inputValue = value
            this.onChange && this.onChange(value)
        }
    },
    render() {
        const props = {
            ref: "input",
            class: "ve-input",
            placeholder: this.placeholder,
            value: this.value || "",
            onChange: (event) => {
                return this.handleChange(event.target.value)
            },
            onBlur:(event) => {
                this.focused = !1
                this.onBlur && this.onBlur(event.target.value)
            },
            onFocus: (event) => {
                this.focused = !0
                this.onFocus && this.onFocus(event.target.value)
            },
            autoFocus: this.autoFocus,
            disabled: this.disabled,
            readOnly: this.readOnly
        }
        return (
            <div>
                {
                    this.multiline ? (
                        <textarea {...Object.assign({}, props, {
                            rows: this.rows
                        })}></textarea>
                    ): (
                        <input {...Object.assign({}, props, {
                            type: "text"
                        })}></input>
                    )
                }
            </div>
        )
    }
}
</script>