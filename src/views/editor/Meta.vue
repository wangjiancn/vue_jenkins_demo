<template>
  <div class="tag_container">
    <div style="display:inline">
      <span> 标签: </span>
      <el-select
        :value="dynamicTags"
        style="width:500px"
        size="small"
        filterable
        allow-create
        multiple
        default-first-option
        :multiple-limit="5"
        placeholder="请选择"
        :filter-method="queryMethod"
        @change="handleChange"
      >
        <el-option
          v-for="item in options"
          :key="item.uuid"
          :label="item.name"
          :value="item.uuid"
        >
        </el-option>
      </el-select>
    </div>
  </div>
</template>

<script>
import { fetchTags } from '@/api/article.js'

export default {
  props: {
    dynamicTags: {
      type: Array,
      default: () => {
        ;['标签一', '标签二', '标签三']
      },
    },
  },
  data() {
    return {
      tags: [],
      options: [],
    }
  },
  created() {
    this.loadTags()
  },
  methods: {
    async loadTags() {
      const {
        data: { objects },
      } = await fetchTags()
      this.tags = this.options = objects
    },
    handleChange(e) {
      console.log(e)
      this.$emit('change', e)
    },
    queryMethod(query) {
      const tags = this.tags.map(i => {
        return { name: i.name.toLowerCase(), uuid: i.uuid }
      })
      const filter_tags = tags.filter(i => i.name.includes(query.toLowerCase()))
      console.log('TCL: queryMethod -> filter_tags', filter_tags)
      this.options = filter_tags
    },
  },
}
</script>

<style>
.tag_container {
  padding: 10px 10px 10px 0;
}
.el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
</style>