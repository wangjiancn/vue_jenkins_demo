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
      <Meta v-model="meta" />
      <el-button
        size="small"
        type="primary"
        @click="saveMD(true)"
      >发布</el-button>
      <el-button
        size="small"
        type="primary"
        @click="saveMD"
      >存为草稿</el-button>
      <el-button
        size="small"
        type="primary"
        @click="saveMD"
      >返回</el-button>
    </div>
  </div>
</template>

<script>
import { mavonEditor } from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
import { updateOrCreatePost, fetchArticle, fetchTags } from '@/api/article'

const markdownIt = mavonEditor.getMarkdownIt()
markdownIt.renderer.rules.heading_open = function(tokens, idx) {
  const token = tokens[idx]
  const level = token.markup.length + 1
  const content =
    tokens[idx + 1].content.replace(/\s/g, '_') ||
    Math.random()
      .toString(36)
      .substr(2)
  return `<h${level > 6 ? 6 : level}><a id='${content}'></a>`
}

import Meta from '@/pages/editor/Meta.vue'

export default {
  components: { mavonEditor, Meta },
  data() {
    return {
      postData: {
        title: '',
        markdown: 'hello world',
      },
      meta: { tags: [], cat: '', desc: '', kind: '', private: false },
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
        this.meta.tags = data.tags.map(i => i.id)
        this.meta.cat = data.cat_id
        this.meta.desc = data.desc
        this.meta.kind = data.kind
      }
    },
    async saveMD(publish = false) {
      const id = this.$route.params.id
      const post = {
        title: this.postData.title,
        markdown: this.postData.markdown,
        body: this.$refs.md.d_render,
        ...this.meta,
      }
      if (publish) {
        post.is_publish = true
      }
      const { data } = await updateOrCreatePost(post, id)
      this.$notify({
        title: `文章${id ? '更新' : '创建'}成功`,
        type: 'success',
      })
      if (!id) {
        this.$router.push(`/md/${data.id}`)
      }
    },
    handleTagChange(e) {
      this.dynamicTags = e
    },
    handleCatChange(e) {
      this.cat = e
    },
  },
}
</script>

<style lang="scss" scoped>
.post-title {
  margin: 10px 0;
}
.button-wrapper {
  margin: 10px 0;
}
</style>
