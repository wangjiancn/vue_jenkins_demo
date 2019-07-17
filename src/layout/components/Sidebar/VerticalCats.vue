<template>
  <div class="cat-sidebar">
    <router-link
      class="cat-item"
      to="/"
    >全部</router-link>
    <router-link
      v-for="item in items"
      :key="item.id"
      class="cat-item"
      :to="{name:'cat',params:{name:item.name}}"
    >
      {{ item.name }}
    </router-link>
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
.cat-sidebar {
  display: block;
  background-color: #f7fafc;
  width: 8rem;
  font-size: 1rem;
  .cat-item {
    display: block;
    color: #1a202c;
    padding: 0.4rem 1rem;
    text-decoration: none;
    &:hover {
      background: #38a169;
      color: white;
    }
  }
  .router-link-exact-active {
    background: #38a169;
    color: white;
  }
}
</style>
