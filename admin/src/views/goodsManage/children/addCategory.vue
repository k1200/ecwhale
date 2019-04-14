<template>
    <el-form>
        <el-form-item label="父类" prop="categoryParent">
            <el-input></el-input>
        </el-form-item>
    </el-form>
</template>

<script>
    export default {
        name: "addCategory",
        data () {
            return {
                category: []
            }
        }
    }
</script>

<style scoped>

</style>
