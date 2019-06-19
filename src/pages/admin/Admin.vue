<template>
  <div class="w-4/5 mx-auto">

    <tabs
      v-model="activeTab"
      @tab-click="handleTabClick"
    >
      <tab-pane
        label="分类"
        name="first"
      >
        <Category />
      </tab-pane>
      <tab-pane
        label="标签"
        name="second"
      >
        <Tag />
      </tab-pane>
      <tab-pane
        label="文章管理"
        name="third"
      >
        <Post />
      </tab-pane>
    </tabs>
  </div>
</template>

<script>
import { Tabs, TabPane } from 'element-ui'
import Category from '@/pages/admin/tabs/Category.vue'
import Post from '@/pages/admin/tabs/Post.vue'
import Tag from '@/pages/admin/tabs/Tag.vue'

export default {
  components: { Tabs, TabPane, Category, Post, Tag },
  data() {
    return {
      activeTab: 'first',
    }
  },
  methods: {
    handleTabClick(tab, event) {
      console.log('TCL: handleTabClick -> tab,event', tab, event)
    },
  },
}
</script>
<style lang="scss" scoped>
</style>
