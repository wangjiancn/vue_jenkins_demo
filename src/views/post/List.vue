<template>
  <div class="post-container">
    <div
      v-for="item in items"
      :key="item.id"
      class="post"
    >
      <div class="post-body">
        <h1 class="post-title">
          <router-link :to="`/post/${item.id}`">{{ item.title }}</router-link>
        </h1>
        <div class="post-meta">
          <span class="post-meta">作者:{{ item.author ? item.author.nickname || item.author.username : '' }}</span>
          <span class="post-meta">最后更新:{{ $dayjs(item.last_modified,{locale:'zh-cn'}).fromNow() }}</span>
          <span
            v-if="item.cat"
            class="post-meta"
          >分类: <router-link :to="`/post?cat__id=${item.cat.id}`">{{ item.cat.name }}</router-link> </span>
          <span class="post-meta">标签:
            <router-link
              v-for="tag in item.tags"
              :key="tag.uuid"
              :to="'/post?tags__id='+tag.id"
            >
              {{ tag.name }}</router-link> </span>
        </div>
        <p>{{ item.desc }}</p>
      </div>
    </div>
    <div class="pagination">
      <el-pagination
        :page-size="20"
        :pager-count="11"
        layout="prev, pager, next"
        :total="1000"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { fetchArticles } from '@/api/article'

export default {
  data() {
    return {
      items: [],
    }
  },
  watch: {
    $route() {
      this.loadItems()
    },
  },
  async created() {
    this.loadItems()
  },
  methods: {
    async loadItems() {
      console.log('TCL: loadItems -> this.$route.query', this.$route.query)
      const {
        data: { objects, meta },
      } = await fetchArticles(this.$route.query)
      console.log('TCL: loadItems -> objects, meta', objects, meta)
      this.items = objects
    },
  },
}
</script>

<style lang="scss" scoped>
.post-container {
  padding-right: 40px;
}
.post {
  white-space: nowrap;
  margin-bottom: 0.6rem;
  border: 1px solid #999999;
  border-radius: 0.2rem;
  width: 100%;
  padding: 10px;
  .post-body {
    margin: 5px;
  }
  .post-title {
    font-size: 1.8rem;
    margin: 0 auto;
    text-align: left;
  }
  .post-meta {
    font-size: 0.7rem;
    color: #888888;
    display: inline;
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
}
.pagination {
  position: absolute;
  bottom: 10px;

  // 居中方案
  // case1
  width: 100%;
  text-align: center;
  margin-bottom: -40px;

  //case2
  // width: 100%;
  // display: flex;

  // case3
  // left: 48%;
  // transform: translateX(-50%);
}
</style>
