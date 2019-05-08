<template>
   <div class="goodsList">
       <div class="filter">
           <el-form :inline="true" :model="formFilter" class="demo-form-inline">
               <el-form-item label="商品名称">
                   <el-input v-model="formFilter.goodsName" placeholder="商品名"></el-input>
               </el-form-item>
               <el-form-item label="商品状态">
                   <el-select v-model="formFilter.region" placeholder="商品状态">
                       <el-option label="正常" value="1"></el-option>
                       <el-option label="未上线" value="-1"></el-option>
                       <el-option label="已下线" value="2"></el-option>
                   </el-select>
               </el-form-item>
               <el-form-item>
                   <el-button type="primary" @click="getFilter">查询</el-button>
               </el-form-item>
           </el-form>
       </div>

       <div class="dataTable" style="width: 800px">
           <el-table
                   :data="tableData"
                   border
                   max-height="300"
                   style="width: 100%">
               <el-table-column
                       fixed
                       sortable
                       prop="date"
                       label="日期"
                       width="150">
               </el-table-column>
               <el-table-column
                       prop="name"
                       label="姓名"
                       width="120">
               </el-table-column>
               <el-table-column
                       prop="province"
                       label="省份"
                       width="120">
               </el-table-column>
               <el-table-column
                       prop="city"
                       label="市区"
                       width="120">
               </el-table-column>
               <el-table-column
                       prop="address"
                       label="地址"
                       width="300">
               </el-table-column>
               <el-table-column
                       prop="zip"
                       label="邮编"
                       width="120">
               </el-table-column>
               <el-table-column
                       fixed="right"
                       label="操作"
                       width="100">
                   <template slot-scope="scope">
                       <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
                       <el-button type="text" size="small">编辑</el-button>
                   </template>
               </el-table-column>
           </el-table>
           <el-table
                   :data="tableData"
                   border
                   max-height="300"
                   style="width: 100%">
               <el-table-column
                       fixed
                       sortable
                       prop="date"
                       label="日期"
                       width="150">
               </el-table-column>
               <el-table-column
                       prop="name"
                       label="姓名"
                       width="120">
               </el-table-column>

               <el-table-column label="地址">
                   <el-table-column
                           prop="province"
                           label="省份"
                           width="120">
                   </el-table-column>
                   <el-table-column
                           prop="city"
                           label="市区"
                           width="120">
                   </el-table-column>
                   <el-table-column
                           prop="address"
                           label="地址"
                           width="300">
                   </el-table-column>
               </el-table-column>

               <el-table-column
                       prop="zip"
                       label="邮编"
                       width="120">
               </el-table-column>
               <el-table-column
                       fixed="right"
                       label="操作"
                       width="100">
                   <template slot-scope="scope">
                       <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
                       <el-button type="text" size="small">编辑</el-button>
                   </template>
               </el-table-column>
           </el-table>
       </div>
   </div>
</template>

<script>
    export default {
        name: "goodsList",
        data () {

            return {
                formFilter: {
                    goodsName: '',
                },
                tableData: [{
                    date: '2016-05-03',
                    name: '王小虎',
                    province: '上海',
                    city: '普陀区',
                    address: '上海市普陀区金沙江路 1518 弄',
                    zip: 200333
                }, {
                    date: '2016-05-02',
                    name: '王小虎',
                    province: '上海',
                    city: '普陀区',
                    address: '上海市普陀区金沙江路 1518 弄',
                    zip: 200333
                }, {
                    date: '2016-05-04',
                    name: '王小虎',
                    province: '上海',
                    city: '普陀区',
                    address: '上海市普陀区金沙江路 1518 弄',
                    zip: 200333
                }, {
                    date: '2016-05-01',
                    name: '王小虎',
                    province: '上海',
                    city: '普陀区',
                    address: '上海市普陀区金沙江路 1518 弄',
                    zip: 200333
                }, {
                    date: '2016-05-08',
                    name: '王小虎',
                    province: '上海',
                    city: '普陀区',
                    address: '上海市普陀区金沙江路 1518 弄',
                    zip: 200333
                }, {
                    date: '2016-05-06',
                    name: '王小虎',
                    province: '上海',
                    city: '普陀区',
                    address: '上海市普陀区金沙江路 1518 弄',
                    zip: 200333
                }, {
                    date: '2016-05-07',
                    name: '王小虎',
                    province: '上海',
                    city: '普陀区',
                    address: '上海市普陀区金沙江路 1518 弄',
                    zip: 200333
                }]
            }
        },
        methods: {
            getFilter () {

            }
        }
    }
</script>

<style scoped>

</style>