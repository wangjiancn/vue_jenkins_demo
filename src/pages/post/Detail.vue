<template>
  <div class="relative">
    <div
      v-if="post"
      class="mx-4 w-3/4"
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
    <a-back-top />
    <a-anchor
      wrapper-class="toc-container"
      :bounds="100"
      class="toc-affix"
    >
      <a-anchor-link
        v-for="item in anchors"
        :key="item.href"
        :href="item.href"
        :title="item.title"
      >
        <a-anchor-link
          v-for="son in item.children"
          :key="son.href"
          :href="son.href"
          :title="son.title"
        />
      </a-anchor-link>
    </a-anchor>
  </div>
</template>
<script>
import { fetchArticle } from '@/api/article.js'
import { nextTick } from 'q'
import { constants } from 'crypto'
export default {
  data() {
    return {
      post: null,
      loading: false,
      anchors: [],
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
    parseAnchor(post) {
      const text = post.body
      let parser = new DOMParser()
      const postDOM = parser.parseFromString(text, 'text/html')
      const o = postDOM.getElementsByTagName('body')
      const postCol = o[0].children
      let anchors = []
      for (const col of postCol) {
        if (col.localName === 'h2') {
          const anchor = {
            title: col.innerText,
            href: '#' + col.children[0].id,
          }
          anchors.push(anchor)
        } else if (col.localName === 'h3' && anchors.length) {
          const anchor = {
            title: col.innerText,
            href: '#' + col.children[0].id,
          }
          const lastIndex = anchors.length - 1
          if (Array.isArray(anchors[lastIndex].children)) {
            anchors[lastIndex].children.push(anchor)
          } else {
            anchors[lastIndex].children = [anchor]
          }
        }
      }
      this.anchors = anchors
    },
    async loadItem() {
      this.loading = true
      const { data } = await fetchArticle(this.$route.params.id)
      this.post = data
      this.loading = false
      this.parseAnchor(data)
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
.toc-container {
  right: 0;
  top: 150px;
  position: fixed;
  top: 100px;
  right: 10px;
  bottom: 250px;
}
.toc-affix {
  width: 20%;
  position: absolute;
  right: 0;
  top: 150px;
  // position: fixed;
  // top: 100px;
  // right: 10px;
  bottom: 250px;
}
</style>
