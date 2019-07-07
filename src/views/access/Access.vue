<template>

  <div class="login-form">
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
  mounted() {
    const authError = this.$store.getters.errors('auth')
    if (authError) {
      this.$message({
        showClose: true,
        message: authError,
        type: 'error',
        duration: 5000,
      })
    }
    this.$store.commit('removeError', { type: 'auth' })
  },
  methods: {
    async submit() {
      delete this.UserData.checkPassword
      if (this.isLogin) {
        login(this.UserData).then(res => {
          this.$store.commit('setJWT', res.data)
          this.$router.push(this.$route.query.next || '')
        })
      } else {
        register(this.UserData).then(res => {
          this.$store.commit('setJWT', res.data)
          this.$router.push(this.$route.query.next || '')
        })
      }
    },
    toggleMode() {
      this.isLogin = !this.isLogin
      this.$emit('toggle')
    },
  },
}
</script>
<style lang="scss" scoped>
.login-form {
  width: 600px;
  margin: 60px auto;
}
</style>