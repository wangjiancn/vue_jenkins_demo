<template>
  <div class="meta-container">
    <div class="meta-item">
      <span> 文章标签: </span>
      <el-select
        :value="meta.tags"
        style="width:500px"
        size="small"
        filterable
        allow-create
        multiple
        default-first-option
        :multiple-limit="5"
        placeholder="请选择"
        :filter-method="tagQueryMethod"
        @change="handleChange($event,'tags')"
      >
        <el-option
          v-for="item in tagOptions"
          :key="item.name"
          :label="item.name"
          :value="item.id"
        >
        </el-option>
      </el-select>
    </div>

    <div class="meta-item">

      <span>文章分类: </span>
      <el-select
        :value="meta.cat"
        size="small"
        filterable
        default-first-option
        placeholder="请选择"
        :filter-method="catQueryMethod"
        @change="handleChange($event,'cat')"
      >
        <el-option
          v-for="item in catOptions"
          :key="item.name"
          :label="item.name"
          :value="item.id"
        >
        </el-option>
      </el-select>
    </div>
    <div class="meta-item">
      <span> 文章描述: </span>
      <el-input
        :value="meta.desc"
        style="width:500px"
        placeholder="请输入内容"
        type="textarea"
        autosize
        maxlength="200"
        show-word-limit
        @input="handleChange($event,'desc')"
      >
      </el-input>
    </div>
    <div class="meta-item">
      <span>文章类型: </span>
      <el-select
        :value="meta.kind"
        size="small"
        filterable
        @change="handleChange($event,'kind')"
      >
        <el-option
          v-for="item in ['原创','转载','翻译','笔记']"
          :key="item"
          :label="item"
          :value="item"
        >
        </el-option>

      </el-select>
    </div>
    <div class="meta-item">
      <span>私密文章: </span>
      <el-switch
        :value="meta.private"
        active-color="#13ce66"
        inactive-color="#ff4949"
        @change="handleChange($event,'private')"
      >
      </el-switch>
    </div>
  </div>
</template>

<script>
import { fetchTags, fetchCategorys } from '@/api/article'
import { createRow } from '@/api/cqi'

export default {
  model: {
    prop: 'meta',
  },
  props: {
    meta: {
      type: Object,
      default: function() {
        return { tags: [], cat: '', desc: '', kind: '', private: false }
      },
    },
  },
  data() {
    return {
      cats: [],
      catOptions: [],
      tags: [],
      tagOptions: [],
    }
  },
  created() {
    this.loadTags()
    this.loadCats()
  },
  methods: {
    async loadCats() {
      const {
        data: { objects },
      } = await fetchTags({ limit: 99 })
      this.tags = this.tagOptions = objects
    },
    async loadTags() {
      const {
        data: { objects },
      } = await fetchCategorys()
      this.cats = this.catOptions = objects
    },
    handleChange(e, field) {
      console.log('TCL: handleChange -> e,', e)
      console.log('TCL: handleChange -> field', field)
      let meta = this.meta
      if (field === 'tags') {
        const index = e.findIndex(i => !Number.isInteger(i))
        console.log('TCL: handleChange -> index', index)
        if (index !== -1) {
          createRow('tag', { name: e[index] }).then(res => {
            this.tagOptions.push(res.data)
            e[index] = res.data.id
          })
        }
      }
      meta[field] = e
      this.$emit('input', meta)
      // console.log('TCL: handleChange -> meta', meta)
    },
    catQueryMethod(query) {
      const cats = this.cats.map(i => {
        return { name: i.name ? i.name.toLowerCase() : '', id: i.id }
      })
      const filter_cats = cats.filter(i =>
        i.name.includes(query ? query.toLowerCase() : '')
      )
      // console.log('TCL: catQueryMethod -> filter_cats', filter_cats)
      this.catOptions = filter_cats
    },
    tagQueryMethod(query) {
      const tags = this.tags.map(i => {
        return { name: i.name ? i.name.toLowerCase() : '', id: i.id }
      })
      const filter_tags = tags.filter(i =>
        i.name.includes(query ? query.toLowerCase() : '')
      )
      // console.log('TCL: tagQueryMethod -> filter_tags', filter_tags)
      this.tagOptions = filter_tags
    },
  },
}
</script>

<style socped>
.meta-container {
  padding: 10px 10px 10px 0;
}
.meta-item {
  margin-bottom: 10px;
}
.meta-item > span {
  margin-right: 10px;
}
</style>