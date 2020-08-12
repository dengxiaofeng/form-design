<template>
    <div :style="{width: width}">
        <div class="el-pro-table-toolbar">
            <div class="el-pro-table-toolbar-title">{{title}}</div>
            <div class="el-pro-table-toolbar-option">
                <div class="el-space el-space-horizontal el-space-align-center">
                    <slot name="toolbar"></slot>
                </div>
                <div class="el-pro-table-toolbar-default-option">
                    <div class="el-space el-space-horizontal el-space-align-center">
                        <div class="el-space-item" style="margin-right: 8px;">
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <el-table v-on="$listeners" v-bind="$attrs" :data="dataSource" :size="display" :height="calcTableHeight">
            <template v-for="item in dataIndexs">
                <el-table-column
                        v-if="item.slotScope"
                        v-bind="item"
                        :key="item.prop"
                        v-on="$listeners">
                    <template slot-scope="scope">
                        {{item.prop}}
                        <slot :name="item.prop" v-bind="scope"></slot>
                    </template>
                </el-table-column>
                 <free-column v-else v-bind="$attrs" :key="item.prop" :column="item"/>
            </template>
        </el-table>
        <div class="tableFooter">
            <el-pagination
                    v-on="$listeners"
                    @current-change="pagination.onChange"
                    @size-change="pagination.onSizeChange"
                    :current-page="pagination.currentPage"
                    :page-size="pagination.pageSize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="pagination.total">
            </el-pagination>
        </div>
    </div>
</template>
<script type="text/ecmascript-6">
    import FreeColumn from './column'
    export default {
        components: {
            FreeColumn
        },
        props: {
            width: {
                type: String,
                default: '100%'
            },
            columns: {
                type: [Array, Object],
                default() {
                    return []
                }
            },
            dataSource: {
                type: Array,
                default() {
                    return []
                }
            },
            title: {
                type: String,
                default: ""
            },
            pagination: {
                type: Object,
                default() {
                    return {
                        currentPage: 1,
                        pageSize: 10,
                        total: 0,
                        onChange: () => {},
                        onSizeChange: () => {}
                    }
                }
            }
        },
        created() {
            this.initTableHeight(this.$attrs.height) 
        },
        data() {
            return {
                dataIndexs: this.columns,
                allColumn: true,
                isIndeterminate: true,
                selectColumn: [],
                display: 'mini',
                propsColumn: this.columns,
                calcTableHeight: this.$attrs.height
            }
        },
        methods:{
            initTableHeight(val) {
                var height= val.replace("px", "")
                this.calcTableHeight= (height - 40) +'px'
                console.log(this.calcTableHeight)
            },
            initSortKeyColumns() {
                if(this.columns && this.columns.length > 0) {
                    this.sortKeyColumns = this.columns.map((item, index) => {
                        const key = this.getColumnKey(item.prop, item.prop, index) || `${index}`;
                        return `${key}_${item.index}`;
                    })
                }
            },
            handleDisplay(value) {
                console.log(value)
                this.display = value
            },
            getColumnKey(key, dataIndex, index) {
                if(key) {
                    return key
                }

                if(!key && dataIndex) {
                    if(Array.isArray(dataIndex)) {
                        return dataIndex.join('-');
                    }
                    return dataIndex
                }
                return `${index}`
            },
            genColumnList(columns, map) {
               return columns.map((item, columnsIndex) => {
                    const columnKey = this.getColumnKey(item.prop, item.prop, columnsIndex);
                    const config = columnKey ? map[columnKey] || { fixed: item.fixed } : { fixed: item.fixed };
                    const tempColumns = {
                        index: columnsIndex,
                        ...item,
                        fixed: config.fixed
                    }

                    if (!tempColumns.prop) {
                        delete tempColumns.prop;
                    }
                    if (!tempColumns.filters || !tempColumns.filters.length) {
                        delete tempColumns.filters;
                    }
                    return tempColumns
                   
                }).filter((item) => !item.hideInTable)
            },
            getColumns(columns, columnsMap) {
                return columns.filter((item) => {
                    const { prop } = item;
                    const columnKey = this.getColumnKey(prop, prop);
                    if (!columnKey) {
                        return true;
                    }
                    const config = columnsMap[columnKey];
                    if (config && config.show === false) {
                        return false;
                    }
                    return true;
                })
            },
            handleSettingColumn(columnsMap) {
               const tableColumn = this.genColumnList(this.columns, columnsMap)
               this.propsColumn = tableColumn
               if(tableColumn && tableColumn.length > 0) {
                    this.dataIndexs = this.getColumns(tableColumn, columnsMap)
               }
            },
            handleSort(sortKeyColumns, columnsMap){
                debugger
                const keys= Array.isArray(sortKeyColumns) ? sortKeyColumns.join(","): [sortKeyColumns].join(",")
                let tableColumn = this.genColumnList(this.columns, columnsMap)
                if(sortKeyColumns.length > 0) {
                     tableColumn = tableColumn.sort((a, b) => {
                        const { fixed: aFixed, index: aIndex } = a;
                        const { fixed: bFixed, index: bIndex } = b;
                        if ((aFixed === 'left' && bFixed !== 'left') ||(bFixed === 'right' && aFixed !== 'right') ) {
                            return -2;
                        }
                        if ((bFixed === 'left' && aFixed !== 'left') || (aFixed === 'right' && bFixed !== 'right') ) {
                            return 2;
                        }
                        const aKey = `${this.getColumnKey(a.prop, a.prop, aIndex)}_${aIndex}`;
                        const bKey = `${this.getColumnKey(b.prop, b.prop, bIndex)}_${bIndex}`;
                        return keys.indexOf(aKey) - keys.indexOf(bKey);
                     });
                }
                if (tableColumn && tableColumn.length > 0) {
                    this.$set(this, 'dataIndexs', this.getColumns(tableColumn, columnsMap))
                    // this.dataIndexs = this.getColumns(tableColumn, columnsMap)
                    this.propsColumn = tableColumn
                }

                console.log(this.dataIndexs)

            }
        },
        watch: {
            columns: {
                handler(val) {
                    this.dataIndexs = val
                    this.propsColumn = val
                },
                deep: true
            },
            dataIndexs: {
                handler(val) {
                   console.log('update dataIndexs', val)
                },
                deep: true 
            },
            '$attrs.height'(val, oldVal) {
                this.initTableHeight(val)
            }

        }
    }
</script>

<style lang="scss">
    .el-space {
        display: inline-flex;
    }
    .el-space-align-center {
        align-items: center;
    }
    .el-pro-table-toolbar {
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 18px;
        margin-bottom: 10px;
        padding: 0 24px;
        .el-pro-table-toolbar-title {
            flex: 1 1;
            color: rgba(0,0,0,.85);
            font-weight: 500;
            font-size: 16px;
            line-height: 24px;
            opacity: .85;
        }
        .el-pro-table-toolbar-option {
            display: flex;
            align-items: center;
            justify-content: flex-end;
        }
    }
    .el-pro-table-toolbar-item-icon {
        margin-left: 16px;
        font-size: 16px;
        cursor: pointer;
    }
    .el-pro-table-toolbar-item-icon:first-child {
        margin-left: 8px;
    }
    .anticon[tabindex] {
        cursor: pointer;
    }
    .column-popver {
        padding:0!important;
        background: transparent;
    }
    .el-pro-table-column-setting-list {
        display: flex;
        flex-direction: column;
        width: 100%;
    }
    .el-pro-table-column-setting-list-item {
        // display: flex;
        // align-items: center;
        display: block;
        width: 50%;
        float: left;
        // padding: 4px 16px;
        // margin-left: -15px;
        // justify-content: space-between;
        &:hover {
            background-color: #e6f7ff!important;
           .el-pro-table-column-setting-list-item-option {
                display: block;
            }
        }
    }
    .el-pro-table-column-setting-title {
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 32px;
    }
    .el-pro-table-column-setting-list-title {
        color: #8c8c8c;
        font-size: 12px;
    }
    .el-popover-inner {
        background-color: #fff;
        background-clip: padding-box;
        border-radius: 2px;
        box-shadow: 0 3px 6px -4px rgba(0,0,0,.12), 0 6px 16px 0 rgba(0,0,0,.08), 0 9px 28px 8px rgba(0,0,0,.05);
        .el-popover-title {
            min-width: 177px;
            min-height: 32px;
            line-height: 32px;
            margin: 0;
            box-sizing: border-box;
            padding: 5px 16px 4px;
            color: rgba(0,0,0,.85);
            font-weight: 500;
            border-bottom: 1px solid #f0f0f0;
            .el-pro-table-column-setting-list {
                display: flex;
                align-items: center;
                justify-content: space-between;
                height: 32px;
            }
            a {
                cursor: pointer;
            }
        }
        .el-popover-inner-content {
            padding: 12px 16px;
            color: rgba(0,0,0,.65);
            width: 100%;;

        }
    }

    .el-pro-table-column-setting-list-item-option {
        display: none;
        float: right;
        cursor: pointer;
        .el-tooltip{
            &:last-child {
                margin-left: 8px;
            }
        }
    }

</style>
