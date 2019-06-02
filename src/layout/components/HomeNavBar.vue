<template>
  <div class="nav">
    <div class="w-3/5 float-left nav-left">
      <ul>
        <li>
          <router-link
            :class="['/','/post'].includes($route.path) ? 'active':''"
            to="/"
          >首页</router-link>
        </li>
      </ul>
    </div>
    <div class="w-2/5 float-left nav-right">
      <ul>
        <li class="search-bar">
          <el-input
            v-model="searchValue"
            size="small"
            placeholder="请输入关键字"
            prefix-icon="el-icon-search"
          ></el-input>
        </li>
        <li
          v-if="user"
          class="user"
        >
          <el-dropdown
            class="user-dropdown"
            trigger="click"
          >
            <img
              class="avatar"
              src="@/accets/img/user.png"
              alt=""
            >
            <el-dropdown-menu
              slot="dropdown"
              class="user-dropdown"
            >
              <el-dropdown-item>
                <router-link
                  class="a-item"
                  :to="'/i/'+ user.username"
                >{{ user.nickname || user.username }}</router-link>
              </el-dropdown-item>
              <!-- <el-dropdown-item> <router-link
                  class="a-item"
                  to="/md"
                >Markdown</router-link>
              </el-dropdown-item>
              <el-dropdown-item>
                <router-link
                  class="a-item"
                  to="/ck"
                >CKEditor</router-link>
              </el-dropdown-item>
              <el-dropdown-item @click="Logout">
                <router-link>注销</router-link>
              </el-dropdown-item> -->
            </el-dropdown-menu>
          </el-dropdown>
        </li>
        <li v-else>
          <el-button
            size="small"
            @click="loginDialog=true"
          >登录/注册</el-button>
          <Login
            v-if="loginDialog"
            @close="loginDialog=false"
          ></Login>
        </li>
      </ul>

    </div>
  </div>
</template>

<script>
import { logout } from '@/api/auth'
import Login from '@/pages/access/Login.vue'
export default {
  components: { Login },
  data() {
    return {
      searchValue: '',
      loginDialog: false,
    }
  },
  computed: {
    user: function() {
      return this.$store.getters.user
    },
  },
  created() {},
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
.nav {
  height: 54px;
  display: block;
  margin: 0 auto;
  .nav-right {
    display: inline-flex;
    flex-direction: column-reverse;
    ul,
    li {
      display: inline-flex;
      justify-content: flex-end;
      align-items: center;
      margin-right: 10px;
    }
    .search-bar {
      display: inline-flex;
    }
    .user {
      display: inline-flex;
      .avatar {
        height: 30px;
        width: 30px;
      }
    }
  }
  div {
    background-color: #f3f3f3;
    ul {
      display: inline-block;
      line-height: 54px;
      vertical-align: middle;
      margin: 0;
      padding: 0;
      overflow: hidden;
      li {
        a {
          display: inline-block;
          font-weight: bold;
          color: #666;
          text-align: center;
          padding: 0 2rem;
          text-decoration: none;
          &:hover:not(.active) {
            background-color: #ddd;
          }
          &.active {
            color: white;
            background-color: #4caf50;
          }
        }
      }
    }
  }
  .modal {
    position: absolute;
    width: 320px;
    overflow: hidden;
    top: 100%;
    z-index: 1000;
    text-align: left;
    background-color: #fff;
    border-radius: 4px;
  }
  .user-dropdown {
    display: inline-flex;
    li {
      a,
      a:link {
        text-decoration: none;
        color: black;
      }
    }
  }
}
</style>
