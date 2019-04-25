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
                         v-model="goodsDetails.category"
                         @change="categoryChange"
                         placeholder="请选择商品类型"
                         filterable
                         change-on-select>
            </el-cascader>
        </el-form-item>
        <el-form-item label="商品品牌：" prop="brand">
            <el-select v-model="goodsDetails.brand"
                       filterable
                       allow-create
                       default-first-option
                       placeholder="请选择商品品牌">
                <!--<el-option label="品牌一" value="shanghai"></el-option>-->
            </el-select>
        </el-form-item>
        <el-form-item label="商品价格：" prop="price">
            <el-input v-model="goodsDetails.price" placeholder="请输入商品价格"></el-input>
        </el-form-item>
        <el-form-item label="商品VIP价：" prop="vipPrice">
            <el-input v-model="goodsDetails.vipPrice" placeholder="请输入商品VIP价"></el-input>
        </el-form-item>
        <el-form-item label="限购数量：" prop="limit">
            <el-input type="text" v-model="goodsDetails.limit" placeholder="请输入商品限购数量"></el-input>
        </el-form-item>

        <el-form-item label="商品列表图：" prop="listImages">
            <el-upload
                    action="https://jsonplaceholder.typicode.com/posts/"
                    list-type="picture-card"
                    accept="image/*"
                    :limit="1"
                    :on-exceed="pictureLimit(1)"
                    :before-upload="beforeUpload"
                    :on-success="uploadSuccess"
                    :on-preview="picturePreview"
                    :on-remove="pictureRemove">
                <i class="el-icon-plus"></i>
                <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible">
                <img width="100%" :src="dialogImageUrl" alt="">
            </el-dialog>
        </el-form-item>
        <el-form-item label="商品Banner图(PC)：" prop="bannerList_pc">
            <el-upload
                    class="upload-demo upload-demo-pc"
                    ref="upload_pc"
                    action="https://jsonplaceholder.typicode.com/posts/"
                    multiple
                    accept="image/*"
                    list-type="picture-card"
                    :file-list="fileList_pc"
                    :auto-upload="false"
                    :limit="5"
                    :on-exceed="pictureLimit(5)"
                    :before-upload="beforeUpload"
                    :on-success="uploadSuccess"
                    :on-preview="picturePreview"
                    :on-remove="pictureRemove">
                <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
                <el-button class="btn-submit-files" size="small" type="success" @click="submitUpload('pc')">上传到服务器</el-button>
                <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible">
                <img width="100%" :src="dialogImageUrl" alt="">
            </el-dialog>
        </el-form-item>
        <el-form-item label="商品Banner图(WAP)：" prop="bannerList_wap">
            <el-upload
                    class="upload-demo upload-demo-wap"
                    ref="upload_wap"
                    action="https://jsonplaceholder.typicode.com/posts/"
                    multiple
                    list-type="picture-card"
                    :file-list="fileList_wap"
                    :auto-upload="false"
                    accept="image/*"
                    :limit="5"
                    :on-exceed="pictureLimit(5)"
                    :before-upload="beforeUpload"
                    :on-success="uploadSuccess"
                    :on-preview="picturePreview"
                    :on-remove="pictureRemove">
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

        <el-form-item label="商品详情：" prop="details">
            <UEditor style="line-height: initial" @getUeditor="getUeditor" :content="goodsDetails.details"></UEditor>
        </el-form-item>

        <el-form-item>
            <el-button type="primary" @click="$router.push('addGoods/special')">添加特殊属性</el-button>
            <el-button type="primary" @click="submitForm('goodsDetails')">立即创建</el-button>
            <el-button @click="resetForm('goodsDetails')">重置</el-button>
        </el-form-item>
    </el-form>
</template>

<script>
    import UEditor from "../../../components/ueditor";
    import { isPrice, getStore } from "../../../config/utils";
    import { mapState, mapMutations } from "vuex";
    export default {
        name: 'basicAttr',
        data() {
            let regPrice = (rule, value, callback) => {
                if (!isPrice(value)) {
                    callback(new Error('价格格式错误'));
                } else {
                    callback();
                }
            };
            let rules = {
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
                    { required: true, message: '请输入商品价格', trigger: 'blur' },
                    { validator: regPrice, trigger: 'blur' }
                ],
                vipPrice: [
                    { required: true, message: '请输入商品VIP价', trigger: 'blur' },
                    { validator: regPrice, trigger: 'blur' }
                ],
                limit: [
                    { pattern: /^([1-9]\d*)$|^0$/, message: '限购数量必须为整数', trigger: 'blur' }
                ],
                listImages: [
                    { required: true, message: '请上传列表图片', trigger: 'blur' },
                ],
                bannerList_pc: [
                    { required: true, message: '请上传banner列表（PC）', trigger: 'blur' },
                ],
                bannerList_wap: [
                    { required: true, message: '请上传banner列表（WAP）', trigger: 'blur' },
                ],
                details: [
                    { required: true, message: '请填写商品详情', trigger: 'blur' },
                ]
            };
            return {
                rules,
                goodsDetails: {
                    name: '',
                    desc: '',
                    category: [],
                    brand: '',
                    price: '',
                    vipPrice: '',
                    listImages: '',
                    bannerList_pc: '',
                    bannerList_wap: '',
                    limit: '0',
                    remark: '',
                    details: ''
                },
                category: [{value: '', label: '添加父类'}],
                dialogImageUrl: '',
                dialogVisible: false,
                fileList_pc: [],
                fileList_wap: [],
                UE: null
            };
        },
        components:{
            UEditor
        },
        computed: {
            ...mapState([
                'cacheForm'
            ])
        },
        created () {
            this.goodsDetails = this.cacheForm || this.goodsDetails;
        },
        methods: {
            ...mapMutations([
               'cacheFormData'
            ]),
            submitForm(formName) {
                this.goodsDetails.details = this.UE.getContent();
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        alert('submit!');
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },

            categoryChange (value) {
                if (!value[0] || (value.length === 2 && !value[1])) {
                    this.addCategory();
                    this.goodsDetails.category = this.goodsDetails.category || [];
                    return false;
                }
            },

            beforeUpload(file) { // 限制图片格式、大小
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
            uploadSuccess (res, file) {
                console.log(res, file);
            },
            pictureRemove (file, fileList) {
                console.log(file, fileList);
            },
            picturePreview (file) {
                this.dialogImageUrl = file.url;
                this.dialogVisible = true;
            },
            pictureLimit (files, fileList, limit) {
                // console.log(files, fileList, limit);
            },

            updateCategory () {
                let [$this, parentId, title, $category] = [this, this.goodsDetails.category[0]];
                if (parentId) {
                    title = '请输入子分类';
                    for (let item of this.category) {
                        if (+item.value === +parentId) {
                            $category = item.children;
                            break;
                        }
                    }
                } else {
                    title = '请输入父级分类';
                    $category = this.category;
                }

                return {
                    title,
                    update (value, label) {
                        console.log(parentId);
                        let newCategory = { value, label };
                        !parentId && (newCategory.children = [{value: '', label: '添加子类'}]);
                        $category.splice($this.category.length - 1, 0, newCategory);
                        $this.category = $category;
                        $this.goodsDetails.category = !parentId ? [value] : [parentId, value];
                    }
                }
            },
            addCategory () {
                let updateCategory = this.updateCategory();
                this.$prompt(updateCategory.title, '增加分类', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消'
                }).then(({ value }) => {
                    updateCategory.update(3 ,value)
                }).catch(() => {
                    this.selectedCategory = [];
                });
            },

            addBrand () {

            },
            getUeditor (ue) {
                this.UE = ue;
            },

            submitUpload(screen) {
                this.$refs[`upload_${screen}`].submit();
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
        },
        beforeDestroy () {
            this.goodsDetails.details = this.UE.getContent();
            this.cacheFormData({ data: this.goodsDetails });
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
