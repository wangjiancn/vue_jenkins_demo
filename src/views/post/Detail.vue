<template>
  <div v-if="post">
    <h1>{{ post.title }}</h1>
    <p v-html="post.body"></p>
    <div>
      <el-button type="primary">
        <router-link :to="'/md/' + $route.params.id">编辑</router-link>
      </el-button>

    </div>
  </div>
</template>
<script>
import { fetchArticle } from "@/api/article.js";
export default {
  data() {
    return {
      post: null
    };
  },
  created() {
    this.loadItem();
  },
  methods: {
    async loadItem() {
      const { data } = await fetchArticle(this.$route.params.id);
      this.post = data;
    }
  }
};
</script>
<style lang="scss" scoped>
</style>
