<script>
import VuePropTypes from '../vue-types'
import LineChart from './line-chart'
import {chartUtil} from '../vue-types/utils'
export default {
    components: {
        LineChart
    },
    props: {
        componentId: VuePropTypes.string,
        width: VuePropTypes.number,
        userConfigs: VuePropTypes.string,
        context: VuePropTypes.object,
        allowDecimals: VuePropTypes.bool,
        series: VuePropTypes.array.def([{
            name: "测试数据",
            data: [2, 3, 4, 5, 6]
        }])
    },
    data() {
        return {
            chart: null
        }
    },
    mounted() {
        this.$nextTick(() => {
            this.chart = this.$$refs.chart
        })
    },
    methods: {
        parseChartProps(prop) {
            const props = prop || this;
            const config = chartUtil.parseSeries(props, {
                type: "line"
            })
            const lineConfig = Object.assign({
                type: "line",
                inverted: props.axesReverse
            }, chartUtil.parseColors(props), chartUtil.parseTitles(props), chartUtil.parseWAndH(props), chartUtil.parseXAxes(props, {
                series: config.series
            }), chartUtil.parseYAxes(props), chartUtil.parseLegend(props), chartUtil.parseTooltip(props), chartUtil.parseEvents(props, [{
                name: "click",
                event: "onClickGraph"
            }, {
                name: "clickSeries",
                event: "onClickSeries"
            }, {
                 name: "clickPoint",
                event: "onClickPoint"
            }]), config, {
                plotOptions: {
                    series: {
                        dataLabels: {
                            enabled: props.dataLabel,
                            style: {
                                color: "#333333"
                            },
                            padding: 8
                        }
                    }
                }
            })

            lineConfig.xAxis.allowDecimals = this.props.allowDecimals
            lineConfig.yAxis.allowDecimals = this.props.allowDecimals
            return lineConfig
        }
    },
    render() {
        return (
            <div class="vc-chart-line" style={{width: this.width ? this.width + (this.indexOf("px") > -1 ? "": "px"): auto}}>
                <LineChart id={this.componentId} name={this.componentId} ref="chart" onReady="chart" {...this.parseChartProps()}>

                </LineChart>
            </div>
        )
    },
    watch: {
        chart(val) {
            const config = this.parseChartProps(this)
        }
    }
}
</script>