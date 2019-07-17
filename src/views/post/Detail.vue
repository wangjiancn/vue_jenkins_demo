<template>
  <div class="relative">
    <div
      v-if="post"
      class="w-full px-2 md:w-3/4"
    >

      <h1 class="post-title text-lg md:text-3xl">{{ post.title }}</h1>
      <div class="meta-warpper">

        <div class="post-meta">
          <span class="post-meta-item">
            <img
              alt="访问量"
              class="post-meta-img"
              src="@/accets/img/author.png"
            >
            {{ post.author ? post.author.nickname || post.author.username : '' }}</span>
          <span class="post-meta-item">
            <img
              alt="访问量"
              class="post-meta-img"
              src="@/accets/img/update.png"
            >
            {{ $dayjs(post.last_modified,{locale:'zh-cn'}).fromNow() }}</span>
          <span
            v-if="post.cat"
            class="post-meta-item"
          >分类: <router-link :to="{name:'cat',params:{name:post.cat.name}}">{{ post.cat.name }}</router-link> </span>
          <span class="post-meta-item">
            <router-link
              v-for="tag in post.tags"
              :key="tag.uuid"
              class="tag-item"
              :to="{name:'tag',params:{name:tag.name}}"
              @click.stop="log()"
            >
              <img
                alt="访问量"
                class="post-meta-img"
                src="@/accets/img/tag.png"
              >
              {{ tag.name }}</router-link>
          </span>
          <span class="post-meta-item">
            <img
              alt="访问量"
              class="post-meta-img"
              src="@/accets/img/eye.png"
            > {{ post.views_count }}</span>
          <span
            v-if="$store.getters.user.username === post.author.username"
            class="post-meta-item"
          >
            <router-link :to="'/md/'+ post.id">编辑本文</router-link>
          </span>
        </div>

      </div>
      <div
        v-highlight
        class="markdown-body"
        v-html="post.body"
      ></div>
    </div>
    <div v-else-if="!loading">
      <p>改文章不存在</p>
    </div>
    <a-back-top />
    <a-anchor
      wrapper-class="toc-container"
      :bounds="100"
      class="hidden md:block toc-affix"
    >
      <a-anchor-link
        v-for="(item,index) in anchors"
        :key="item + index"
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
  metaInfo() {
    const description = this.post ? this.post.desc : '加载中'
    const tags = this.post
      ? this.post.tags.map(i => i.name).join(',')
      : undefined
    return {
      title: this.post ? this.post.title : '加载中',
      meta: [
        {
          vmid: 'description',
          name: 'description',
          content: description,
        },
        {
          vmid: 'keywords',
          name: 'keywords',
          content: tags,
        },
      ],
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
  font-size: 0.7rem;
  color: #888888;
  line-height: 1.2rem;
  &-item {
    font-size: 0.7rem;
    color: #888888;
    display: inline-block;
    padding-right: 5px;
    .tag-item {
      padding-right: 3px;
    }
  }
  &-img {
    height: 0.8rem;
    width: auto;
  }
}
.post-title {
  text-align: center;
  margin: 0;
  white-space: nowrap;
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
