<template>
   <div class="login">
       <el-form :model="user" class="demo-form-inline">
           <el-form-item>
               壹壹壹仟贰
           </el-form-item>
           <template v-if="type === 1">
               <transition>
                   <el-form-item>
                       <el-input v-model="userPass.name" placeholder="请输入常用手机号或邮箱"></el-input>
                   </el-form-item>
                   <el-form-item>
                       <el-input v-model="userPass.password" placeholder="请输入密码"></el-input>
                   </el-form-item>
               </transition>
           </template>

           <template v-else>
               <transition>
                   <el-form-item>
                       <el-input v-model="userTel.tel" placeholder="请输入手机号"></el-input>
                   </el-form-item>
                   <el-form-item>
                       <el-input v-model="userTel.code" placeholder="请输入验证码"></el-input>
                   </el-form-item>
               </transition>
           </template>

           <el-form-item>
                <span @click="type = 3 - type"> {{ typeTip }} </span>
                <router-link to="forgetPass" v-show="type === 1"> 忘记密码 </router-link>
           </el-form-item>

           <el-form-item>
               <el-button type="primary" @click="submit"> 登录 </el-button>
           </el-form-item>
           <el-form-item>
               <router-link to="register"> 立即注册 </router-link>
           </el-form-item>
       </el-form>
   </div>
</template>

<script>
    export default {
        name: "login",
        data () {
            return {
                type: 1,
                userPass: {
                    name: '',
                    password: ''
                },
                userTel: {
                    tel: '',
                    code: ''
                }
            }
        },
        computed: {
            typeTip () {
                return type === 1 ? '验证码登录' : '密码登录';
            }
        }
    }
</script>

<style scoped>

</style>