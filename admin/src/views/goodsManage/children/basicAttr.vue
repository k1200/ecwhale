<template>
    <el-form :model="goodsDetails"
             :rules="rules"
             ref="goodsDetails"
             label-width="120px"
             class="demo-goodsDetails"
             style="width: 460px">
        <el-form-item label="商品名称：" prop="name">
            <el-input v-model="goodsDetails.name" placeholder="请输入商品名称"></el-input>
        </el-form-item>
        <el-form-item label="商品简介：" prop="desc">
            <el-input type="textarea" v-model="goodsDetails.desc" placeholder="请输入商品简介"></el-input>
        </el-form-item>
        <el-form-item label="商品类型：" prop="category">
            <el-cascader :options="category"
                         v-model="selectedCategory"
                         @change="handleChange"
                         placeholder="请选择商品类型"
                         filterable>
            </el-cascader>
            <el-button type="primary" @click="addCategory">添加类型</el-button>
        </el-form-item>
        <el-form-item label="商品品牌：" prop="brand">
            <el-select v-model="goodsDetails.brand" placeholder="请选择商品品牌">
                <el-option label="品牌一" value="shanghai"></el-option>
                <el-option label="品牌二" value="beijing"></el-option>
            </el-select>
            <el-button type="primary" @click="addBrand">添加品牌</el-button>
        </el-form-item>
        <el-form-item label="商品价格：" prop="price">
            <el-input v-model="goodsDetails.price" placeholder="请输入商品价格"></el-input>
        </el-form-item>
        <el-form-item label="商品VIP价：" prop="vipPrice">
            <el-input v-model="goodsDetails.vipPrice" placeholder="请输入商品VIP价"></el-input>
        </el-form-item>
        <el-form-item label="限购数量：" >
            <el-input type="number" v-model="goodsDetails.limit" placeholder="请输入商品限购数量"></el-input>
        </el-form-item>

        <el-form-item label="商品列表图：">
            <el-upload
                    action="https://jsonplaceholder.typicode.com/posts/"
                    list-type="picture-card"
                    accept="image/*"
                    :limit="1"
                    :on-success="handleAvatarSuccess"
                    :before-upload="beforeAvatarUpload"
                    :on-preview="handlePictureCardPreview"
                    :on-remove="handleRemove"
                    :on-exceed="handleLimit(1)">
                <i class="el-icon-plus"></i>
                <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible">
                <img width="100%" :src="dialogImageUrl" alt="">
            </el-dialog>
        </el-form-item>
        <el-form-item label="商品Banner图(PC)：">
            <el-upload
                    class="upload-demo upload-demo-pc"
                    ref="upload_pc"
                    action="https://jsonplaceholder.typicode.com/posts/"
                    multiple
                    :limit="5"
                    accept="image/*"
                    :on-preview="handlePreview"
                    :on-remove="handleRemove"
                    list-type="picture-card"
                    :file-list="fileList_pc"
                    :auto-upload="false"
                    :on-exceed="handleLimit(5)">
                <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
                <el-button class="btn-submit-files" size="small" type="success" @click="submitUpload('pc')">上传到服务器</el-button>
                <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible">
                <img width="100%" :src="dialogImageUrl" alt="">
            </el-dialog>
        </el-form-item>
        <el-form-item label="商品Banner图(WAP)：">
            <el-upload
                    class="upload-demo upload-demo-wap"
                    ref="upload_wap"
                    action="https://jsonplaceholder.typicode.com/posts/"
                    multiple
                    :limit="5"
                    accept="image/*"
                    :on-preview="handlePreview"
                    :on-remove="handleRemove"
                    list-type="picture-card"
                    :file-list="fileList_wap"
                    :auto-upload="false"
                    :on-exceed="handleLimit(5)">
                <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
                <el-button  class="btn-submit-files" size="small" type="success" @click="submitUpload('wap')">上传到服务器</el-button>
                <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible">
                <img width="100%" :src="dialogImageUrl" alt="">
            </el-dialog>
        </el-form-item>

        <el-form-item label="商品备注：" prop="remark">
            <el-input type="textarea" v-model="goodsDetails.remark" placeholder="请输入商品备注"></el-input>
        </el-form-item>

        <el-form-item label="商品详情：">
            <UEditor></UEditor>
        </el-form-item>

        <el-form-item>
            <el-button type="primary" @click="$router.push('special')">添加特殊属性</el-button>
            <el-button type="primary" @click="submitForm('goodsDetails')">立即创建</el-button>
            <el-button @click="resetForm('goodsDetails')">重置</el-button>
        </el-form-item>
    </el-form>
</template>

<script>
    import UEditor from "../../../components/ueditor";
    export default {
        name: 'basicAttr',
        data() {
            return {
                goodsDetails: {
                    name: '',
                    desc: '',
                    category: '',
                    brand: '',
                    price: '',
                    vipPrice: '',

                    limit: '',
                    remark: ''
                },
                dialogImageUrl: '',
                dialogVisible: false,
                fileList_pc: [],
                fileList_wap: [],
                rules: {
                    name: [
                        { required: true, message: '请输入商品名称', trigger: 'blur' },
                        { min: 5, max: 25, message: '长度在 5 到 25 个字符', trigger: 'blur' }
                    ],
                    desc: [
                        { required: true, message: '请输入商品简介', trigger: 'blur' }
                    ],
                    category: [
                        { required: true, message: '请选择商品类型', trigger: 'change' }
                    ],
                    brand: [
                        { required: true, message: '请选择商品品牌', trigger: 'change' }
                    ],
                    price: [
                        { required: true, message: '请输入商品价格', trigger: 'blur' }
                    ],
                    vipPrice: [
                        { required: true, message: '请输入商品VIP价', trigger: 'blur' }
                    ]
                },
                category: [
                    {value: '1', label: '香港直邮', children: [
                        { value: '1-1', label: '香港直邮1' },
                        { value: '1-2', label: '香港直邮2' },
                        {value: '', label: '添加子类'}
                    ]},
                    {value: '2', label: '保税区发货', children: [
                        {value: '2-1', label: '保税区发货1'},
                        {value: '2-2', label: '保税区发货2'},
                        {value: '', label: '添加子类'}
                    ]},
                    {value: '', label: '添加父类'}
                ],
                selectedCategory: [],
            };
        },
        components:{
            UEditor
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
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
            handleChange(value) {
                console.log(value);
                if (!value[0] || (value.length === 2 && !value[1])) {
                    this.addCategory();
                    this.selectedCategory = this.selectedCategory;
                    return false;
                }
                console.log(value);
            },

            beforeAvatarUpload(file) { // 限制图片格式、大小
                const isJPG = file.type === 'image/jpeg';
                const isLt2M = file.size / 1024 / 1024 < 2;

                if (!isJPG) {
                    this.$message.error('上传图片只能是 JPG 格式!');
                }
                if (!isLt2M) {
                    this.$message.error('上传图片大小不能超过 2MB!');
                }
                return isJPG && isLt2M;
            },

            handleAvatarSuccess (res, file) {
                console.log(res, file);
            },
            handleRemove(file, fileList) {
                console.log(file, fileList);
            },
            handlePictureCardPreview(file) {
                this.dialogImageUrl = file.url;
                this.dialogVisible = true;
            },

            submitUpload(screen) {
                this.$refs[`upload_${screen}`].submit();
            },
            handlePreview(file) {
                console.log(file);
            },
            handleLimit(files, fileList, limit) {
                // console.log(files, fileList, limit);
            },
            addCategory () {
                this.$prompt('请输入父级分类', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消'
                }).then(({ value }) => {
                    let category = this.category;
                    category.splice(category.length - 1, 0, {
                        value: '3',
                        label: value,
                        children: [{value: '', label: '添加子类'}]
                    });
                    this.category = category;
                    this.selectedCategory = ['3'];
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '取消输入'
                    });
                });
            },
            addBrand () {

            }
        }
    };
</script>

<style lang="scss">
    .upload-demo {
        .btn-submit-files {
            margin-left: 10px;
            display: block
        }
        .el-upload {
            margin-bottom: 22px;
        }
    }
    .upload-demo-wap {
        .el-upload-list__item {
            width: 320px;
        }
    }
</style>
<style scoped lang="scss">
    .upload-demo-pc {
        width: 470px;
    }
    .upload-demo-wap {
        width: 660px;
    }
</style>
