<script>
import InlineField from '@/components/filed-layout/inline-filed'
import Block from '@/components/block-field'
export default {
    components: {
        InlineField,
        Block
    },
    render() {
        return (
            <div class="engine-datapool-form-wrap engine-datapool-form-wrap-edit">
                <div class="engine-datapool-form-wrap-content">
                    <div class="engine-datapool-remote-form engine-datapool-form">
                        <InlineField title="名称">
                            <el-input value="123"></el-input>
                        </InlineField>
                        <InlineField title="描述">
                            <el-input value="123"></el-input>
                        </InlineField>
                        <InlineField title="请求地址">
                            <el-input value="123"></el-input>
                        </InlineField>
                        <InlineField title="请求方法">
                            <el-input value="123"></el-input>
                        </InlineField>
                        <Block title="请求参数"></Block>
                        <Block title="数据处理"></Block>
                    </div>

                </div>
            </div>
        )
    }
}
</script>

<style lang="scss" scoped>
    .engine-datapool-remote-form  {
        .ve-inline-field {
            padding: 5px 10px;
        }   
    }
</style>