<template>
  <div class="login-container">
    <el-row>
      <el-col :span="12">
        <div class="grid-content left-img">
          <img src="../../assets/images/login-img.png">
        </div>
      </el-col>
      <el-col :span="12">
        <div class="grid-content right-content">
          <el-form ref="loginForm"
                   :model="loginForm"
                   :rules="loginRules"
                   class="login-form"
                   auto-complete="on"
                   label-position="left">

            <div class="title-container">
              <h3 class="title">
                <!-- <img style="width:50%" src="@/assets/images/logo-login.png" > -->
                <!-- <img style="width:50%"
                     src="@/assets/images/Wechatlogo.png"> -->
                物业管理平台
              </h3>
            </div>

            <el-form-item prop="username">
              <span class="svg-container svg-container_login">
                <svg-icon icon-class="user" />
              </span>
              <el-input v-model="loginForm.username"
                        :placeholder="$t('login.username')"
                        name="username"
                        type="text"
                        auto-complete="on" />
            </el-form-item>

            <el-form-item prop="password">
              <span class="svg-container">
                <svg-icon icon-class="password" />
              </span>
              <el-input :type="passwordType"
                        v-model="loginForm.password"
                        :placeholder="$t('login.password')"
                        name="password"
                        auto-complete="on"
                        @keyup.enter.native="handleLogin" />
              <span class="show-pwd"
                    @click="showPwd">
                <svg-icon icon-class="eye" />
              </span>
            </el-form-item>

            <el-button :loading="loading"
                       type="primary"
                       style="width:100%;margin-bottom:30px;"
                       @click.native.prevent="handleLogin">{{ $t('login.logIn') }}</el-button>
          </el-form>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
// import { isvalidUsername } from '@/utils/validate'
import LangSelect from '@/components/LangSelect'
import SocialSign from './socialsignin'

export default {
  name: 'Login',
  components: { LangSelect, SocialSign },
  data() {
    // const validateUsername = (rule, value, callback) => {
    //   if (!isvalidUsername(value)) {
    //     callback(new Error('Please enter the correct user name'))
    //   } else {
    //     callback()
    //   }
    // }
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('The password can not be less than 6 digits'))
      } else {
        callback()
      }
    }
    return {
      loginForm: {
        // username: 'root',
        // password: 'starnet@234'
        username: '',
        password: ''
      },
      loginRules: {
        username: [{ required: true, trigger: 'blur' }],
        password: [{ required: true, trigger: 'blur', validator: validatePassword }]
      },
      passwordType: 'password',
      loading: false,
      showDialog: false
    }
  },
  created() {
  },
  destroyed() {
  },
  methods: {
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store.dispatch('LoginByUsername', this.loginForm).then((res) => {
            // this.$store.dispatch('GetUserCommunity')
            console.log(res)
            if (res.data.code === 200) {
              // this.loading = false
              this.$router.push({ path: '/home' })
            }
          }).catch(() => {
            this.loading = false
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
$bg: #283443;
$light_gray: #eee;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
    &::first-line {
      color: $light_gray;
    }
  }
}

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;
    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;
      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }
  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}
</style>

<style rel="stylesheet/scss" lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;

.login-container {
  position: fixed;
  height: 100%;
  width: 100%;
  .left-img {
    text-align: right;
    margin-top: 120px;
  }
  .right-content {
    text-align: left;
  }
  background-color: $bg;
  .login-form {
    width: 400px;
    padding: 35px 35px 15px 35px;
    margin: 120px;
  }
  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;
    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }
  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
    &_login {
      font-size: 20px;
    }
  }
  .title-container {
    position: relative;
    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
      .svg-icon {
        width: 1.5em;
        height: 1.5em;
        position: relative;
        top: 8px;
        fill: #f4516c;
      }
    }
    .set-language {
      color: #fff;
      position: absolute;
      top: 5px;
      right: 0px;
    }
  }
  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
  .thirdparty-button {
    position: relative;
    right: 0;
    bottom: 0;
  }
}
</style>
