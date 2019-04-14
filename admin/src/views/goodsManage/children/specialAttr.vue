<template>
    <el-form>
        <el-form-item label="购买方式：">
            <el-cascader :options="buyway" v-model="selectedBuyway"
                         @change="handleChange" placeholder="请选择购买方式">
            </el-cascader>
        </el-form-item>

        <el-form-item>
            <el-button type="primary" @click="$router.go(-1)">上一步</el-button>
            <el-button type="primary" @click="submitForm('goodsDetails')">立即创建</el-button>
            <el-button @click="resetForm('goodsDetails')">重置</el-button>
        </el-form-item>
    </el-form>
</template>

<script>
    export default {
        name: "specialAttr",
        data () {
            return {
                selectedBuyway: [],
                buyway: [
                    {value: '1', label: '香港直邮', children: [
                            { value: '1-1', label: '香港直邮1' },
                            { value: '1-2', label: '香港直邮2' }
                        ]},
                    {value: '2', label: '保税区发货', children: [
                            {value: '2-1', label: '保税区发货1'},
                            {value: '2-2', label: '保税区发货2'}
                        ]}
                ],
                goodsDetails: {

                }
            }
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        alert('submit!');
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            handleChange (value) {
                console.log(value);
            }
        }
    }
</script>

<style scoped>

</style>
