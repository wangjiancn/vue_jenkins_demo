<template>
  <div id="app">
    <div class="md:w-3/4 sm:w-full sm:mx-4 md:mx-auto my-0 ">
      <div class="head-container">
        <nav-bar></nav-bar>
      </div>
      <div class="mt-8 ">
        <div class="post-list mx-auto my-0 float-left md:w-3/5 sm:w-full">
          <router-view></router-view>
        </div>
        <div class="side-nav w-2/6 float-right sm:hidden md:block">
          <keep-alive>
            <router-view name="tag"></router-view>
          </keep-alive>
          <keep-alive>
            <router-view name="cat"></router-view>
          </keep-alive>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import NavBar from '@/layout/components/HomeNavBar.vue'

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
  .head-container {
    margin: 0 auto;
  }
}
</style>