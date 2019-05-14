<template>
  <div>
    <div class="post-title">
      <el-input
        v-model="postData.title"
        placeholder="请输入文章标题"
      ></el-input>
    </div>
    <div class="mdeditor">
      <mavonEditor
        ref="md"
        v-model="postData.markdown"
        @save="saveMD"
      ></mavonEditor>
    </div>
    <div class="button-wrapper">
      <Meta
        :dynamic-tags="dynamicTags"
        @change="handleChange"
      />
      <el-button
        size="small"
        type="primary"
        @click="saveMD"
      >立即创建</el-button>
    </div>
  </div>
</template>

<script>
import { mavonEditor } from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
import { updateOrCreatePost, fetchArticle, fetchTags } from '@/api/article'

import Meta from '@/views/editor/Meta.vue'

export default {
  components: { mavonEditor, Meta },
  data() {
    return {
      postData: {
        title: '',
        markdown: 'hello world',
      },
      dynamicTags: [],
    }
  },
  created() {
    this.loadItems()
  },
  methods: {
    async loadItems() {
      const id = this.$route.params.id
      if (id) {
        const { data } = await fetchArticle(this.$route.params.id)
        this.postData = { ...data }
        this.dynamicTags = data.tags.map(i => i.uuid)
      }
    },
    async saveMD() {
      const id = this.$route.params.id
      const post = {
        title: this.postData.title,
        markdown: this.postData.markdown,
        body: this.$refs.md.d_render,
        tags: this.dynamicTags,
      }
      const data = await updateOrCreatePost(post, id)
      this.$notify({ title: '成功', type: 'success' })
    },
    handleChange(e) {
      this.dynamicTags = e
    },
  },
}
</script>

<style lang="sass" scoped>
.post-title {
  margin: 10px 0;
}
.button-wrapper {
  margin: 10px 0;
}
</style>
