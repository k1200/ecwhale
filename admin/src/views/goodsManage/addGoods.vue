<template>
    <div id="addGoods">
        <el-form :model="goodsDetails" :rules="rules" ref="goodsDetails" label-width="100px" class="demo-goodsDetails" style="width: 460px">
            <el-form-item label="商品名称" prop="name">
                <el-input v-model="goodsDetails.name"></el-input>
            </el-form-item>
            <el-form-item label="商品简介" prop="desc">
                <el-input type="textarea" v-model="goodsDetails.desc"></el-input>
            </el-form-item>
            <el-form-item label="商品类型">
                <el-cascader :options="options" v-model="selectedOptions"
                        @change="handleChange" placeholder="请选择商品类型">
                </el-cascader>
            </el-form-item>
            <el-form-item label="商品品牌" prop="region">
                <el-select v-model="goodsDetails.region" placeholder="请选择商品品牌">
                    <el-option label="品牌一" value="shanghai"></el-option>
                    <el-option label="品牌二" value="beijing"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="商品价格" prop="price">
                <el-input v-model="goodsDetails.price"></el-input>
            </el-form-item>
            <el-form-item label="商品VIP价" prop="vipPrice">
                <el-input v-model="goodsDetails.vipPrice"></el-input>
            </el-form-item>
            <el-form-item label="限购数量" prop="limit">
                <el-input v-model="goodsDetails.limit"></el-input>
            </el-form-item>

            <el-form-item label="商品列表图">
                <el-upload
                        action="https://jsonplaceholder.typicode.com/posts/"
                        list-type="picture-card"
                        accept="jpg,png,jpeg"
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
            <el-form-item label="商品Banner图(PC)">
                <el-upload
                        class="upload-demo upload-demo-pc"
                        ref="upload_pc"
                        action="https://jsonplaceholder.typicode.com/posts/"
                        multiple
                        :limit="5"
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
            <el-form-item label="商品Banner图(WAP)">
                <el-upload
                        class="upload-demo upload-demo-wap"
                        ref="upload_wap"
                        action="https://jsonplaceholder.typicode.com/posts/"
                        multiple
                        :limit="5"
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

            <el-form-item label="商品备注" prop="remark">
                <el-input type="textarea" v-model="goodsDetails.remark"></el-input>
            </el-form-item>


            <el-form-item label="活动时间" required>
                <el-col :span="11">
                    <el-form-item prop="date1">
                        <el-date-picker type="date" placeholder="选择日期" v-model="goodsDetails.date1" style="width: 100%;"></el-date-picker>
                    </el-form-item>
                </el-col>
                <el-col class="line" :span="2">-</el-col>
                <el-col :span="11">
                    <el-form-item prop="date2">
                        <el-time-picker placeholder="选择时间" v-model="goodsDetails.date2" style="width: 100%;"></el-time-picker>
                    </el-form-item>
                </el-col>
            </el-form-item>
            <el-form-item label="即时配送" prop="delivery">
                <el-switch v-model="goodsDetails.delivery"></el-switch>
            </el-form-item>
            <el-form-item label="活动性质" prop="type">
                <el-checkbox-group v-model="goodsDetails.type">
                    <el-checkbox label="美食/餐厅线上活动" name="type"></el-checkbox>
                    <el-checkbox label="地推活动" name="type"></el-checkbox>
                    <el-checkbox label="线下主题活动" name="type"></el-checkbox>
                    <el-checkbox label="单纯品牌曝光" name="type"></el-checkbox>
                </el-checkbox-group>
            </el-form-item>
            <el-form-item label="特殊资源" prop="resource">
                <el-radio-group v-model="goodsDetails.resource">
                    <el-radio label="线上品牌商赞助"></el-radio>
                    <el-radio label="线下场地免费"></el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('goodsDetails')">立即创建</el-button>
                <el-button @click="resetForm('goodsDetails')">重置</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    export default {
        name: 'addGoods',
        data() {
            return {
                goodsDetails: {
                    name: '',
                    region: '',
                    date1: '',
                    date2: '',
                    delivery: false,
                    type: [],
                    resource: '',
                    desc: '',
                    vipPrice: '',
                    price: '',
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
                        { required: true, message: '请填写商品简介', trigger: 'blur' }
                    ],
                    region: [
                        { required: true, message: '请选择活动区域', trigger: 'change' }
                    ],
                    date1: [
                        { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
                    ],
                    date2: [
                        { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
                    ],
                    type: [
                        { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
                    ],
                    resource: [
                        { required: true, message: '请选择活动资源', trigger: 'change' }
                    ],

                },
                options: [
                    {value: '1', label: '香港直邮', children: [
                        { value: '1-1', label: '香港直邮1' },
                        { value: '1-2', label: '香港直邮2' }
                    ]},
                    {value: '2', label: '保税区发货', children: [
                        {value: '2-1', label: '保税区发货1'},
                        {value: '2-2', label: '保税区发货2'}
                    ]}
                ],
                selectedOptions: [],
            };
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
                console.log(files, fileList, limit);
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
</style>l
