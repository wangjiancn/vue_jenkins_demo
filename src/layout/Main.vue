<template>
  <div id="app">
    <div class="head-container">
      <nav-bar></nav-bar>
    </div>
    <div class="flex md:w-3/4 sm:w-full sm:mx-4 md:mx-auto my-0 mt-8">
      <div class="hidden md:block">
        <keep-alive>
          <router-view name="cat"></router-view>
        </keep-alive>
      </div>
      <div class="w-full mx-4 my-0 flex-grow-1">
        <router-view></router-view>
      </div>
      <div class="w-6/12 max-w-md hidden md:block">
        <keep-alive>
          <router-view name="tag"></router-view>
        </keep-alive>
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