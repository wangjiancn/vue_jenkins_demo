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
        :tab-size="2"
        @imgAdd="imgAdd"
        @save="saveDraft()"
      ></mavonEditor>
    </div>
    <div class="button-wrapper">
      <Meta v-model="meta" />
      <el-button
        size="mini"
        type="primary"
        @click="publishArticle()"
      >发布</el-button>
      <el-button
        size="mini"
        type="primary"
        @click="saveDraft()"
      >存为草稿</el-button>
      <el-button
        size="mini"
        type="primary"
        @click="goBack"
      >返回</el-button>
    </div>
  </div>
</template>

<script>
import { mavonEditor } from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'

import Meta from '@/views/editor/Meta.vue'
import { updateOrCreatePost, fetchArticle, fetchTags } from '@/api/article'
import { uploadimage } from '@/api/upload'
import { constants } from 'crypto'

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

export default {
  components: { mavonEditor, Meta },
  data() {
    return {
      title: '创建文章',
      postData: {
        title: '',
        markdown: 'hello world',
      },
      meta: { tags: [], cat: '', desc: '', kind: '', private: false },
    }
  },
  metaInfo() {
    return {
      title: this.title,
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
        this.title = '正在编辑:' + data.title
      }
    },
    publishArticle() {
      this.saveMD((publish = true))
    },
    saveDraft() {
      this.saveMD((publish = false))
    },
    async saveMD(publish = false) {
      const id = this.$route.params.id
      let post = {
        title: this.postData.title,
        markdown: this.postData.markdown,
        body: this.$refs.md.d_render,
        ...this.meta,
      }
      post.is_publish = publish
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
    async imgAdd(pos, $file) {
      uploadimage($file).then(r => {
        const url = r.data
        this.$refs.md.$img2Url(pos, url)
      })
    },
    goBack() {
      if (window.history.length > 1) {
        this.$router.back()
      } else {
        this.$router.push('/post/' + this.$route.params.id)
      }
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
