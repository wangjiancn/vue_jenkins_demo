<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
  metaInfo() {
    return {
      title: '主页',
      meta: [
        {
          vmid: 'description',
          name: 'description',
          content: '文章列表',
        },
        {
          vmid: 'keywords',
          name: 'keywords',
          content: 'python,python入门,python转行',
        },
      ],
      titleTemplate: '%s | smartPython.com',
    }
  },
  methods: {},
}
</script>

<style lang="scss" scoped>
</style>