<template>
  <div class="tag-panel">
    <div class="header">
      文章分类
    </div>
    <div class="body">
      <router-link
        v-for="item in items"
        :key="item.id"
        class="tag-item"
        :class="[$route.query.tags__id === item.id ? 'active' : '']"
        :to="`/post?cat__id=${item.id}`"
      >
        {{ item.name }}
      </router-link>
    </div>
  </div>
</template>

<script>
import { fetchCategorys } from '@/api/article'

export default {
  data() {
    return {
      items: [],
    }
  },
  async created() {
    this.loadItems()
  },
  methods: {
    async loadItems() {
      const {
        data: { objects, meta },
      } = await fetchCategorys()
      this.items = objects
    },
  },
}
</script>

<style lang="scss" scoped>
.tag-panel {
  white-space: nowrap;
  margin-bottom: 0.6rem;
  border: 1px solid #999999;
  border-radius: 0.2rem;
  width: 100%;
  .header {
    padding: 0.5rem 0.8rem;
    font-weight: bold;
    background-color: #909399;
  }
  .body {
    padding: 5px;
    text-align: left;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    .tag-item {
      margin-right: 0.5rem;
      margin-bottom: 0.3rem;
      text-align: center;
      font-size: 0.6rem;
      line-height: 1rem;
      padding: 0.2rem 0.6rem;
      border-radius: 0.8rem;
      border: 1px solid #999;
    }
    .link {
      display: inline;
    }
  }
  p {
    margin: 0;
    font-size: 1rem;
  }
  a,
  a:hover,
  a:active {
    text-decoration: none;
    color: inherit;
  }
  .router-link-exact-active {
    background-color: #909399;
  }
}
</style>
