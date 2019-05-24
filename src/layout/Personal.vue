<template>
  <div id="app">
    <div class="header">
      <div class="head-container">
        <el-menu
          class="el-menu-demo"
          mode="horizontal"
          router
        >
          <el-menu-item index="/"> List </el-menu-item>
          <el-menu-item style="float:right">
            <el-submenu
              v-if="user"
              index="/i"
            >
              <template slot="title">
                <img
                  class="avatar"
                  src="@/accets/头像.png"
                  alt=""
                >
              </template>
              <el-menu-item :index="'/i/'+ user.username">{{ user.nickname || user.username }}</el-menu-item>
              <el-menu-item index="/md">Markdown</el-menu-item>
              <el-menu-item index="/ck">CKEditor</el-menu-item>
              <el-menu-item @click="Logout">注销</el-menu-item>
            </el-submenu>
            <el-button
              v-else
              size="small"
              type="primary"
              @click="isLogin=LoginDialog=true"
            > 登录 </el-button>
          </el-menu-item>
          <el-menu-item style="float:right">
            <el-input
              v-model="searchValue"
              placeholder="请输入关键字"
              prefix-icon="el-icon-search"
            > </el-input>
          </el-menu-item>
        </el-menu>
        <div class="line"></div>
      </div>
      <login
        v-if="LoginDialog"
        :is-login="isLogin"
        @close="LoginDialog=false"
        @toggle="isLogin=!isLogin"
      ></login>
    </div>
    <div class="container-wrap">

      <div class="container">
        <router-view></router-view>
      </div>
    </div>

  </div>
</template>

<script>
import Login from '@/views/access/Login.vue'
import { logout } from '@/api/auth'

export default {
  components: { Login },
  data() {
    return {
      isLogin: true,
      searchValue: '',
      LoginDialog: false,
      UserData: {
        username: '',
        password: '',
        mobile: '',
      },
    }
  },
  computed: {
    user: function() {
      return this.$store.getters.user
    },
  },
  methods: {
    async Logout() {
      const res = await logout({})
      this.$store.commit('setJWT', '')
      location.reload()
      console.log('TCL: Logout -> res', res)
    },
  },
}
</script>

<style lang="scss" scoped>
#app {
  .header {
    min-width: 800px;
    .head-container {
      height: 80px;
      margin: 0 auto;
      top: 0;
      left: 0;
      width: 80%;
      line-height: 60px;
      z-index: 100;
      position: relative;
      .avatar {
        height: 25px;
      }
    }

    .el-dropdown-link {
      cursor: pointer;
      color: #409eff;
    }
    .el-icon-arrow-down {
      font-size: 12px;
    }
    .navbar-nav-svg {
      display: inline-block;
      width: 1rem;
      height: 1rem;
      vertical-align: text-top;
    }
  }
  .container-wrap {
    overflow: hidden;
  }
  .container {
    margin: 0 auto;
    top: 0;
    left: 0;
    width: 80%;
    .post-list {
      margin: 0 auto;
      width: 60%;
      float: left;
      position: relative;
    }
    .side-nav {
      // width: 300px;
      width: 40%;
      float: right;
    }
  }
  .container:after {
    clear: both;
  }
}
</style>