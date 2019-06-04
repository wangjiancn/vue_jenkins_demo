<template>
  <div>
    <div
      v-if="post"
      class="mx-4 md:mx-auto"
    >
      <h1 class="post-title">{{ post.title }}</h1>
      <div class="meta-warpper">
        <span class="post-meta">作者:{{ post.author ? post.author.nickname || post.author.username : '' }}</span>
        <span class="post-meta">最后更新:{{ $dayjs(post.last_modified,{locale:'zh-cn'}).fromNow() }}</span>
        <span
          v-if="post.cat"
          class="post-meta"
        >分类:{{ post.cat.name }}</span>
        <span class="post-meta">标签:
          <router-link
            v-for="tag in post.tags"
            :key="tag.uuid"
            :to="'/post?tags__id='+tag.id"
          >
            {{ tag.name }}</router-link> </span>
        <span
          v-if="$store.getters.user.username === post.author.username"
          class="post-meta"
        >
          <router-link :to="'/md/'+ post.id">编辑本文</router-link>
        </span>
      </div>
      <div
        class="markdown-body"
        v-html="post.body"
        v-highlight
      ></div>
    </div>
    <div v-else-if="!loading">
      <p>改文章不存在</p>
    </div>
  </div>
</template>
<script>
// import '@/styles/markdown.scss'
import { fetchArticle } from '@/api/article.js'
import { nextTick } from 'q'
export default {
  data() {
    return {
      post: null,
      loading: false,
    }
  },
  beforeRouteUpdate(to, from, next) {
    next()
    this.loadItem()
  },
  created() {
    this.loadItem()
  },
  methods: {
    async loadItem() {
      this.loading = true
      const { data } = await fetchArticle(this.$route.params.id)
      this.post = data
      this.loading = false
    },
  },
}
</script>
<style lang="scss" scoped>
@import '~@/styles/markdown.css';
.meta-warpper {
  display: block;
  border-top: 1px solid #888888;
  border-bottom: 1px solid #888888;
  margin-bottom: 1rem;
  a,
  a:hover {
    color: inherit;
    text-decoration: none;
  }
}
.post-meta {
  font-size: 12px;
  color: #888888;
  display: inline;
}
.post-title {
  text-align: center;
  margin: 0;
}
</style>
