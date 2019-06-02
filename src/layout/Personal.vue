<template>
  <div id="app">
    <div class="md:w-3/4 sm:w-full sm:mx-4 md:mx-auto my-0 ">
      <nav-bar></nav-bar>
      <div>
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from '@/layout/components/HomeNavBar.vue'
import { logout } from '@/api/auth'

export default {
  components: { NavBar },
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