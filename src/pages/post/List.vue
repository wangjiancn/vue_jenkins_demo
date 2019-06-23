<template>
  <div class="post-container">
    <div v-if="items.length">
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
            <span class="post-meta-item">作者:{{ item.author ? item.author.nickname || item.author.username : '' }}</span>
            <span class="post-meta-item">最后更新:{{ $dayjs(item.last_modified,{locale:'zh-cn'}).fromNow() }}</span>
            <span
              v-if="item.cat"
              class="post-meta-item"
            >分类: <router-link :to="`/post?cat__id=${item.cat.id}`">{{ item.cat.name }}</router-link> </span>
            <span class="post-meta-item">标签:
              <router-link
                v-for="tag in item.tags"
                :key="tag.uuid"
                :to="'/post?tags__id='+tag.id"
              >
                {{ tag.name }}</router-link> </span>
            <span class="post-meta-item">访问量:{{ item.views_count }}</span>
          </div>
          <div class="post-desc">{{ item.desc }}</div>
        </div>
      </div>
      <div class="pagination">
        <el-pagination
          background
          :current-page="currentPage"
          :page-size="pageSize"
          layout="prev, pager, next"
          :total="total"
          @prev-click="handlePageChange"
          @current-change="handlePageChange"
        >
        </el-pagination>
      </div>
    </div>
    <div v-else>
      <p class="text-center">没有相关文章</p>
    </div>
  </div>
</template>

<script>
import { fetchArticles } from '@/api/article'

export default {
  data() {
    return {
      items: [],
      total: 0,
      pageSize: 10,
      currentPage: 1,
    }
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
    }
  },
  computed: {
    pageCount: function() {
      return Math.ceil(this.total / this.pageSize)
    },
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
      const query = {
        ...this.$route.query,
        limit: this.pageSize,
        offset: (this.currentPage - 1) * this.pageSize,
        defer: 'markdown,body',
        order_by: '-created',
        private: 0,
        is_publish: 1,
      }
      const {
        data: { objects, meta },
      } = await fetchArticles(query)
      this.items = objects
      this.total = meta.total_count
    },
    handlePageChange(page) {
      this.currentPage = page
      this.loadItems()
    },
  },
}
</script>

<style lang="scss" scoped>
.post-container {
  padding-right: 40px;
}
.post {
  margin-bottom: 0.6rem;
  border-bottom: 1px solid #999999;
  width: 100%;
  padding: 10px;
  .post-body {
    margin: 5px;
  }
  .post-title {
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 1.1rem;
    margin: 0 auto;
    text-align: left;
  }
  .post-meta {
    font-size: 0.7rem;
    color: #888888;
    line-height: 1.2rem;
    &-item {
      font-size: 0.7rem;
      color: #888888;
      display: inline-block;
    }
  }
  .post-desc {
    display: inline-block;
    margin: 0;
    font-size: 0.9rem;
    white-space: wrap;
  }
  a,
  a:hover,
  a:active {
    text-decoration: none;
    color: inherit;
  }
}
.pagination {
  // position: absolute;
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
