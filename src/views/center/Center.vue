<template>
  <div class="m-10">
    <el-table
      :data="posts"
      border
      size="medium"
      @sort-change="handleSortChange"
    >
      <el-table-column
        v-for="col in columns"
        :key="col.id"
        :prop="col.id"
        :label="col.label"
        :width="col.width"
        sortable="custom"
      >

      </el-table-column>
      <el-table-column
        label="操作"
        width="300"
      >
        <template slot-scope="scope">
          <el-button
            v-if="scope.row.is_publish"
            size="mini"
            @click="cancelPublish(scope.$index, scope.row)"
          >取消发布</el-button>
          <el-button
            v-else
            size="mini"
            @click="publish(scope.$index, scope.row)"
          >发布</el-button>
          <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)"
          >编辑</el-button>
          <el-popover
            :ref="'popover_'+scope.row.id"
            placement="top"
            width="160"
          >
            <p>这是一段内容这是一段内容确定删除吗？</p>
            <div style="text-align: right; margin: 0">
              <el-button
                size="mini"
                type="text"
                @click="closePopover(scope.row.id)"
              >取消</el-button>
              <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)"
              >删除</el-button>
            </div>
            <el-button
              slot="reference"
              type="danger"
              size="mini"
            >删除</el-button>
          </el-popover>
        </template>
      </el-table-column>
    </el-table>
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
</template>
<script>
import { fetchArticles, delArticle, updateOrCreatePost } from '@/api/article.js'
export default {
  data() {
    return {
      pageSize: 10,
      total: 0,
      currentPage: 1,
      order_by: '-last_modified',
      visible: false,
      posts: [],
      columns: [
        { id: 'title', label: '标题' },
        { id: 'author', label: '作者', width: 100 },
        { id: 'created', label: '创建时间', width: 160 },
        { id: 'last_modified', label: '最后修改', width: 160 },
        { id: 'kind', label: '类型', width: 100 },
        { id: 'tags', label: '标签', width: 200 },
        { id: 'cat', label: '分类', width: 100 },
        { id: 'views_count', label: '访问量', width: 100 },
      ],
    }
  },
  created() {
    this.loadItems()
  },
  methods: {
    handleSortChange(e) {
      console.log('TCL: handleSortChange -> e', e.prop)
      if (e.prop) {
        this.order_by = `${e.order === 'descending' ? '-' : ''}${e.prop}`
      } else {
        this.order_by = '-last_modified'
      }
      this.currentPage = 1
      this.loadItems()
    },
    async loadItems() {
      const query = {
        limit: this.pageSize,
        offset: (this.currentPage - 1) * this.pageSize,
        order_by: this.order_by,
        defer: 'body,markdown',
      }
      const {
        data: { meta, objects },
      } = await fetchArticles(query)
      this.total = meta.total_count
      this.handleResponse(objects)
    },
    handleResponse(objects) {
      const posts = objects.map(item => {
        item.created = this.$dayjs(item.created).format('YYYY/MM/DD HH:mm:ss')
        item.last_modified = this.$dayjs(item.last_modified).format(
          'YYYY/MM/DD HH:mm:ss'
        )
        item.author = item.author.nickname || item.author.username
        item.cat = item.cat ? item.cat.name : ''
        item.tags = item.tags.map(item => item.name).join(',')

        return item
      })
      this.posts = posts
    },
    handlePageChange(page) {
      this.currentPage = page
      this.loadItems()
    },
    handleEdit(index, row) {
      const { href } = this.$router.resolve({
        name: 'editPost',
        params: { type: row.post_type, id: row.id },
      })
      window.open(href, '_blank')
    },
    handleDelete(index, row) {
      delArticle(row.id).then(res => {
        console.log(res)
      })
    },
    publish(index, row) {
      const data = {
        is_publish: true,
        private: false,
      }
      updateOrCreatePost(data, row.id).then(res => {
        row.is_publish = true
        row.private = false
        this.$notify({ title: '发布成功', type: 'success', message: row.title })
      })
    },
    cancelPublish(index, row) {
      const data = {
        is_publish: false,
      }
      updateOrCreatePost(data, row.id).then(res => {
        row.is_publish = false
        this.$notify({ title: '取消成功', type: 'success', message: row.title })
      })
    },
    showPopover(id) {
      console.log(this.$refs[`popover_${id}`], 'dd')
      this.$refs[`popover_${id}`].doShow()
    },
    closePopover(id) {
      this.$refs[`popover_${id}`].doClose()
    },
  },
}
</script>
<style lang="scss" scoped>
.pagination {
  margin: 10px auto;
}
</style>
