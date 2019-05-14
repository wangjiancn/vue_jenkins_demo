<template>
  <div class>
    <el-row :gutter="12">
      <el-col
        v-for="item in items"
        :key="item.id"
        class="post-card"
        :span="8"
      >
        <el-card shadow="always">
          <div>
            <h1>{{ item.title }}</h1>
            <span>作者:{{ item.author ? item.author.nickname || item.author.username : '' }}</span>
          </div>
          <div style="margin-bottom:10px;float:right">
            <el-button
              type="info"
              size="mini"
              @click="goToEditor(item.id)"
            >View</el-button>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import { fetchArticles } from '@/api/article'

dayjs.extend(utc)

export default {
  data() {
    return {
      items: [],
    }
  },
  async mounted() {
    this.loadItems()
  },
  methods: {
    async loadItems() {
      const {
        data: { objects, meta },
      } = await fetchArticles()
      console.log('TCL: loadItems -> objects, meta', objects, meta)
      this.items = objects
    },
    goToEditor(id) {
      this.$router.push(`/post/${id}`)
    },
  },
}
</script>

<style lang="scss" scoped>
.post-card {
  height: 250px;
  white-space: nowrap;
  margin-bottom: 10px;
}
.post {
  min-width: 50%;
  border: 1px solid gray;
  border-radius: 5px;
  float: left;
  .post-title {
    margin: 0 auto;
    margin-left: 30px;
    text-align: left;
  }
  .time {
    font-size: 13px;
    color: #999;
  }

  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }

  .button {
    padding: 0;
    float: right;
  }

  .image {
    width: 100%;
    display: block;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: '';
  }

  .clearfix:after {
    clear: both;
  }
}
</style>
