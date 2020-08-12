<script>
export default {
    props: {
        className: {
            type: String,
            default: ""
        },
        placeholder: {
            type: [String, Number],
            default: ''
        },
        min: {
            type: Number,
            default: null
        },
        max: {
            type: Number,
            default: null
        },
        onChange: {
            type: Function,
            default() {
                return () => {}
            }
        },
        value: {
            type: String,
            default: ""
        },
        units: {
            type: Array,
            default: []
        },
        compute: {
            type: Function,
            default() {
                return () => {}
            }
        },
        step: {
            type: Number,
            default: 1
        },
        disabled: {
            type: Boolean,
            default: false
        },
        readOnly: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            focused: !1
        }
    },
    methods: {
        onKeyDown() {

        },
        setupUnits() {

        },
        setupPlaceholder() {

        },
        setValue() {

        },
        intoRange() {

        },
        isInRange() {

        },
        parseValue() {

        },
        changeValue() {

        },
        changeUnit() {
            
        }
    }
}
</script>