<template>
  <div>
    <div class="my-4 mr-auto">
      <el-button
        type="primary"
        @click="popupVisable=true"
      >添加</el-button>
    </div>

    <el-table
      :data="posts"
      border
      size="medium"
    >
      <el-table-column
        v-for="col in columns"
        :key="col.id"
        :prop="col.id"
        :label="col.label"
        :width="col.width"
      >

      </el-table-column>
      <el-table-column
        label="操作"
        width="150"
      >
        <template slot-scope="scope">
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

    <Dialog
      title="添加"
      :visible.sync="popupVisable"
      width="400px"
      @close="handleDialogClose"
    >
      <el-form
        ref="form"
        :model="form"
        label-width="50px"
        @submit.native.prevent="onSubmit"
      >
        <el-form-item label="名称:">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer">
        <el-button @click="popupVisable = false">取 消</el-button>
        <el-button
          type="primary"
          @click="onSubmit"
        >确 定</el-button>
      </span>
    </Dialog>

  </div>
</template>
<script>
import { Dialog } from 'element-ui'
import { fetchCategorys } from '@/api/article.js'
import { createRow, removeRow, updateRow } from '@/api/cqi'
export default {
  components: { Dialog },
  data() {
    return {
      modelName: 'category',
      popupVisable: false,
      form: {},
      pageSize: 10,
      total: 0,
      currentPage: 1,
      visible: false,
      posts: [],
      columns: [
        { id: 'name', label: '名称' },
        { id: 'created', label: '创建时间', width: 300 },
      ],
    }
  },
  created() {
    this.loadItems()
  },
  methods: {
    async loadItems() {
      const query = {
        limit: this.pageSize,
        offset: (this.currentPage - 1) * this.pageSize,
      }
      const {
        data: { meta, objects },
      } = await fetchCategorys(query)
      this.total = meta.total_count
      this.handleResponse(objects)
    },
    handleResponse(objects) {
      const posts = objects.map(item => {
        item.created = this.$dayjs(item.created).format('YYYY/MM/DD HH:mm:ss')
        return item
      })
      this.posts = posts
    },
    async onSubmit() {
      if (this.form.id) {
        updateRow(this.modelName, this.form.id, this.form).then(res => {
          if (!res.code) {
            this.loadItems()
            this.popupVisable = false
          }
        })
      } else {
        createRow(this.modelName, this.form).then(res => {
          if (!res.code) {
            this.loadItems()
            this.popupVisable = false
          }
        })
      }
    },
    handlePageChange(page) {
      this.currentPage = page
      this.loadItems()
    },
    handleEdit(index, row) {
      this.form = {
        name: row.name,
        id: row.id,
      }
      this.popupVisable = true
    },
    async handleDelete(index, row) {
      const res = await removeRow(this.modelName, row.id)
      console.log('TCL: handleDelete -> res', res)
      this.loadItems()
      this.popupVisable = false
    },
    showPopover(id) {
      console.log(this.$refs[`popover_${id}`], 'dd')
      this.$refs[`popover_${id}`].doShow()
    },
    closePopover(id) {
      this.$refs[`popover_${id}`].doClose()
    },
    handleDialogClose() {
      this.form = {}
    },
  },
}
</script>
<style lang="scss" scoped>
.pagination {
  margin: 10px auto;
}
</style>
