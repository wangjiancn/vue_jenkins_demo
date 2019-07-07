<template>
  <transition name="dialog-fade">
    <div class="dialog">
      <div
        class="dialog_mask"
        @click="handleClose"
      ></div>
      <div class="dialog_container">
        <div class="dialog_header">
          {{ Mode }}
          <span
            class="el-icon-close"
            style="float:right;cursor:pointer"
            @click="handleClose"
          ></span>
        </div>
        <div class="dialog_body">
          <el-form
            ref="login"
            label-width="80px"
            :model="UserData"
          >
            <el-form-item label="用户名">
              <el-input
                v-model="UserData.username"
                placeholder="用户名"
              ></el-input>
            </el-form-item>
            <el-form-item label="密码">
              <el-input
                v-model="UserData.password"
                type="password"
                placeholder="密码"
              ></el-input>
            </el-form-item>
            <el-form-item
              v-if="!isLogin"
              label="确认密码"
            >
              <el-input
                v-model="UserData.checkPassword"
                type="password"
                placeholder="密码"
              ></el-input>
            </el-form-item>
            <el-form-item>
              <el-button
                size="small"
                type="primary"
                @click="submit"
              >{{ Mode }}</el-button>
              <el-button
                size="small"
                @click="toggleMode"
              >{{ anthor }}</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
import { login, register } from '@/api/auth'

export default {
  props: {
    // isLogin: {
    //   type: Boolean,
    //   default: true,
    // },
  },
  data() {
    return {
      isLogin: true,
      UserData: {
        username: '',
        password: '',
      },
    }
  },
  computed: {
    Mode: function() {
      return this.isLogin ? '登录' : '注册'
    },
    anthor: function() {
      return this.isLogin ? '注册新帐号' : '登录已有帐号'
    },
  },
  methods: {
    async submit() {
      delete this.UserData.checkPassword
      if (this.isLogin) {
        login(this.UserData).then(res => {
          this.$store.commit('setJWT', res.data)
        })
      } else {
        register(this.UserData).then(res => {
          this.$store.commit('setJWT', res.data)
        })
      }
      this.handleClose()
    },
    toggleMode() {
      this.isLogin = !this.isLogin
      this.$emit('toggle')
    },
    handleClose() {
      this.$emit('close')
    },
  },
}
</script>
<style lang="scss" scoped>
.dialog {
}
.dialog_mask {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 2000;
}
.dialog_container {
  background: #fff;
  width: 90%;
  max-width: 500px;
  height: auto;
  position: absolute;
  border-radius: 2px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 20001;
}
.dialog_body {
  padding: 10px;
}
.dialog_header {
  padding: 15px;
  font-size: 18px;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>