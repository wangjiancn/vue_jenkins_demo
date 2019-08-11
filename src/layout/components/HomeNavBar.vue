<template>
  <div class="nav">
    <div class="w-full md:w-3/4  inline-flex">
      <div class="w-1/3 md:w-3/5  nav-left">
        <ul>
          <li>
            <router-link
              :class="['/','/post'].includes($route.path) ? 'active':''"
              to="/"
            >首页</router-link>
          </li>
          <li class="hidden md:block">
            <router-link
              :class="/^\/wiki/.test($route.path) ? 'active':''"
              to="/wiki"
            >Wiki</router-link>
          </li>
        </ul>
      </div>
      <div class="w-2/3 md:w-2/5 nav-right">
        <ul>
          <li class="search-bar">
            <el-input
              v-model="searchValue"
              size="small"
              placeholder="请输入关键字"
              prefix-icon="el-icon-search"
              @keyup.enter.native="handleSearch"
            ></el-input>
          </li>
          <li
            v-if="user"
            class="user"
          >
            <img
              class="avatar"
              src="@/accets/img/user.png"
            >
            <div class="drop">
              <router-link :to="'/i/'+ user.username">{{ user.nickname || user.username }}</router-link>
              <router-link :to="{name:'createPost',params:{type:'article'}}">写文章</router-link>
              <router-link :to="{name:'createPost',params:{type:'wiki'}}">写wiki</router-link>
              <a @click="Logout">注销</a>
            </div>
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
  </div>
</template>

<script>
import Login from '@/views/access/Login.vue'
import { constants } from 'crypto'
export default {
  components: { Login },
  data() {
    return {
      searchValue: '',
      loginDialog: false,
      panelShow: false,
    }
  },
  computed: {
    user: function() {
      return this.$store.getters.user
    },
  },
  created() {},
  mounted() {},
  methods: {
    async Logout() {
      this.$store.commit('resetJWT')
    },
    handleSearch() {
      console.log('search')
      if (!this.searchValue) return
      this.$router.push({ path: '/', query: { search: this.searchValue } })
    },
    Print(e) {
      console.log(e)
    },
  },
}
</script>
<style lang="scss" scoped>
.nav {
  height: 54px;
  display: block;
  margin: 0 auto;
  background-color: #f3f3f3;
  text-align: center;
  .nav-left {
    display: inline-flex;
    justify-content: flex-start;
  }
  .nav-right {
    display: inline-flex;
    justify-content: flex-end;
  }
  div {
    ul {
      list-style: none;
      display: inline-flex;
      line-height: 54px;
      align-items: center;
      margin: 0;
      padding: 0;
      li {
        a {
          display: inline-flex;
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

      .search-bar {
        display: inline-flex;
        margin-right: 1rem;
      }
      .user {
        position: relative;
        display: inline-flex;
        .avatar {
          height: 30px;
          width: 30px;
        }
        &:hover .drop {
          display: inline-block;
          background: #f3f3f3;
        }
      }
    }
  }
  .drop {
    padding-top: 0.5rem;
    line-height: 40px;
    display: none;
    position: absolute;
    top: 100%;
    left: -3rem;
    z-index: 3000;
    a,
    div {
      width: 8rem;
      text-align: center;
      &:hover {
        background-color: gray;
      }
    }
  }
}
</style>

